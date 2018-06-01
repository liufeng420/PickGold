var util = require('../common/util')
var Types = require('../common/Types')

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
      
      let angle = util.randomNum(0, 360);
      let point = cc.p(util.randomInt(0, rect.width), util.randomInt(0, rect.height));
      goldNode.rotation = angle;
      goldNode.setPosition(point);

      this.battleArea.addChild(goldNode);
      
      var gold = goldNode.getComponent('Gold');
      var sprite = goldNode.getComponent(cc.Sprite);
      // goldNode.position = cc.p(cc.random0To1() * rect.width, cc.random0To1() * rect.height);
      let goldType = util.randomInt(Types.GoldType.Min, Types.GoldType.Max);

      let scale = util.randomNum(0.5, 1.5);
      if (goldType === Types.GoldType.Diamond) {
        cc.log('fuck2', goldType);
        scale = util.randomNum(0.2, 0.5);
      }
      cc.log(goldType, scale);
      goldNode.setScale(scale, scale);

      let score = util.randomInt(10, 100);
      cc.log('fuck', sprite)
      gold.init(goldType, score, sprite);
    }
  }
});