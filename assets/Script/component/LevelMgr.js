var util = require('../common/util')
var Types = require('../common/Types')

var LevelMgr = cc.Class({
  extends: cc.Component,

  properties: {
    battleArea: cc.Node,
    goldPrefab: {
      type: cc.Prefab,
      default: [],
    },
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
    this.createGold(10);
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
      let goldType = util.randomInt(Types.GoldType.LightStone, Types.GoldType.Max);
      var goldPref = this.goldPrefab[goldType];
      var goldNode = cc.instantiate(goldPref);
      
      // let angle = util.randomNum(0, 360);
      let point = cc.p(util.randomInt(0, rect.width), util.randomInt(0, rect.height));
      // goldNode.rotation = (cc.random0To1() > 0.5 ? 180 : 0);
      goldNode.setPosition(point);

      this.battleArea.addChild(goldNode);
      
      var gold = goldNode.getComponent('Item');

      let scale = util.randomNum(0.5, 1.5);
      let scaleX = scale * (cc.random0To1() > 0.5 ? 1 : -1);
      // if (goldType === Types.GoldType.Gold) {
      //   scale = util.randomNum(0.2, 0.5);
      // }
      cc.log(goldType, scale);
      goldNode.setScale(scaleX, scale);
      let score = 1;
      let speedScale = 1;
      switch (goldType) {
        case Types.GoldType.LightStone:
          {
            score = Math.floor(10 * scale);
            speedScale = 1 - util.mapNum(scale, 0.5, 1.5, -0.1, 0.1);
          }
          break;
          case Types.GoldType.HeavyStone:
          {
            score = Math.floor(20 * scale);
            speedScale = 0.2 - util.mapNum(scale, 0.5, 1.5, -0.1, 0.1);
          }
          break;
          case Types.GoldType.Gold:
          {
            score = Math.floor(100 * scale);
            speedScale = 0.6 - util.mapNum(scale, 0.5, 1.5, -0.4, 0.4);
          }
          break;
        default:
          break;
      }

      gold.init(score, speedScale);
    }
  }
});