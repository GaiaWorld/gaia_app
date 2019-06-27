#[path=../../chain/]
use schema.s::{Transaction, Header, Body};
struct ShakeHandsInfo {
    strVersion:String,
    nStartingHeight:u32,
    nServiceFlags:u8,
    nNodeType:u8,
    strLocalClientAddr:String,
    strLocalServerAddr:String,
    nPublicKey:String,
    nLocalHostNonce:u32,
    bPing:bool,
    bPong:bool
}

struct hashArray{
    arr:&[String]
}
struct hashArrayNet{
    net:String,
    r:hashArray
}

struct TxArray{
    arr:&[Transaction]
}

struct HeaderArray{
    arr:&[Header]
}

struct BodyArray{
    arr:&[Body]
}

struct AddrArray{
    arr:&[String]
}

struct Inv{
    height:u32,
    hash: String,
    MsgType: String
}

struct InvNet{
    net:String,
    r:Inv
}

struct InvArray{
    arr:&[Inv]
}

#[primary=key,db=memory]
struct SubTable{
    key:String,
    value:&[String]
}

struct PeerTable{
    ip:String,
}