var Types = require('../common/Types');

cc.Class({
    extends: cc.Component,

    properties: {
        goldType: {
            type: Types.GoldType,
            default: Types.GoldType.LightStone,
          },
    },

    init: function(score, speedScale) {
        this.score = score;
        this.speedScale = speedScale;
    }
})