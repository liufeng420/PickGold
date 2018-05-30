var LevelMgr = cc.Class({
  extends: cc.Component,

  properties: {
    battleArea: cc.Node,
    goldPrefab: cc.Prefab,
  },

  startLevel: function () {
    cc.log("level start");
    this.createGold(5);
  },

  createGold: function (count) {
    cc.log(this.battleArea.width);
    let rect = cc.rect(0, 0, this.battleArea.width, this.battleArea.height);
    
    for (var i = 0; i < count; ++i) {
      var goldNode = cc.instantiate(this.goldPrefab);
      this.battleArea.addChild(goldNode);
      
      goldNode.position = cc.p(cc.random0To1() * rect.width, cc.random0To1() * rect.height);
    }
  }
});