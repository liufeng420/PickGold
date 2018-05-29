var LevelMgr = cc.Class({
  extends: cc.Component,

  properties: {
    battleArea: cc.Node,
    goldPrefab: cc.Prefab,
  },

  start: function () {
    cc.log("level start");
    this.createGold(5);
  },

  createGold: function (count) {
    for (var i = 0; i < count; ++i) {
      var goldNode = cc.instantiate(this.goldPrefab);
      this.battleArea.addChild(goldNode);
      goldNode.position = cc.p(i*20, i*20);
    }
  }
});