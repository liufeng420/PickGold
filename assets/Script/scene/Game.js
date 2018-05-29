
var Game = cc.Class({
  extends: cc.Component,

  properties: {
    levelMgr: cc.Node,
  },

  statics: {
    instance: null,
  },

  onLoad: function () {
    cc.log('Scene Game on load');
    Game.instance = this;
    this.levelMgr = this.levelMgr.getComponent('LevelMgr');
    this.levelMgr.start();
  },

  update: function (dt) {

  },
});