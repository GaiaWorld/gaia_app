// forger
#[db=file,primary=address]
struct Forger {
    address: String,
    pubKey: String,
    initWeight: usize,
    nextGroupStartHeight: Option<usize>,
    applyJoinHeight: Option<usize>,
    applyExitHeight: Option<usize>,
    groupNumber: u8,
    stake: usize,
}

// forger committee
#[db=file,primary=slot]
struct ForgerCommittee  {
    // slot || chainid
    slot: String,
    forgers: [Forger],
}

// forgers at a specific height on specific fork chain
// this is used to validate past blocks 
#[db=file,primary=height]
struct Height2ForgersIndex {
    // height || chainid
    height: String,
    forgers: [Forger],
}

#[db=file,primary=primaryKey]
struct CommitteeConfig {
    primaryKey: String,
    // minium tokens to become a forger
    minToken: usize,
    // maximum accumulate rounds
    maxAccRounds: usize,
    // the default time for create a new block. For the main chain it is 3000 millisecond.
    blockIterval: usize,
    // maximum height for one forger to accumulate weight priority
    totalAccHeight: usize,
    // stake can withdraw after a certain blocks
    withdrawReserveBlocks: usize,
    // after how many blocks can forge
    canForgeAfterBlocks: usize,
    // how many groups
    totalGroupNumber: usize,
}

// peer
#[db=file,primary=peerId]
struct Peers {
    peerId: String,
    capabilities: u32,
    address: String,
}

enum TxType {
    SpendTx = 1,
    ForgerGroupTx = 2,
    PenaltyTx = 3,
}

#[db=file,primary=forgeTxHash]
struct ForgerCommitteeTx {
    forgeTxHash: String,
    // true: add
    // false exit
    AddGroup: bool,
    blsPubKey: String,
    address: String,
    stake: usize,
}

#[db=file,primary=penaltyTxHash]
struct PenaltyTx {
    penaltyTxHash: String,
    loseStake: usize,
}

// spend tx
#[db=file,primary=txHash]
struct DBTransaction {
    txHash: String,
    nonce: usize,
    gas: usize,
    price: usize,
    from: String,
    to: String,
    value: usize,
    lastInputValue: usize,
    lastOutputValue: usize,
    txType: TxType,
    forgerTx: String,
    penaltyTx: String,
    payload: Option<String>,
    pubKey: String,
    signature: String,
}

#[db=file,primary=txHash]
struct Transaction {
    txHash: String,
    nonce: usize,
    gas: usize,
    price: usize,
    from: String,
    to: String,
    value: usize,
    lastInputValue: usize,
    lastOutputValue: usize,
    txType: TxType,
    forgerTx: Option<ForgerCommitteeTx>,
    penaltyTx: Option<PenaltyTx>,
    payload: Option<String>,
    pubKey: String,
    signature: String,
}

// Log
#[db=file,primary=pk]
struct Log {
    pk: String,
    forger: String,
    blockHash: String,
    blockNumber: String,
    txHash: String,
    txIndex: usize,
    data: String,
    topics: [String],
}

// Receipt
#[db=file,primary=pk]
struct Receipt {
    pk: String,
    status: bool,
    gasUsed: usize,
    txHash: String,
    blockHash: String,
    blockNumber: usize,
    txIndex: usize,
    log: Log,
}

// block header
#[db=file,primary=bhHash]
struct Header {
    // block header hash
    bhHash: String,
    version: String,
    height: usize,
    prevHash: String,
    txRootHash: String,
    receiptRoot: String,
    totalWeight: usize,
    weight: usize,
    forger: String,
    groupNumber: u16,
    timestamp: usize,
    pubkey:String,
    forgerPubkey: String,
    blockRandom: String,
    signature: String,
}

#[db=file,primary=height]
struct Height2Hash {
    height: usize,
    bhHash: String,
}

#[db=file,primary=]
struct HeightChainId2HashIndex {
    // height || chainid => hash
    heightChainId: String,
    hash: String,
}

#[db=file,primary=txHash]
struct TxHashIndex {
    txHash: String,
    height: usize,
    bhHash: String,
}

#[db=file,primary]
struct Block2ForkChainIdIndex {
    // 区块哈希 || 高度
    blockId: String,
    ids: [usize]
}

// 新到的区块应该在哪个分叉链上执行交易
#[db=file,primary=blockId]
struct ForkPoint {
    // 区块哈希 || 高度
    blockId: String,
    forkChainId: usize,
}

// 所有分叉链
#[db=file,primary=forkChainId]
struct ForkChain {
    forkChainId: usize,
    currentHeight: usize,
    totalWeight: usize,
    headHash: String,
    blockRandom: String,
    genesisHash: String,
    prevHash: String,
    createTime: usize,
}

#[db=file,primary=forkChainId]
struct BestForkChain {
    forkChainId: usize,
}

#[db=file,primary=nextId]
struct NextForkChainId {
    nextId: usize,
}

// chain id 到 chain head 的映射

// block body
#[db=file,primary=bhHash]
struct DBBody {
    // block header hash
    bhHash: String,
    txs: [String],
}

#[db=file,primary=bhHash]
struct Body {
    bhHash: String,
    txs: [Transaction],
}

// blockchain head info
#[db=file,primary=forkChainId]
struct ChainHead {
    forkChainId: String,
    headHash: String,
    height: usize,
    blockRandom: String,
    genesisHash: String,
    totalWeight: usize,
    prevHash: String,
}

// account
#[db=file,primary=address]
struct Account {
    address: String,
    nonce: usize,
    inputAmount: usize,
    outputAmount: usize,
    codeHash: Option<String>,
}

#[db=file,primary=nodeId]
struct PeerInfo {
    // node id is node public key
    nodeId: String,
    ip: String,
}

#[db=memory,primary=txHash]
struct TxPool {
    txHash: String,
    tx: Transaction,
}

#[db=file,primary=address]
struct Miner {
    address: String,
    privKey: String,
    pubKey: String,
    blsPubKey: String,
    blsPrivKey: String,
    groupNumber: usize,
}

#[db=memory,primary=pk]
struct Orphans {
    pk: String,
    height: usize,
    blockHash: String,
    header: Header,
    body: Body,
}

// id = blockhash + shortid
#[db=memory,primary=id]
struct TransactionShortID {
    id: String,
}