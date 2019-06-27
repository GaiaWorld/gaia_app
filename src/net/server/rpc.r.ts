/**
 * 封装了所有客户端可以调用的RPC请求
 */
import { getBlock, getHeader, getPoolTxs, getTx, newBlocksReach, newHeadersReach, newTxsReach } from '../../chain/blockchain';
import { SerializeType } from '../../pi/util/bon';
import { RpcClient } from '../../pi_pt/net/rpc_client';
import { memoryBucket } from '../../util/db';
import { getOwnNetAddr, makeShakeHandsInfo } from '../client/launch';
import { INV_MSG_TYPE } from '../msg';
import { checkShakeHandsInfo} from '../virtualEnv';
import { getBlocks as getBlocksString, getHeaders as getHeadersString, getTxs as getTxsString} from './rpc.p';
import { AddrArray, BodyArray, HeaderArray, Inv, InvArray, InvArrayNet,InvNet, ShakeHandsInfo, SubTable, TxArray } from './rpc.s';

// #[rpc=rpcServer]
export const shakeHands = (info:ShakeHandsInfo):ShakeHandsInfo => {
    if (checkShakeHandsInfo(info)) {
        // TODO:此处应该记录下对等节点的基本信息，暂时使用strLocalServerAddr作为主键
    return makeShakeHandsInfo();
    }
};

// #[rpc=rpcServer]
export const getTxs = (invArray:InvArrayNet):TxArray => {
    const txArray = new TxArray();
    txArray.arr = [];
    invArray.r.arr.forEach((inv:Inv) => {
        const tx = getTx(inv);
        if (tx) {
            txArray.arr.push(tx);
        }
    });

    return txArray;
};

// #[rpc=rpcServer]
export const getBlocks = (invArray:InvArrayNet):BodyArray => {
    const bodyArray = new BodyArray();
    bodyArray.arr = [];
    invArray.r.arr.forEach((inv:Inv) => {
        const block = getBlock(inv);
        if (block) {
            bodyArray.arr.push(block.body);
        }
    });

    return bodyArray;
};

// #[rpc=rpcServer]
export const getHeaders = (invArray:InvArrayNet):HeaderArray => {
    // TODO:此处直接调用core的getHeader方法
    const headerArray = new HeaderArray();
    headerArray.arr = [];
    invArray.r.arr.forEach((inv:Inv) => {
        const header = getHeader(inv);
        if (header) {
            headerArray.arr.push(header);
        }
    });
    return headerArray;
};

// #[rpc=rpcServer]
export const getMemPool = (netAddr:string):InvArray => {
    // TODO:此处直接调用core的getmemPool方法，返回所以pool中的交易的hash值
    const invArray = new InvArray;
    invArray.arr = getPoolTxs();

    return invArray;
};

// #[rpc=rpcServer]
export const getAddress = (netAddr:string):AddrArray => {
    // TODO:根据我们地址的积分优先返回积分高的的ip,最多返回40个
    const addrArray = new AddrArray;
    addrArray.arr = [];
    return addrArray;
};

// #[rpc=rpcServer]
export const getCurTime = (netAddr:string):number => {
    return 0;
};

const subscribeKeyFromMemory = (pNetAddr:string, key:string) => {
    const bkt = memoryBucket(SubTable._$info.name);
    let column = bkt.get<string, SubTable>(key)[0];
    console.log(`rpc column is : ${column}`);
    if (column === undefined || column.value === undefined) {
        column = new SubTable;
        column.key = key;
        column.value = [];
    }

    if (column.value.indexOf(pNetAddr) < 0) {
        column.value.push(pNetAddr);
        bkt.put(key, column);
    }

    return true;
};

// #[rpc=rpcServer]
export const subscribeTx = (netAddr:string):boolean => {
    return subscribeKeyFromMemory(netAddr, 'tx');
};

// #[rpc=rpcServer]
export const subscribeBlock = (netAddr:string):boolean => {
    return subscribeKeyFromMemory(netAddr, 'block');
};

/**
  * 主动向外广播交易信息
  * 在广播的内部有一些更细节的处理，会判断对等节点是否已经有该tx了，有了就不发
  * @param invNet 
  */

 // #[rpc=rpcServer]
 export const broadcastInv = (invNet:InvNet):boolean => {
    console.log(`new ${invNet.r.MsgType} reach from ${invNet.net}'s client!!!!`);

    // example
    if (invNet.r.MsgType === INV_MSG_TYPE.MSG_BLOCK) {
        // TODO: core判断是否需要该block,如果需要则首先调用getHeaders
        const invArrayNet = new InvArrayNet;
        invArrayNet.net = getOwnNetAddr();
        invArrayNet.r = new InvArray;
        invArrayNet.r.arr = [invNet.r];
        clientRequest(invNet.net,getHeadersString,invArrayNet, (headerArray:HeaderArray, pNetAddr:String) => {
            // TODO: core判断是否需要对应的body，如果需要则通过getBlocks获取
            newHeadersReach(headerArray.arr);
            clientRequest(invNet.net, getBlocksString, invArrayNet, (bodyArray:BodyArray, pNetAddr:String) => {
                // TODO: core对获取到的body进行处理
                newBlocksReach(bodyArray.arr);
            });
        });
    }
    // example
    if (invNet.r.MsgType === INV_MSG_TYPE.MSG_TX) {
        const invArrayNet = new InvArrayNet;
        invArrayNet.net = getOwnNetAddr();
        invArrayNet.r = new InvArray;
        invArrayNet.r.arr = [invNet.r];
        clientRequest(invNet.net,getTxsString,invArrayNet, (txArray:TxArray, pNetAddr:String) => {
            // TODO: 告诉core有新的tx到达了
            newTxsReach(txArray.arr);
        });
    }

    return true;
};

/**
 * 看起来像http，功能上是一个短链接
 */
export const clientRequest = (pNetAddr:string, cmd:string, body: SerializeType, callback: (SerializeType,pNetAddr?:string) => void) => {
    const client = RpcClient.create(`ws://${pNetAddr}`);
    client.connect(KEEP_ALIVE,'1', TIME_OUT, ((pNetAddr) => {
        return () => {

            client.request(cmd, body, TIME_OUT, (r:any) => {
                callback(r, pNetAddr);
            });
        };
    })(pNetAddr),() => {});
};

const KEEP_ALIVE = 10000;
const TIME_OUT = 5000;