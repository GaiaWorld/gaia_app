import { calcWeightAtHeight } from '../consensus/committee';
import { buf2Hex, getRand, hex2Buf, sign } from '../util/crypto';
import { persistBucket } from '../util/db';
import { Block, getVersion } from './blockchain';
import { calcHeaderHash } from './header';
import { Body, ChainHead, CommitteeConfig, DBBody, Forger, Header, Height2Hash, Miner, Transaction } from './schema.s';
import { calcTxHash, merkleRootHash, serializeTx } from './transaction';

export const generateBlock = (forger: Forger, chainHead: ChainHead, miner: Miner, committeeCfg: CommitteeConfig, txs: Transaction[]): Block => {
    const header = new Header();
    header.forger = miner.address;
    header.pubkey = miner.pubKey;
    header.forgerPubkey = miner.blsPubKey;
    header.height = chainHead.height + 1;
    header.prevHash = chainHead.headHash;
    // not used right now
    header.receiptRoot = '0';
    header.timestamp = Date.now();
    header.weight = calcWeightAtHeight(forger, header.height, committeeCfg);
    header.totalWeight = chainHead.totalWeight + header.weight;
    header.txRootHash = calcTxRootHash(txs);
    header.version = getVersion();
    header.blockRandom = buf2Hex(getRand(32));// TODO:JFB use bls generate the random
    header.groupNumber = forger.groupNumber;
    header.bhHash = calcHeaderHash(header);
    // sign the whole block
    header.signature = buf2Hex(sign(hex2Buf(miner.privKey), hex2Buf(header.bhHash)));

    const body = new Body();
    body.bhHash = header.bhHash;
    body.txs = txs;

    return new Block(header, body);
};

export const calcTxRootHash = (txs: Transaction[]): string => {
    const txHashes = [];
    for (const tx of txs) {
        txHashes.push(calcTxHash(serializeTx(tx)));
    }

    return merkleRootHash(txHashes);
};

export const getBlockHashByHeight = (height: number): string => {
    const height2HashBkt = persistBucket(Height2Hash._$info.name);
    const hash = height2HashBkt.get<number, [Height2Hash]>(height)[0];

    return hash.bhHash;
};

export const writeHeaderToDB = (header: Header): void => {
    const headerBkt = persistBucket(Header._$info.name);

    headerBkt.put(header.bhHash, header);
};

export const writeBlockToDB = (block: Block): void => {
    const dbBodyBkt = persistBucket(DBBody._$info.name);
    const headerBkt = persistBucket(Header._$info.name);
    const txBkt = persistBucket(Transaction._$info.name);
    const txHashes = [];
    const txKeys = [];
    const txValues = [];
    for (const tx of block.body.txs) {
        const txHash = calcTxHash(serializeTx(tx));
        txKeys.push(txHash);
        txValues.push(tx);
        txHashes.push(txHash);
    }
    const dbBody = new DBBody();
    dbBody.bhHash = block.body.bhHash;
    dbBody.txs = txHashes;
    dbBodyBkt.put(block.body.bhHash, dbBody);
    headerBkt.put(block.header.bhHash, block.header);

    txBkt.put(txKeys, txValues);
};

export const getBlockByHeight = (height: number): Block => {
    const blockHash = getBlockHashByHeight(height);
    const headerBkt = persistBucket(Header._$info.name);
    const dbBodyBkt = persistBucket(DBBody._$info.name);
    const txBkt = persistBucket(Transaction._$info.name);

    const header = headerBkt.get<string, [Header]>(blockHash)[0];
    if (!header) {
        return;
    }

    const dbBody = dbBodyBkt.get<string, [DBBody]>(blockHash)[0];
    const txs = [];
    for (const txHash of dbBody.txs) {
        txs.push(txBkt.get<string, [Transaction]>(txHash)[0]);
    }

    const body = new Body();
    body.bhHash = blockHash;
    body.txs = txs;

    return new Block(header, body);
};