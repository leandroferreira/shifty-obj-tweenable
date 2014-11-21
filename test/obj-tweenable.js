'use strict';
var assert = chai.assert;

describe('ObjTweenable', function() {
  var stepBoolean = false;
  beforeEach(function () {
    stepBoolean = false;
    this.config = {
      from: {opacity: 0},
      to: {opacity: 1},
      duration: 1000,
      step: function (state) {}
    };
    this.configWithStep = {
      from: {opacity: 0},
      to: {opacity: 1},
      duration: 1000,
      step: function(state) {
        stepBoolean = true;
      }
    };
    this.obj = {opacity: 0.5};
  });

  it('constructor', function() {
    var tweenable = new ObjTweenable(this.obj, this.config);
    assert.equal(tweenable.tweenConfig, this.config);
  });

  it('allow passing custom step function', function() {
    var tweenable = new ObjTweenable(this.obj, this.configWithStep);
    tweenable.seek(400);
    assert(stepBoolean, true);
  });

  it('update DOM node style', function() {
    var tweenable = new ObjTweenable(this.obj, this.config);
    tweenable.seek(200);
    assert.equal(this.obj.opacity, 0.2);
  });

});
