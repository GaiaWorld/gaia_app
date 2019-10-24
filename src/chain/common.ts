import { Tr as Txn } from '../pi/db/mgr';
import { DEFAULT_FILE_WARE } from '../pi_pt/constant';
import { Logger, LogLevel } from '../util/logger';
import { BlocksCache, PeerInfo } from './schema.s';

const logger = new Logger('COMMON', LogLevel.DEBUG);

export const getLocalNodeVersion = (txn: Txn): string => {
    return '0.0.1';
};

// TODO: if not exist random generate
export const getLocalNodeId = (txn: Txn): string => {
    return 'gaia-node1';
};

// TODO: how to get local ip ?
export const getLocalIp = (): string => {
    return '127.0.0.1:2001';
};

export const savePeerInfo = (txn: Txn, peerInfo: PeerInfo): void => {
    txn.modify([{ ware: DEFAULT_FILE_WARE, tab: PeerInfo._$info.name, key: peerInfo.nodeId, value: peerInfo }], 1000, false);
};

export const getPeerInfo = (txn: Txn, nodeId: string): PeerInfo => {
    return;
};

export const getAllPeerInfo = (txn: Txn): PeerInfo[] => {
    // iterate all peers
    return;
};

// check if we have this block or not
export const hasBlock = (txn: Txn, hash: string, height: number): boolean => {
    const blkHash = txn.query([
        { ware: DEFAULT_FILE_WARE, tab: BlocksCache._$info.name, key: `${hash}${height}` }
    ], 1000, false);

    if (blkHash) {
        return true;
    }
    return false;
};

export const writeBlockCache = (txn: Txn, hash: string, height: number): void => {
    const cache = new BlocksCache();
    cache.blockId = `${hash}${height}`;
    cache.hash = hash;
    txn.modify([
        { ware: DEFAULT_FILE_WARE, tab: BlocksCache._$info.name, key: cache.blockId, value: cache }
    ], 1000, false);
    logger.info(`Write block cache hash: ${hash} height: ${height}`);
};