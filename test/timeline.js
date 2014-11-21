'use strict';
var assert = chai.assert;

describe('Timeline', function () {
  beforeEach(function () {
    this.obj = {opacity: 0.5};
    this.config = {duration:10};
    this.tweenableConfig = {
      from: {opacity:0},
      to: {opacity:1},
      duration: 1000
    };
    this.newConfig = {
      from: {opacity:1},
      to: {opacity:0},
      duration: 700,
    };
  });

  describe('constructor', function () {
    it('setup default values', function() {
      var tl = new Timeline(this.config);
      assert.equal(tl._duration, 10);
      assert.equal(tl.tweenableList.length, 0);
    });
  });

  describe('#add()', function () {
    it('add Tweenable', function() {
      var tl = new Timeline(this.config);
      var tweenable = new ObjTweenable(this.obj, this.tweenableConfig);
      assert.equal(tl._duration, 10);
      assert.equal(tl.tweenableList.length, 0);
      tl.add(tweenable, 200);

      assert.equal(tl.tweenableList.length, 1);
      assert.equal(tl._duration, 1200);
      assert.equal(tl.tweenableList[0].delay, 200);

      var newTweenable = new ObjTweenable(this.obj, this.newConfig);
      tl.add(newTweenable, 300);
      assert.equal(tl.tweenableList.length, 2);
      assert.equal(tl._duration, 1200);
      assert.equal(tl.tweenableList[1].delay, 300);
    });
  });

  describe('#seek()', function () {
    it('update sub tweenable', function () {
      var tl = new Timeline(this.config);
      var tweenable = new ObjTweenable(this.obj, this.tweenableConfig);
      tl.add(tweenable, 200);
      tl.seek(100);
      assert.equal(this.obj.opacity, 0);
      tl.seek(300).pause();
      assert.equal(this.obj.opacity, 0.1);
      tl.seek(600);
      assert.equal(this.obj.opacity, 0.4);
      tl.seek(2400);
      assert.equal(this.obj.opacity, 1);
    });
  });
});
