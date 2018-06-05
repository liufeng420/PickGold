
var randomInt = function(min, max) {
  return Math.floor(cc.rand() % (max - min) + min);
}

var randomNum = function(min, max) {
  return cc.random0To1() * (max - min) + min;
}

var mapNum = function(value, oldMin, oldMax, newMin, newMax) {
  return (newMax - newMin) * (value - oldMin) / (oldMax - oldMin) + newMin;
}

module.exports = {
  randomInt: randomInt,
  randomNum: randomNum,
  mapNum: mapNum,
};