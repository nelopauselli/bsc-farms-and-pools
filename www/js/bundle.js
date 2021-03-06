const ether = 1000000000000000000;

function fromWei(value) {
    return value / ether;
}

function round(value, decimals) {
    if (decimals === undefined) decimals = 5;
    if (decimals == 0)
        return Math.round(value);

    var factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

var symbols = {};
function getTokenSymbol(address) {
    if (symbols[address] === undefined) {
        var contract = new document.web3.eth.Contract(bep20abi, address);
        return contract.methods.symbol().call().then(symbol => {
            symbols[address] = symbol;
            return symbol;
        });
    } else {
        return new Promise((resolve, reject) => {
            var symbol = symbols[address];
            resolve(symbol);
        });
    }
}

function getTokenBalance(contractAddress, address) {
    var contract = new document.web3.eth.Contract(bep20abi, contractAddress);
    return contract.methods.balanceOf(address).call().then(amount => {
        return amount;
    });

}

function Pool(name, imageUrl, adapters) {
    this.adapters = adapters;
    this.imageUrl = imageUrl;
    this.name = name;

    this.pendings = ko.observableArray();

    this.search = function (address) {
        this.pendings.removeAll();

        this.add = info => {
            this.pendings.push(info);
        };

        this.adapters.forEach(adapter => {
            adapter.search(address, this.add);
        });
    }
}

function Staked(pid, staked) {
    this.pid = pid;
    this.staked = staked;

    this.wantTokenName = ko.observable();
    this.rewardTokenName = ko.observable();
    this.pendingReward = ko.observable();
    this.futureReward = ko.observable();
    this.futureRewardTimestamp = ko.observable();

    this.posibleReward = ko.computed(() => round(this.pendingReward() + this.futureReward()));
}

function getPancakeAdapters() {
    var adapters =
        [
            new Watcher(new PancakeFarmsAdapter('0x73feaa1ee314f8c655e354234017be2193c9e24e')),
        ];
    pancakePools.forEach(addressPool =>
        adapters.push(
            new Watcher(new PancakePoolAdapter(addressPool))
        ));
    return adapters;
}

function getGooseAdapters() {
    return [
        new Watcher(new GooseVaultsAdapter('0x3f648151f5d591718327aa27d2ee25edf1b435d8')),
    ]
}

function getHyruleAdapters() {
    return [
        new Watcher(new HyruleVaultsAdapter('0xd1b3d8ef5ac30a14690fbd05cf08905e1bf7d878')),
        new Watcher(new HyrulePoolsAdapter('0x76bd7145b99fdf84064a082bf86a33198c6e9d09'))
    ];
}

function getApeAdapters() {
    return [
        new Watcher(new PancakeFarmsAdapter('0x5c8d727b265dbafaba67e050f2f739caeeb4a6f9')),
    ]
}

function ViewModel() {
    var self = this;
    this.address = ko.observable();

    this.pools = [
        new Pool('Pancake Swap', '/img/pancake.png', getPancakeAdapters()),
        //new Pool('Hyrule Swap', '/img/hyrule.png', getHyruleAdapters()),
        new Pool('Ape Swap', '/img/ape.png', getApeAdapters()),
        new Pool('Goose Finance', '/img/goose.png', getGooseAdapters())
    ];

    this.address.subscribe(function (addr) {
        self.search(addr);
    });

    this.search = function (addr) {
        if (!addr)
            addr = this.address();

        this.pools.forEach(pool => {
            pool.search(this.address());
        });
    }
}

async function loadWalletAsync(vm) {
    if (window.ethereum !== undefined) {
        window.ethereum.on('accountsChanged', function (accounts) {
            console.log(accounts);
            if (accounts[0]) {
                vm.address(accounts[0]);
            }
        });

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
            const account = accounts[0];
            if (account) {
                vm.address(account);
            }
        }
    }
}

async function initWeb3() {
    if (window.ethereum !== undefined) {
        console.log("usando ethereum");
        document.web3 = new Web3(window.ethereum);
    } else if (window.web3 !== undefined) {
        console.log("usando web3");
        document.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log("usando bsc por default");
        document.web3 = new Web3('https://bsc-dataseed1.binance.org:443');
    }
}

(function (ko, Web3) {
    initWeb3()
        .then(() => {
            var vm = new ViewModel();
            ko.applyBindings(vm);

            loadWalletAsync(vm);
        });

})(ko, Web3);