var Actor = require('Actor');
var Types = require('../common/Types');

cc.Class({
  extends: Actor,

  properties: {
    score: 0,
    goldType: {
      type: Types.GoldType,
      default: Types.GoldType.Stone,
    }
  },

  init: function () {
    this._super();
  },
})