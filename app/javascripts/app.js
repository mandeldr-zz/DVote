// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import dvote_artifacts from '../../build/contracts/DVote.json'

// DVote is our usable abstraction, which we'll use through the code below.
var DVote = contract(dvote_artifacts);

window.App = {
  start: function() {
    console.log('start')
    var self = this;

    //set provider
    DVote.setProvider(web3.currentProvider);
    //get dvote contract instance
    var dvote;
    DVote.deployed().then(function(instance) {
      // Get democrat vote count
      dvote = instance;
      console.log(dvote)
    })

    // self.getDemCount();
    // self.getRepubCount();
    // self.voteDemocrat('0x73cf959f59fc91bf636063c7b1f700809d62c58e');
    // self.voteRepublican('0x2cebd400a9f0fb3baf2f0b887c9e8259deed1317');
    // self.getBallot('0x73cf959f59fc91bf636063c7b1f700809d62c58e');
  },
  getDemCount: function() {
    var dvote;
    DVote.deployed().then(function(instance) {
      // Get democrat vote count
      dvote = instance;
      return dvote.getDemCount.call();
    }).then(function(count) {
      console.log(count.toNumber());
    })
  },
  getRepubCount: function() {
    var dvote;
    DVote.deployed().then(function(instance) {
      // Get democrat vote count
      dvote = instance;
      return dvote.getRepubCount.call();
    }).then(function(count) {
      console.log(count.toNumber());
    })
  },
  voteDemocrat: function(address) {
    var dvote;
    DVote.deployed().then(function(instance) {
      // Get democrat vote count
      dvote = instance;
      return dvote.voteDemocrat.call(address, {from: address, gas:3000000});
    }).then(function(success) {
      console.log(success);
    })
    this.getDemCount();
  },
  voteRepublican: function(address) {
    var dvote;
    DVote.deployed().then(function(instance) {
      // Get democrat vote count
      dvote = instance;
      return dvote.voteRepublican.call(address, {from: address, gas:3000000});
    }).then(function(success) {
      console.log(success);
    })
    this.getRepubCount();
  },
  getBallot: function(address) {
    var dvote;
    DVote.deployed().then(function(instance) {
      // Get democrat vote count
      dvote = instance;
      return dvote.getBallot.call(address);
    }).then(function(ballot) {
      console.log(ballot);
    })
  }
}

window.addEventListener('load', function() {
  console.log('load')
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  App.start();
});
