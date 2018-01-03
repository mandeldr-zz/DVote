// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import dvote_artifacts from '../../build/contracts/DVote.json'

// DVote is our usable abstraction, which we'll use through the code below.
var DVote = contract(dvote_artifacts);
var dvote;

window.App = {
  start: function() {
    console.log('start')
    var self = this;

    //set provider
    DVote.setProvider(web3.currentProvider);
    DVote.deployed().then(function(instance) {
      dvote = instance;
    })

  },
  getDemCount: function() {
    var dvote;
    DVote.deployed().then(function(instance) {
      // Get democrat vote count
      var address = document.getElementById("address").value;
      dvote = instance;
      return dvote.getDemCount.call({from: address, gas:3000000});
    }).then(function(count) {
      var demCount_element = document.getElementById("demCount");
      demCount_element.innerHTML = count.toNumber();
    })
  },
  getRepubCount: function() {
    var dvote;
    DVote.deployed().then(function(instance) {
      // Get democrat vote count
      var address = document.getElementById("address").value;
      dvote = instance;
      return dvote.getRepubCount.call({from: address, gas:3000000});
    }).then(function(count) {
      var repCount_element = document.getElementById("repubCount");
      repCount_element.innerHTML = count.toNumber();
    })
  },
  voteDemocrat: function() {
    var address = document.getElementById("address").value;
    console.log(address);
    dvote.voteDemocrat.sendTransaction(address, {from: address, gas:3000000});
    window.setTimeout(this.getDemCount(), 10000);
  },
  voteRepublican: function() {
    var address = document.getElementById("address").value;
    console.log(address);
    dvote.voteRepublican.sendTransaction(address, {from: address, gas:3000000});
    window.setTimeout(this.getRepubCount(), 10000);
  },
  getBallot: function(address) {
    //TO BE IMPLEMENTED
  }
}

window.addEventListener('load', function() {
  console.log('load')

  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  
  App.start();

});
