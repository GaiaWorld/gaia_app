// cpos implemention
// need snapshot every round 
import { notifyPeerNewBlockHash } from '../p2p/block_sync';
import { ReceiveBlockHashReq } from '../p2p/p2p.s';
import { localForgers } from '../params/config';
import { CAN_FORGE_AFTER_BLOCKS, MAX_TIME_STAMP, VERSION, WITHDRAW_AFTER_BLOCKS } from '../params/constants';
import { Tr as Txn } from '../pi/db/mgr';
import { BonBuffer } from '../pi/util/bon';
import { DEFAULT_FILE_WARE } from '../pi_pt/constant';
import { buf2Hex, hex2Buf, number2Uint8Array, sha256, verify } from '../util/crypto';
import { Logger, LogLevel } from '../util/logger';
import { generateBlock } from './block';
import { Block } from './blockchain';
import { readAccount, updateAccount } from './chain_accessor';
import { addBlockChunk, getAllPeerInfo, getCommiteeConfig, getLocalIp } from './common';
import { getCanonicalForkChain } from './fork_manager';
import { calcHeaderHash } from './header';
import { CommitteeConfig, Forger, ForgerCommittee, Header, Height2ForgersIndex, Miner } from './schema.s';
import { getTxsFromPool } from './txpool';

const logger = new Logger('CPOS', LogLevel.DEBUG);

// Get forgers at specific height, this is primarily used to verify block author
export const getForgersAtHeight = (txn: Txn, height: number, chainId: number): Forger[] => {
    const forgers = txn.query(
        [{ ware: DEFAULT_FILE_WARE, tab: Height2ForgersIndex._$info.name
            , key: `${buf2Hex(number2Uint8Array(height))}${buf2Hex(number2Uint8Array(chainId))}` }]
        , 1000
        , false
    );

    if (forgers) {
        return <Forger[]>forgers[0].value;
    }
    logger.warn(`Can not find forger snapshot at heigth ${height}`);
};

// calculate forger's weight at a specific height
export const calcForgerWeightAtHeight = (forger: Forger, height: number, committeeCfg: CommitteeConfig): number => {
    const heightDiff = height - forger.nextGroupStartHeight;
    // logger.debug(`calcForgerWeightAtHeight heightDiff ${JSON.stringify(heightDiff)} forger ${JSON.stringify(forger)} committeeCfg ${JSON.stringify(committeeCfg)}`);
    if (heightDiff <= 0) {
        return forger.initWeight;
    }

    if (heightDiff > committeeCfg.totalAccHeight) {
        return forger.initWeight * committeeCfg.maxAccRounds;
    } else if (heightDiff <= committeeCfg.totalAccHeight) {
        return Math.floor(forger.initWeight * (heightDiff / committeeCfg.totalGroupNumber));
    } else {
        // not a valid forger
        logger.debug(`not valid forger: ${JSON.stringify(forger)}`);

        return 0;
    }
};

// snapshot forgers at specific height and chainId
export const writeForgersIndexAtHeight = (txn: Txn, height: number, chainId: number): void => {
    // TODO: hard code 256
    const key = `${buf2Hex(number2Uint8Array(height % 256))}${buf2Hex(number2Uint8Array(chainId))}`;
    const forgers = txn.query(
        [{ ware: DEFAULT_FILE_WARE, tab: ForgerCommittee._$info.name, key: key }], 1000, false
    );

    // height => Forgers index
    const key2 = `${buf2Hex(number2Uint8Array(height))}${buf2Hex(number2Uint8Array(chainId))}`;
    if (forgers) {
        txn.modify(
            [{ ware: DEFAULT_FILE_WARE, tab: Height2ForgersIndex._$info.name
                , key: key2, value: <Forger[]>forgers[0].value }]
            , 1000
            , false
        );
    }
    logger.warn(`No forgers at height ${height}, chainId ${chainId}`);
};

export const addForger = (txn: Txn, forger: Forger, chainId: number): void => {
    const key = `${buf2Hex(number2Uint8Array(forger.groupNumber))}${buf2Hex(number2Uint8Array(chainId))}`;
    // check if duplicate forger
    const cmt = txn.query([{ ware: DEFAULT_FILE_WARE, tab: ForgerCommittee._$info.name, key: key }], 1000, false);
    if (cmt) {
        (<ForgerCommittee>cmt[0].value).forgers.push(forger);
        txn.modify([{ ware: DEFAULT_FILE_WARE, tab: ForgerCommittee._$info.name, key: key, value: cmt }], 1000, false);
    }
    logger.debug(`Emtpy forger group`);
};

export const removeForger = (txn: Txn, forger: Forger, chainId: number): void => {
    const key = `${buf2Hex(number2Uint8Array(forger.groupNumber))}${buf2Hex(number2Uint8Array(chainId))}`;
    txn.modify([{ ware: DEFAULT_FILE_WARE, tab: ForgerCommittee._$info.name, key: key }], 1000, false);
    logger.debug(`remove forger ${forger}`);
};

// update forger committee info upon receiving a valid block
export const updateForgerCommitteeInfo = (txn: Txn, block: Block, chainId: number): void => {
    // forger group change
    const key = `${buf2Hex(number2Uint8Array(block.header.groupNumber))}${buf2Hex(number2Uint8Array(chainId))}`;
    const currentSlotForgers = <ForgerCommittee>txn.query([{ ware: DEFAULT_FILE_WARE, tab: ForgerCommittee._$info.name, key: key }], 1000, false)[0].value;

    // delete outdated forgers
    for (let i = 0; i < currentSlotForgers.forgers.length; i++) {
        if (currentSlotForgers.forgers[i].applyJoinHeight && currentSlotForgers.forgers[i].applyJoinHeight + CAN_FORGE_AFTER_BLOCKS >= block.header.height) {
            if (!currentSlotForgers.forgers[i].nextGroupStartHeight) {
                currentSlotForgers.forgers[i].nextGroupStartHeight = block.header.height;
            }
        }

        if (currentSlotForgers.forgers[i].applyExitHeight && currentSlotForgers.forgers[i].applyExitHeight + WITHDRAW_AFTER_BLOCKS >= block.header.height) {
            // return stake
            const account = readAccount(txn, currentSlotForgers.forgers[i].address, chainId);
            account.inputAmount += currentSlotForgers.forgers[i].stake;
            updateAccount(txn, account, chainId);
            currentSlotForgers.forgers.splice(i, 1);
        }
    }
};

export const deriveNextGroupNumber = (address: string, blockRandom: string, height: number, totalGroupNumber: number = 256): number => {
    const bon = new BonBuffer();
    bon.writeUtf8(address)
        .writeUtf8(blockRandom)
        .writeInt(height);

    const hash = buf2Hex(sha256(bon.getBuffer()));
    logger.debug(`deriveNextGroupNumber address ${address} hash ${hash}`);

    return parseInt(hash.slice(hash.length - 2), 16) % totalGroupNumber;
};

export const calcInitialGroupNumber = (address: string): number => {
    return parseInt(address.slice(address.length - 2), 16);
};

export const deriveInitWeight = (address: string, blockRandom: string, height: number, stake: number): number => {
    const bon = new BonBuffer();
    bon.writeUtf8(address)
        .writeUtf8(blockRandom)
        .writeInt(height);

    const data = buf2Hex(sha256(bon.getBuffer()));

    // calc weight
    return Math.floor((Math.log(stake) / Math.log(10) - 2.0) * (parseInt(data.slice(data.length - 2), 16) % 4 + 1));
};

export const verifyHeader = (txn: Txn, header: Header, chainId: number): boolean => {
    if (header.version !== VERSION) {
        return false;
    }

    // check turn
    const forgers = getForgersAtHeight(txn, header.height - 1, chainId);
    if (forgers.map((f: Forger) => f.address).indexOf(header.forger) < 0) {
        logger.warn(`wrong turn to mine block, forger pubkey ${header.pubkey}`);
    }

    if (!verify(hex2Buf(header.signature), hex2Buf(header.pubkey), hex2Buf(header.bhHash))) {
        logger.warn(`wrong signature for block hash ${header.bhHash}, height ${header.height}`);

        return false;
    }

    if (calcHeaderHash(header) !== header.bhHash) {
        logger.warn(`header hash do not match`);

        return false;
    }

    if (Date.now() + MAX_TIME_STAMP <  header.timestamp) {
        logger.warn(`the timestamp is in the future`);

        return false;
    }

    return true;
};

export const selectMostWeightMiner = (txn: Txn, height: number, committeeCfg: CommitteeConfig): [Miner, Forger] => {
    const forgers = (<ForgerCommittee>txn.query([
        { ware: DEFAULT_FILE_WARE, tab: ForgerCommittee._$info.name, key: (height % committeeCfg.totalGroupNumber).toString() }
    ], 1000, false)[0].value).forgers;
    forgers.sort((a: Forger, b: Forger) => calcForgerWeightAtHeight(b, height, committeeCfg) - calcForgerWeightAtHeight(a, height, committeeCfg));
    logger.info(`\n\nheight ${height} Most weight forger ${JSON.stringify(localForgers.forgers[0])}`);

    for (const forger of localForgers.forgers) {
        if (forger.address === forgers[0].address) {
            const miner = <Miner>txn.query([
                { ware: DEFAULT_FILE_WARE, tab: Miner._$info.name, key: forger.address }
            ], 1000, false)[0].value;
            return [miner, forgers[0]];
        }
    }
};

export const startMining = (txn: Txn): void => {
    const bestChain = getCanonicalForkChain(txn);
    const commitee = getCommiteeConfig(txn);
    const res = selectMostWeightMiner(txn, bestChain.currentHeight, commitee);
    if (res) {
        const txs = getTxsFromPool(txn);
        const block = generateBlock(res[1], bestChain, res[0], commitee, txs);
        console.log('\n============================= generate new block at tip height ============================', bestChain.currentHeight);
        console.log(block);
        console.log('\n\n');
        addBlockChunk(txn, block);
        const peers = getAllPeerInfo(txn);
        const req = new ReceiveBlockHashReq();
        req.hash = block.header.bhHash;
        req.height = block.header.height;
        req.peerAddr = getLocalIp();
        for (const p of peers) {
            notifyPeerNewBlockHash(p.ip, req);
        }
    }
    return;
};