// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import dvote_artifacts from '../../build/contracts/DVote.json'

// DVote is our usable abstraction, which we'll use through the code below.
var DVote = contract(dvote_artifacts);
var provider;
var dvote;

window.App = {
  start: function() {
    console.log('start')
    var self = this;

    //set provider
    DVote.setProvider(provider);
    //get dvote contract instance
    DVote.deployed().then(function(instance) {
      // Get democrat vote count
      dvote = instance;
      console.log(dvote)
    })
    self.getDemCount();
  },
  getDemCount: function() {
    DVote.deployed().then(function(instance) {
      // Get democrat vote count
      dvote = instance;
      return dvote.getDemCount.call();
    }).then(function(count) {
      console.log(count.toNumber());
    })
  }
}

window.addEventListener('load', function() {
  console.log('load')
  provider = new Web3.providers.HttpProvider("http://localhost:8545");
  App.start();
});
