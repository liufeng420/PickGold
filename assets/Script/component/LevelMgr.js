var util = require('../common/util')
var Types = require('../common/Types')

var LevelMgr = cc.Class({
  extends: cc.Component,

  properties: {
    battleArea: cc.Node,
    goldPrefab: cc.Prefab,
    oldMan: cc.Node,
    ownMoneyLable: cc.Label,
    targetMoneyLable: cc.Label,
  },

  onLoad: function () {
    this.oldMan.on("AddScore", this.onAddScore, this);
  },

  onDestroy: function () {
    this.oldMan.off("AddScore", this.onAddScore, this);
  },

  onAddScore: function (event) {
    cc.log("onAddScore", event.detail.score);
    this.ownMoney += event.detail.score;
    this.createGold(1);
    this.ownMoneyLable.string = "金钱：" + this.ownMoney;
  },

  startLevel: function () {
    cc.log("level start");
    this.createGold(5);
    this.initMan();
    var manager = cc.director.getCollisionManager();
    manager.enabled = true;
    manager.enabledDebugDraw = true;
    this.ownMoney = 0;
    this.targetMoney = 1000;
    this.ownMoneyLable.string = "金钱：" + this.ownMoney;
    this.targetMoneyLable.string = ("目标金钱：" + this.targetMoney);
  },

  initMan: function () {
    let point = this.battleArea.convertToWorldSpace(cc.v2(0, 0));
    let rect = cc.rect(point.x, point.y, point.x + this.battleArea.width, point.y + this.battleArea.height);
    cc.log(rect, this.oldMan);
    let oldManComponent = this.oldMan.getComponent("Man");
    oldManComponent.init(rect);
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
      let goldType = util.randomInt(Types.GoldType.Stone, Types.GoldType.Max);

      let scale = util.randomNum(0.5, 1.5);
      if (goldType === Types.GoldType.Diamond) {
        scale = util.randomNum(0.2, 0.5);
      }
      cc.log(goldType, scale);
      goldNode.setScale(scale, scale);

      let score = util.randomInt(10, 100);
      gold.init(goldType, score, sprite);
    }
  }
});