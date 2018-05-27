cc.Class({
    extends: cc.Component,

    properties: {
        startGame: {
          default: null,
          type: cc.Button
        }
    },

    // use this for initialization
    onLoad: function () {
    },

    onStartGame: function () {
      console.log("hello start game");
    },

    // called every frame
    update: function (dt) {

    },
});
