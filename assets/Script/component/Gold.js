var Types = require('../common/Types');

cc.Class({
  extends: cc.Component,

  properties: {
    score: 0,
    goldType: {
      type: Types.GoldType,
      default: Types.GoldType.Stone,
    },
    goldSprite: {
      default: [],
      type: cc.SpriteFrame,
    }
  },

  init: function (goldType, score, scale, angle, point) {
    cc.log("gold init:", goldType, score, scale, angle, point)
  },
})