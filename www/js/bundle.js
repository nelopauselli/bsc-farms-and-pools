const ether = 1000000000000000000;

function fromWei(value) {
    return value / ether;
}

function round(value) {
    return Math.round(value * 1000) / 1000;
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

function Pool(adapters, name, imageUrl) {
    this.adapters = adapters;
    this.imageUrl = imageUrl;
    this.name = name;

    this.pendings = ko.observableArray();

    this.search = function (address) {
        this.adapters.forEach(adapter => {
            adapter.search(address, this);
        });
    }
}

function Staked(pid, staked) {
    this.pid = pid;
    this.staked = staked;

    this.wantTokenName = ko.observable();
    this.rewardTokenName = ko.observable();
    this.pendingReward = ko.observable();
}

function ViewModel() {
    var self = this;
    this.address = ko.observable();

    this.pools = [];
    this.pools.push(new Pool(
        [
            new Watcher(new PancakeFarmsAdapter('0x73feaa1ee314f8c655e354234017be2193c9e24e')),
            new Watcher(new PancakePoolAdapter('0x93e2867d9b74341c2d19101b7fbb81d6063cca4d', 'trx'))
        ],
        'Pancake Swap', '/img/pancake.png'));
    this.pools.push(new Pool(
        [
            new Watcher(new HyruleVaultsAdapter('0xd1b3d8ef5ac30a14690fbd05cf08905e1bf7d878')),
            new Watcher(new HyrulePoolsAdapter('0x76bd7145b99fdf84064a082bf86a33198c6e9d09'))
        ], 
        'Hyrule Swap', '/img/hyrule.png'));
    this.pools.push(new Pool(
        [
            new Watcher(new PancakeFarmsAdapter('0x5c8d727b265dbafaba67e050f2f739caeeb4a6f9')),
        ]
        , 'Ape Swap', '/img/ape.png'));

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

(function (ko, Web3) {
    document.web3 = new Web3('https://bsc-dataseed1.binance.org:443');

    var vm = new ViewModel();
    ko.applyBindings(vm);

    //para esperar a que cargue los poolLength de los contratos
    setTimeout(() => {
        vm.address('0x5a31925d4d8bed0abd2b3e452644691be8739c67');
    }, 1000);

})(ko, Web3);