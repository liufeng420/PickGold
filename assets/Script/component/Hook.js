cc.Class({
  extends: cc.Component,

  onCollisionEnter: function (other, self) {
    console.log('on collision enter');

    // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
    var world = self.world;

    // 碰撞组件的 aabb 碰撞框
    var aabb = world.aabb;

    // 上一次计算的碰撞组件的 aabb 碰撞框
    var preAabb = world.preAabb;

    // 碰撞框的世界矩阵
    var t = world.transform;

    // 以下属性为圆形碰撞组件特有属性
    var r = world.radius;
    var p = world.position;

    // 以下属性为 矩形 和 多边形 碰撞组件特有属性
    var ps = world.points;

    cc.log(other.node.parent);
    // this.node.dispatchEvent(new cc.Event.EventCustom('foobar', true));
    this.node.emit("CatchGold", {msg: other.node.parent});
  },



})