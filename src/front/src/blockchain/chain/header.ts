/*
 * blocker header
 */

// ============================== import 

import { BonBuffer } from "../../pi/util/bon"

import { BN } from "../util/bn"
import { Buffer } from "../util/buffer"
import { hash256 } from "../util/crypto"
import { U32, U64, U160, U256, U520 } from "../util/number"

import { Struct } from "../../pi/struct/struct_mgr"

// ============================== export

const T = 10 * 1000;

export const BLOCK_VERSION = new BN("BLOCK_VERSION.001.00", 10, "le");

export const MAX_INTERVAL_TIME = new BN(T, 10, "le");

export class BlockHeader extends Struct {
    parentHash: U256;  // hash of parent's header

    version: U160;     // version of the block
    timestamp: U64;    // unix time stamp

    blsRandom: U256;   // bls random ?
    blsPubkey: U256;   // bls public key ?
    txMerkle: U256;    // merkle hash of the block's transparents

    headerSign: U520;  // Forge's signature for the headers, can't use for hash

    // the follow feild is use for index

    height: U64;       // hegiht of block
    totalWeight: U64;  // total weight from generic to this block
    groupNumber: U32;  // the group number of the forge which generate the block
    headerHash: U256;  // the header's hash
    forgeAddr: U160;   // the address of forge

    constructor() {
        super();

        this.parentHash = new BN(0, 16, "le");

        this.version = new BN(0, 16, "le");
        this.timestamp = new BN(0, 16, "le");

        this.blsRandom = new BN(0, 16, "le");
        this.blsPubkey = new BN(0, 16, "le");
        this.txMerkle = new BN(0, 16, "le");

        this.headerSign = new BN(0, 16, "le");

        this.height = new BN(0, 16, "le");
        this.totalWeight = new BN(0, 16, "le");
        this.groupNumber = new BN(0, 16, "le");
        this.headerHash = new BN(0, 16, "le");
        this.forgeAddr = new BN(0, 16, "le");
    }

    computeHash() {
        let buf = new BonBuffer();

        buf.writeBin(this.parentHash.toBuffer("le"));
        buf.writeBin(this.version.toBuffer("le"));
        buf.writeBin(this.timestamp.toBuffer("le"));
        buf.writeBin(this.blsRandom.toBuffer("le"));
        buf.writeBin(this.blsPubkey.toBuffer("le"));
        buf.writeBin(this.txMerkle.toBuffer("le"));

        let hashBuf = hash256(new Buffer(buf.getBuffer()));
        this.headerHash = new BN(hashBuf);
    }

    bonDecode(bb: BonBuffer) {
        let u8 = bb.readBin();
        this.headerHash = new BN(u8, 16, "le");
        u8 = bb.readBin();
        this.version = new BN(u8, 16, "le");
        u8 = bb.readBin();
        this.timestamp = new BN(u8, 16, "le");
        u8 = bb.readBin();
        this.blsRandom = new BN(u8, 16, "le");
        u8 = bb.readBin();
        this.blsPubkey = new BN(u8, 16, "le");
        u8 = bb.readBin();
        this.txMerkle = new BN(u8, 16, "le");

        u8 = bb.readBin();
        this.headerSign = new BN(u8, 16, "le");

        u8 = bb.readBin();
        this.height = new BN(u8, 16, "le");
        u8 = bb.readBin();
        this.totalWeight = new BN(u8, 16, "le");
        u8 = bb.readBin();
        this.groupNumber = new BN(u8, 16, "le");
        u8 = bb.readBin();
        this.headerHash = new BN(u8, 16, "le");
        u8 = bb.readBin();
        this.forgeAddr = new BN(u8, 16, "le");
    }

    bonEncode(bb: BonBuffer) {
        bb.writeBin(this.parentHash.toBuffer("le"));
        bb.writeBin(this.version.toBuffer("le"));
        bb.writeBin(this.timestamp.toBuffer("le"));
        bb.writeBin(this.blsRandom.toBuffer("le"));
        bb.writeBin(this.blsPubkey.toBuffer("le"));
        bb.writeBin(this.txMerkle.toBuffer("le"));

        bb.writeBin(this.headerSign.toBuffer("le"));

        bb.writeBin(this.height.toBuffer("le"));
        bb.writeBin(this.totalWeight.toBuffer("le"));
        bb.writeBin(this.groupNumber.toBuffer("le"));
        bb.writeBin(this.headerHash.toBuffer("le"));
        bb.writeBin(this.forgeAddr.toBuffer("le"));

        return new Buffer(bb.getBuffer());
    }
}