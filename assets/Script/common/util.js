
var randomInt = function(min, max) {
  return Math.floor(cc.rand() % (max - min) + min);
}

var randomNum = function(min, max) {
  return cc.random0To1() * (max - min) + min;
}


module.exports = {
  randomInt: randomInt,
  randomNum: randomNum,
};