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
      cc.director.preloadScene('game', function () {
        cc.log('Next scene preloaded');
      });
    },

    onStartGame: function () {
      console.log("hello start game");
      cc.director.loadScene('game');
    },

    // called every frame
    update: function (dt) {

    },
});
