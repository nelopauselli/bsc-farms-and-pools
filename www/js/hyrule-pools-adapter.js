function HyrulePoolsAdapter() {
    return new FarmsAdapter({
        address: '0x76bd7145b99fdf84064a082bf86a33198c6e9d09',
        abi: hurylePoolAbi,
        wantTokenMethod: "rupee()",
        rewardTokenMethod: "pendingEgg(uint256,address)"
    });
}