function HyruleVaultsAdapter() {
    return new FarmsAdapter({
        address: '0xd1b3d8ef5ac30a14690fbd05cf08905e1bf7d878',
        abi: hyruleVaultAbi,
        wantTokenMethod: "GRUPEE()",
        getStakedMethod:"stakedWantTokens(uint256,address)",
        rewardTokenMethod: "pendingGRUPEE(uint256,address)",
        userInfoAmountProperty: "shares",
        poolInfoLpProperty: "want"
    });
}