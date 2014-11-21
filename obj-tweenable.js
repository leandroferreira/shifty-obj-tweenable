(function (global) {
  'use strict';

  var objTweenable = function (root, Tweenable) {
    /**
     * ObjTweenable is Tweenable applying to any object variables.
     * Based heavily on Zain Manji's ShiftyTimelineAnimation
     * @param {Object} element Any object
     * @param {Object} tweenConfig Tween configuration as per Shifty
     */
    var ObjTweenable = function(element, tweenConfig) {
      var step = tweenConfig.step || function() {};
      tweenConfig.step = function(state) {
        Object.keys(state).forEach(function (key) {
          element[key] = state[key];
        });
        step.apply(this, arguments);
      };
      this.tweenConfig = tweenConfig;
      Tweenable.call(this, {}, tweenConfig);
    };

    ObjTweenable.prototype = Object.create(Tweenable.prototype, {
      constructor: {
        value: ObjTweenable,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });

    return ObjTweenable;
  };

  /**
   * Exports to multiple envs
   */

  if(typeof define === 'function' && define.amd) { //AMD
    define('obj-tweenable', ['shifty'], function (Tweenable) {
      return objTweenable({}, Tweenable);
    });
  } else if (typeof module !== 'undefined' && module.exports) { //node
    module.exports = {ObjTweenable: objTweenable(global, global.Tweenable)};
  } else { //browser
    //use string because of Google closure compiler ADVANCED_MODE
    /*jslint sub:true */
    global['ObjTweenable'] = objTweenable(global, global.Tweenable);
  }
})(this);