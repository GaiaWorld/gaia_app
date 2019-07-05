import { buf2Hex, getRand, hex2Buf, sign } from '../util/crypto';
import { Block, getVersion } from './blockchain';
import { calcHeaderHash } from './header';
import { Body, ChainHead, Forger, Header, MiningConfig, Transaction } from './schema.s';
import { calcTxHash, merkleRootHash, serializeTx } from './transaction';

// TODO: 如何给矿工手续费
export const generateBlock = (forger: Forger, chainHead: ChainHead, miningCfg: MiningConfig, txs: Transaction[]): Block => {
    const header = new Header();
    header.forger = miningCfg.beneficiary;
    header.forgerPubkey = miningCfg.pubKey;
    header.height = chainHead.height + 1;
    header.prevHash = chainHead.headHash;
    // not used right now
    header.receiptRoot = '0';
    header.timestamp = Date.now();
    header.totalWeight = chainHead.totalWeight + forger.lastWeight;
    header.txRootHash = calcTxRootHash(txs);
    header.version = getVersion();
    header.weight = forger.lastWeight;
    header.blockRandom = buf2Hex(getRand(32));
    header.groupNumber = forger.groupNumber;
    header.signature = buf2Hex(sign(hex2Buf(header.blockRandom), hex2Buf(miningCfg.privateKey)));

    header.bhHash = calcHeaderHash(header);

    const body = new Body();
    body.bhHash = calcHeaderHash(header);
    body.txs = txs;

    return new Block(header, body);
};

const calcTxRootHash = (txs: Transaction[]): string => {
    const txHashes = [];
    for (const tx of txs) {
        txHashes.push(calcTxHash(serializeTx(tx)));
    }

    return merkleRootHash(txHashes);
};