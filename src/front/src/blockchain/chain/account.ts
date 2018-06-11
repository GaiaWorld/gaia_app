/*
 * account
 */

// ============================== import 

import { BonBuffer } from "../../pi/util/bon"

import { BN } from "../util/bn"
import { Buffer } from "../util/buffer"
import { U32, U64, U160 } from "../util/number"

import { Struct } from "../../pi/struct/struct_mgr"

import { CDB, CSession } from "../../pi/db/client"
import { Item, Transaction as DBTransaction } from "../../pi/db/db"

// ============================== export

export class Account extends Struct {
    address: U160;   // the address of account
    count: U32;      // the count of transactions from the account
    balance: U64;    // the current uGaia of the account

    constructor() {
        super();

        this.address = new BN(0, 10, "le");
        this.count = new BN(0, 10, "le");
        this.balance = new BN(0, 10, "le");
    }

    bonEncode(bb: BonBuffer) {
        bb.writeBin(this.address.toBuffer("le"));
        bb.writeBin(this.count.toBuffer("le"));
        bb.writeBin(this.balance.toBuffer("le"));

        return new Buffer(bb.getBuffer());
    }

    bonDecode(bb: BonBuffer) {
        let u8 = bb.readBin();
        this.address = new BN(u8, 10, "le");
        this.count = new BN(u8, 10, "le");
        this.balance = new BN(u8, 10, "le");
    }
}

export class AccountDB {
    db: CDB;
    session: CSession;

    constructor() {
        this.db = new CDB();
        this.session = new CSession();

        this.session.open(this.db);
    }

    write(account: Account) {
        const writeCB = (tx: DBTransaction) => {
            let item = {
                tab: TABLE_NAME,
                key: account.address.toString(),
                value: account,
                time: 0,
            } as Item;

            return tx.upsert([item], DEFAULT_TIMEOUT);
        };

        this.session.write(writeCB, DEFAULT_TIMEOUT);
    }

    read(address: U160): Account {
        const readCB = (tx: DBTransaction) => {
            let item = {
                tab: TABLE_NAME,
                key: address.toString(),
            } as Item;

            return tx.query([item], DEFAULT_TIMEOUT);
        };

        return this.session.read(readCB, DEFAULT_TIMEOUT);
    }
}

// ============================== implementation

const DEFAULT_TIMEOUT = 10; // 10 ms
const TABLE_NAME = "AccountTable";