var Types = require('../common/Types');

cc.Class({
  extends: cc.Component,

  properties: {
    score: 0,
    goldType: {
      type: Types.GoldType,
      default: Types.GoldType.Stone,
    },
    goldSpriteFrame: {
      default: [],
      type: cc.SpriteFrame,
    },
    goldSprite: {
      default: null,
      type: cc.Sprite,
    }
  },

  init: function (goldType, score, sprite) {
    cc.log("gold init:", goldType, score);
    this.goldType = goldType;
    this.goldSprite = sprite;
    this.goldSprite.spriteFrame = this.goldSpriteFrame[this.goldType-1];
  },
})