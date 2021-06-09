var gooseVaultAbi = [
    {
        "inputs":
            [{ "internalType": "address", "name": "_treasury", "type": "address" }, { "internalType": "address", "name": "_gooseDollar", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs":
            [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "DepositBUSD", "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "wantAddress", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountGained", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "valueGained", "type": "uint256" }], "name": "Earn", "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Harvest", "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "rate", "type": "uint256" }], "name": "SetRateMultiplier", "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newAddr", "type": "address" }], "name": "SetSchedulerAddress", "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "emissionRate", "type": "uint256" }], "name": "UpdateVaultEmission", "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_want", "type": "address" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }, { "internalType": "address", "name": "_strat", "type": "address" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "allocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256[]", "name": "pidArray", "type": "uint256[]" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "bulkHarvestFor", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [], "name": "busdAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_wantAmt", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_busdAmount", "type": "uint256" }], "name": "depositBUSD", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "earn", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [], "name": "emissionRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" }], "name": "getMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function"
    },
    {
        "inputs": [], "name": "gooseDollar", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "harvestFor", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "lastEarnBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "lastEarnTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [], "name": "lastEmissionUpdateBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "from", "type": "uint256" }, { "internalType": "uint256", "name": "to", "type": "uint256" }], "name": "massUpdatePoolsFromTo", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "blocks", "type": "uint256" }], "name": "originAPR", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "originRewardsPerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "originStakedTotal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "originTVL", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingRewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IERC20", "name": "want", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accRewardsPerShare", "type": "uint256" }, { "internalType": "address", "name": "strat", "type": "address" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [], "name": "rateMultiplierBP", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "rewardAmount", "type": "uint256" }], "name": "rewardTokenValue", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [], "name": "schedulerAddress",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "rate", "type": "uint256" }], "name": "setRateMultiplier", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "newAddr", "type": "address" }], "name": "setSchedulerAddr", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "sharesTotal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "shouldCompound", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "stakedWantTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [], "name": "treasury", "outputs": [{ "internalType": "contract ITreasury", "name": "", "type": "address" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "tvl", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "bool", "name": "withUpdate", "type": "bool" }], "name": "updateVaultEmission", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "shares", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "wantLockedTotal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "wantAmount", "type": "uint256" }], "name": "wantTokenValue", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_wantAmt", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "withdrawAll", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }
];