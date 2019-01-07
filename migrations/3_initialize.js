const MemberRoles = artifacts.require('MemberRoles');
const GovBlocksMaster = artifacts.require('GovBlocksMaster');
const Master = artifacts.require('Master');
const GBTStandardToken = artifacts.require('GBTStandardToken');
const Governance = artifacts.require('Governance');
const ProposalCategory = artifacts.require('ProposalCategory');
const EventCaller = artifacts.require('EventCaller');

let gbt;
let ec;
let gbm;
let gd;
let mr;
let sv;
let gv;
let ms;

module.exports = deployer => {
  console.log('GovBlocks Initialization started!');
  deployer
    .then(() => GBTStandardToken.deployed())
    .then(function(instance) {
      gbt = instance;
      return EventCaller.deployed();
    })
    .then(function(instance) {
      ec = instance;
      return Master.deployed();
    })
    .then(function(instance) {
      ms = instance;
      return GovBlocksMaster.deployed();
    })
    .then(function(instance) {
      gbm = instance;
      return gbm.govBlocksMasterInit(gbt.address, ec.address, ms.address);
    })
    .then(function(instance) {
      return MemberRoles.deployed();
    })
    .then(function(instance) {
      mr = instance;
      return ProposalCategory.deployed();
    })
    .then(function(instance) {
      pc = instance;
      return Governance.deployed();
    })
    .then(function(instance) {
      gv = instance;
      return Governance.deployed();
    })
    .then(function() {
      const addr = [
        mr.address,
        pc.address,
        gv.address
      ];
      return gbm.setImplementations(addr);
    })
    .then(function() {
      return gbm.addGovBlocksDapp('0x41', gbt.address, gbt.address, 'descHash');
    })
    .then(function() {
      console.log(
        'GovBlocks Initialization completed, GBM Address: ',
        gbm.address
      );
    });
};