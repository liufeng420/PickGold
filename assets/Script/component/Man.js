
var HookState = cc.Enum({
  Rotation: 1,
  FlyOut: 2,
  FlyBack: 3,
});

var Radius = 70;
var MoveDistance = 8;
var MaxAngle = 60;

var Man = cc.Class({
  extends: cc.Component,

  properties: {
    hook: {
      default: null,
      type: cc.Sprite,
    },

    ropeMask: {
      default: null,
      type: cc.Mask,
    },

    rope: {
      default: null,
      type: cc.Sprite,
    },

    targetGoldNode: {
      default: null,
      type: cc.Node,
    },

    hookAngle: 0,
    angleDelta: 0.1,
    hookState: HookState.Rotation,

  },

  onLoad: function () {
    // add key down and key up event
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    this.hook.node.on("CatchGold", this.onCatchGold, this);
    this.maskHeight = this.ropeMask.node.height;
  },

  onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    this.hook.node.off("CatchGold", this.onCatchGold, this);
  },

  onKeyDown: function (event) {
    switch (event.keyCode) {
      case cc.KEY.a: {
        console.log('Press a key');
        if (this.hookState === HookState.Rotation) {
          this.hookState = HookState.FlyOut;
        }
      }
      break;
    }
  },

  onCatchGold: function (event) {
    cc.log("fuck", event.detail.msg);
    this.targetGoldNode = event.detail.msg;
    this.hookState = HookState.FlyBack;
  },

  init: function(rect) {
    this.battleArea = rect;
  },

  start: function() {
    this.hookPosX = this.hook.node.x;
    this.hookPosY = this.hook.node.y;
    this.originPos = cc.v2(this.hookPosX, this.hookPosY + Radius);
    this.flyTime = 0;
  },

  update: function(dt) {
    if (this.hookState === HookState.Rotation) {
      this.rotationHook(dt);
    } else if (this.hookState === HookState.FlyOut) {
      this.flyOut(dt);
    } else {
      this.flyBack(dt);
    }
  },

  setHookRotation: function (angle) {
    this.hook.node.rotation = angle;
    this.ropeMask.node.rotation = angle;
    // this.rope.node.rotation = angle;
  },

  setHookPos: function (x, y) {
    let deltaX = x - this.hook.node.x;
    let deltaY = y - this.hook.node.y;
    this.hook.node.x = x;
    this.hook.node.y = y;

    // this.rope.node.x += deltaX;
    // this.rope.node.y += deltaY;
    this.ropeMask.node.x = x;
    this.ropeMask.node.y = y;

  },

  rotationHook: function(dt) {
    this.hookAngle += this.angleDelta;
    if (this.hookAngle >= MaxAngle)
    {
      this.angleDelta = -this.angleDelta;
      this.hookAngle = MaxAngle;
    } else if (this.hookAngle <= -MaxAngle) {
      this.angleDelta = -this.angleDelta;
      this.hookAngle = -MaxAngle;
    }
    this.setHookRotation(this.hookAngle);

    let deltaX = Radius * Math.sin(Math.abs(this.hookAngle) * 0.017453293);
    let deltaY = Radius * Math.cos(Math.abs(this.hookAngle) * 0.017453293);
    let x = this.hookAngle > 0 ? this.hookPosX - deltaX : this.hookPosX + deltaX;
    let y = this.hookPosY + Radius - deltaY;
    this.setHookPos(x, y);
    // cc.log(this.hookAngle, Math.sin(this.hookAngle), Math.cos(this.hookAngle), deltaX, deltaY, x, y);
  },

  flyOut: function(dt) {
    let deltaX = MoveDistance * Math.sin(Math.abs(this.hookAngle) * 0.017453293);
    let deltaY = MoveDistance * Math.cos(Math.abs(this.hookAngle) * 0.017453293);
    let x = this.hook.node.x + (this.hookAngle > 0 ? -deltaX : deltaX);
    let y = this.hook.node.y - deltaY;
    this.setHookPos(x, y);
    this.ropeMask.node.height += MoveDistance;

    let point = this.hook.node.convertToWorldSpace(cc.v2(0, 0));
    if (!this.battleArea.contains(point)) {
      this.hookState = HookState.FlyBack;
    }
  },

  flyBack: function(dt) {
    let deltaX = MoveDistance * Math.sin(Math.abs(this.hookAngle) * 0.017453293);
    let deltaY = MoveDistance * Math.cos(Math.abs(this.hookAngle) * 0.017453293);
    let x = this.hook.node.x - (this.hookAngle > 0 ? -deltaX : deltaX);
    let y = this.hook.node.y + deltaY;
    this.setHookPos(x, y);
    this.ropeMask.node.height -= MoveDistance;

    if (this.targetGoldNode !== null) {
      this.targetGoldNode.x -= (this.hookAngle > 0 ? -deltaX : deltaX);
      this.targetGoldNode.y += deltaY;
    }

    let point = cc.p(this.hook.node.x, this.hook.node.y);
    if (cc.pDistanceSQ(point, this.originPos) < Radius * Radius)
    {
      this.hookState = HookState.Rotation;
      this.ropeMask.node.height = this.maskHeight;
      if (this.targetGoldNode !== null) {
        let gold = this.targetGoldNode.getComponent("Item");
        this.node.emit("AddScore", { score: gold.score });
        this.targetGoldNode.destroy();
        this.targetGoldNode = null;
      }
    }
  },
})