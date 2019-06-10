/**
 * account
 */

import {H160} from './util'

export class Account {
    public address: H160;
    // public nonce:   number; 
    public inputAmount: number;
    public outputAmount: number;
    public codeHash: H160;
}