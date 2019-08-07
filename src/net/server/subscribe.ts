import { memoryBucket } from '../../util/db';
import { getOwnNetAddr } from '../client/launch';
import { INV_MSG_TYPE } from '../msg';
import { broadcastInv } from './rpc.p';
import { clientRequest } from './rpc.r';
import { Inv, InvNet, SubTable } from './rpc.s';

/**
 * 作为服务器允许对等节点订阅的主题，并且主动给对等节点发送相应的信息
 */

/**
 * core主动调用该函数，告诉网络层有新的TX产生了，TX可以来源于自身也可以来源于外部节点
 * @param invMsg Inv
 */
export const notifyNewTx = (invMsg:Inv): void => {
    notifyNewInv('tx',invMsg);
};

const notifyNewInv = (key:string, invMsg:Inv): void => {
    const invNet = new InvNet();
    invNet.net = getOwnNetAddr();
    invNet.r = invMsg;

    if (key === 'tx') {
        invNet.r.MsgType = INV_MSG_TYPE.MSG_TX;
        console.log('\n\n notify peer a new tx: \n\n', invMsg);
    } else if (key === 'block') {
        invNet.r.MsgType = INV_MSG_TYPE.MSG_BLOCK;
        console.log('\n\n notify peer a new block: \n\n', invMsg);
    }

    const bkt = memoryBucket(SubTable._$info.name);
    const column = bkt.get<string, [SubTable]>(key)[0];
    if (column && column.value && column.value.length > 0) {
        column.value.forEach((netAddr: string) => {
            console.log(`netAddr is : ${netAddr}, invNet is : ${JSON.stringify(invNet)}`);
            clientRequest(netAddr,broadcastInv, invNet, ((net:any) => {return () => {

                console.log(`notify new Inv, net is :  ${JSON.stringify(net)}`);
            };})(invNet));
        });
    }
};

/**
 * core主动调用该函数，告诉网络层有新的block产生了，block可以来源于自身也可以来源于外部节点
 * @param invMsg Inv
 */
export const notifyNewBlock = (invMsg: Inv): void => {
    notifyNewInv('block',invMsg);
};