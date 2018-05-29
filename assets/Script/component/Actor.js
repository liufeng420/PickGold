cc.Class({
  extends: cc.Component,

  properties: {
    // 初始的位置
    pos: {
      default: cc.Vec2(0, 0),
      type: cc.Vec2,
    },
    renderer: {
      default: null,
      type: cc.Node
    },
  }
  
});