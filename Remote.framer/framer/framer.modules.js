require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"RemoteLayer":[function(require,module,exports){
var RemoteLayer, borderThickness, createBase, createCommonButtonInner, createCommonCircleButton, createGlossEffect, createGroove, createGrooveHightlight, createHomeButton, createHomeButtonInner, createInertSurface, createMenuButton, createMenuButtonInner, createMicButton, createMicButtonInner, createMicSlot, createPlayPauseButton, createPlayPauseButtonInner, createTouchSurface, createVolumeButton, createVolumeButtonDown, createVolumeButtonInner, createVolumeButtonUp, defaultOptions, noop,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

borderThickness = 2;

noop = function() {};

createCommonCircleButton = function() {
  return new Layer({
    width: 76,
    height: 76,
    borderRadius: 38,
    style: {
      background: '-webkit-linear-gradient(top, #999999, #1A1A1A)',
      boxShadow: '0 0 0 2pt rgba(0, 0, 0, 0.5)'
    }
  });
};

createCommonButtonInner = function() {
  return new Layer({
    x: 1,
    y: 1,
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#3D3D3D'
  });
};

createBase = function(parent) {
  var layer;
  layer = new Layer({
    width: 228,
    height: 740,
    backgroundColor: '#1A1A1A',
    style: {
      background: '-webkit-linear-gradient(top, #404040, #333333)'
    },
    borderRadius: 42,
    shadowColor: '#808080',
    shadowBlur: 0,
    shadowSpread: 2,
    name: 'base',
    parent: parent,
    clip: true
  });
  layer.states.animationOptions = {
    time: 0.5
  };
  layer.states.add({
    hide: {
      opacity: 0
    },
    show: {
      opacity: 1
    },
    up: {
      y: 0
    },
    down: {
      y: Screen.height + borderThickness
    }
  });
  return layer;
};

createTouchSurface = function(parent) {
  return new Layer({
    x: 0,
    y: 0,
    width: 228,
    height: 322,
    backgroundColor: 'gray',
    opacity: 0,
    name: 'touchSurface',
    parent: parent
  });
};

createInertSurface = function(parent) {
  return new Layer({
    x: 0,
    y: 323,
    width: 228,
    height: 417,
    style: {
      background: '-webkit-linear-gradient(-60deg, #333333, #1A1A1A)'
    },
    name: 'inertSurface',
    parent: parent
  });
};

createGlossEffect = function(parent) {
  return new Layer({
    x: 0,
    y: 323,
    width: 228,
    height: 417,
    backgroundColor: 'transparent',
    html: '<svg width="228" height="417" viewBox="0 0 228 417"><defs><linearGradient id="a" x1="128" x2="128" y2="436.11" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray"/><stop offset=".72" stop-color="#1a1a1a"/></linearGradient></defs><path fill="url(#a)" d="M228 0H28l166.8 417H228V0"/></svg>',
    name: 'glossEffect',
    visible: false,
    parent: parent
  });
};

createGroove = function(parent) {
  return new Layer({
    x: 0,
    y: 322,
    width: 228,
    height: 1,
    backgroundColor: '#262626',
    name: 'groove',
    parent: parent
  });
};

createGrooveHightlight = function(parent) {
  return new Layer({
    x: 0,
    y: 323,
    width: 228,
    height: 1,
    backgroundColor: '#595959',
    name: 'grooveHighlight',
    parent: parent
  });
};

createMicSlot = function(parent) {
  return new Layer({
    x: 106,
    y: 23,
    width: 16,
    height: 6,
    backgroundColor: 'transparent',
    borderColor: '#141414',
    borderWidth: 2,
    borderRadius: 3,
    shadowX: 0,
    shadowY: 1,
    shadowColor: '#4D4D4D',
    name: "micSlot",
    parent: parent
  });
};

createMenuButton = function(parent) {
  var layer;
  layer = createCommonCircleButton();
  layer.x = 25;
  layer.y = 238;
  layer.name = 'menuButton';
  layer.parent = parent;
  return layer;
};

createMenuButtonInner = function(parent) {
  var layer;
  layer = createCommonButtonInner();
  layer.name = 'menuButtonInner';
  layer.parent = parent;
  layer.html = '<svg width="74" height="74" viewBox="0 0 74 74"><g fill="none" stroke="#d8d8d8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M25 42V32l-5 9.5-5-9.5v10M35 32h-6v10h6M39 42V32l8 10V32M35 37h-6M59 32v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4v-6"/></g></svg>';
  return layer;
};

createHomeButton = function(parent) {
  var layer;
  layer = createCommonCircleButton();
  layer.x = 127;
  layer.y = 238;
  layer.name = 'homeButton';
  layer.parent = parent;
  return layer;
};

createHomeButtonInner = function(parent) {
  var layer;
  layer = createCommonButtonInner();
  layer.name = 'homeButtonInner';
  layer.parent = parent;
  layer.html = '<svg width="74" height="74" viewBox="0 0 74 74"><g fill="#d8d8d8"><path d="M48 29v13H24V29h24m0-2H24a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V29a2 2 0 0 0-2-2z"/><rect x="31" y="46" width="10" height="2" rx="1" ry="1"/></g></svg>';
  return layer;
};

createMicButton = function(parent) {
  var layer;
  layer = createCommonCircleButton();
  layer.x = 25;
  layer.y = 334;
  layer.name = 'micButton';
  layer.parent = parent;
  return layer;
};

createMicButtonInner = function(parent) {
  var layer;
  layer = createCommonButtonInner();
  layer.name = 'micButtonInner';
  layer.parent = parent;
  layer.html = '<svg width="74" height="74" viewBox="0 0 74 74"><rect x="32" y="22" width="8" height="20" rx="4" ry="4" fill="#d8d8d8"/><rect x="30" y="48" width="12" height="2" rx="1" ry="1" fill="#d8d8d8"/><path d="M29 33v5a7 7 0 0 0 7 7 7 7 0 0 0 7-7v-5" fill="none" stroke="#d8d8d8" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path fill="#d8d8d8" d="M35 45h2v3h-2z"/></svg>';
  return layer;
};

createPlayPauseButton = function(parent) {
  var layer;
  layer = createCommonCircleButton();
  layer.x = 25;
  layer.y = 430;
  layer.name = 'playPauseButton';
  layer.parent = parent;
  return layer;
};

createPlayPauseButtonInner = function(parent) {
  var layer;
  layer = createCommonButtonInner();
  layer.name = 'playPauseButtonInner';
  layer.parent = parent;
  layer.html = '<svg width="74" height="74" viewBox="0 0 74 74"><g fill="#d8d8d8"><rect x="42" y="30" width="3" height="13" rx="1.5" ry="1.5"/><rect x="48" y="30" width="3" height="13" rx="1.5" ry="1.5"/><path d="M25 30.29v12.42a1 1 0 0 0 1.52.85l10.09-6.21a1 1 0 0 0 0-1.7l-10.09-6.21a1 1 0 0 0-1.52.85z"/></g></svg>';
  return layer;
};

createVolumeButton = function(parent) {
  return new Layer({
    x: 130,
    y: 334,
    width: 70,
    height: 172,
    borderRadius: 38,
    style: {
      background: '-webkit-linear-gradient(top, #999999, #1A1A1A)',
      boxShadow: '0 0 0 2pt rgba(0, 0, 0, 0.5)'
    },
    name: 'volumeButton',
    parent: parent
  });
};

createVolumeButtonInner = function(parent) {
  return new Layer({
    x: 1,
    y: 1,
    width: 68,
    height: 170,
    borderRadius: 37,
    backgroundColor: '#3D3D3D',
    name: 'volumeButtonInner',
    parent: parent,
    html: '<svg width="70" height="172" viewBox="0 0 70 172"><g fill="#d8d8d8"><rect x="25" y="36" width="20" height="2" rx="1" ry="1"/><rect x="25" y="36" width="20" height="2" rx="1" ry="1" transform="rotate(90 35 37)"/><rect x="24" y="132" width="20" height="2" rx="1" ry="1"/></g></svg>'
  });
};

createVolumeButtonUp = function(parent) {
  return new Layer({
    width: 70,
    height: 86,
    backgroundColor: 'gray',
    opacity: 0,
    name: 'volumeButtonUp',
    parent: parent
  });
};

createVolumeButtonDown = function(parent) {
  return new Layer({
    y: 86,
    width: 70,
    height: 86,
    backgroundColor: 'gray',
    opacity: 0,
    name: 'volumeButtonDown',
    parent: parent
  });
};

defaultOptions = {
  gloss: false,
  transition: 'fade',
  hide: false,
  align: 'right',
  margin: 50,
  fromBottom: 550,
  autoHide: false,
  backgroundColor: 'transparent',
  highlightColor: 'rgba(74, 144, 226, 0.5)',
  width: 228,
  height: 740,
  clip: false,
  homeAction: noop,
  menuAction: noop,
  micAction: noop,
  playPauseAction: noop,
  volumeUpAction: noop,
  volumeDownAction: noop,
  clickAction: noop,
  swipeUpAction: noop,
  swipeDownAction: noop,
  swipeLeftAction: noop,
  swipeRightAction: noop
};

RemoteLayer = (function(superClass) {
  extend(RemoteLayer, superClass);

  RemoteLayer.define('hidden', {
    get: function() {
      return this._hidden;
    }
  });

  RemoteLayer.define('transition', {
    get: function() {
      return this.options.transition;
    }
  });

  function RemoteLayer(options) {
    var button, glossEffect, groove, grooveHighlight, highlight, homeButton, homeButtonInner, i, inertSurface, innerButtons, j, k, len, len1, len2, menuButton, menuButtonInner, micButton, micButtonInner, micSlot, playPauseButton, playPauseButtonInner, roundButtons, touchSurface, volumeButton, volumeButtonDown, volumeButtonInner, volumeButtonUp, volumeButtons;
    if (options == null) {
      options = {};
    }
    this.options = _.defaults(options, defaultOptions);
    this._hidden = this.options.hide;
    RemoteLayer.__super__.constructor.call(this, this.options);
    this.base = createBase(this);
    touchSurface = createTouchSurface(this.base);
    inertSurface = createInertSurface(this.base);
    glossEffect = createGlossEffect(this.base);
    groove = createGroove(this.base);
    grooveHighlight = createGrooveHightlight(this.base);
    micSlot = createMicSlot(this.base);
    menuButton = createMenuButton(this.base);
    menuButtonInner = createMenuButtonInner(menuButton);
    homeButton = createHomeButton(this.base);
    homeButtonInner = createHomeButtonInner(homeButton);
    micButton = createMicButton(this.base);
    micButtonInner = createMicButtonInner(micButton);
    playPauseButton = createPlayPauseButton(this.base);
    playPauseButtonInner = createPlayPauseButtonInner(playPauseButton);
    volumeButton = createVolumeButton(this.base);
    volumeButtonInner = createVolumeButtonInner(volumeButton);
    volumeButtonUp = createVolumeButtonUp(volumeButton);
    volumeButtonDown = createVolumeButtonDown(volumeButton);
    menuButton.onClick((function(_this) {
      return function() {
        return _this.options.menuAction();
      };
    })(this));
    homeButton.onClick((function(_this) {
      return function() {
        return _this.options.homeAction();
      };
    })(this));
    micButton.onClick((function(_this) {
      return function() {
        return _this.options.micAction();
      };
    })(this));
    playPauseButton.onClick((function(_this) {
      return function() {
        return _this.options.playPauseAction();
      };
    })(this));
    volumeButtonUp.onClick((function(_this) {
      return function() {
        return _this.options.volumeUpAction();
      };
    })(this));
    volumeButtonDown.onClick((function(_this) {
      return function() {
        return _this.options.volumeDownAction();
      };
    })(this));
    touchSurface.onClick((function(_this) {
      return function() {
        return _this.options.clickAction();
      };
    })(this));
    touchSurface.onSwipeUp((function(_this) {
      return function() {
        return _this.options.swipeUpAction();
      };
    })(this));
    touchSurface.onSwipeDown((function(_this) {
      return function() {
        return _this.options.swipeDownAction();
      };
    })(this));
    touchSurface.onSwipeLeft((function(_this) {
      return function() {
        return _this.options.swipeLeftAction();
      };
    })(this));
    touchSurface.onSwipeRight((function(_this) {
      return function() {
        return _this.options.swipeRightAction();
      };
    })(this));
    if (this.options.gloss) {
      glossEffect.visible = true;
      inertSurface.style.background = '';
      inertSurface.backgroundColor = '#1A1A1A';
    }
    if (this.options.autoHide || this.options.hide) {
      this._hidden = true;
      this.onMouseOver(this.showCautiously);
      this.onMouseOut(this.hideCautiously);
      switch (this.transition) {
        case 'fade':
          this.base.states.switchInstant('hide');
          break;
        case 'pop':
          this.base.states.switchInstant('down');
          break;
        default:
          return;
      }
    }
    this.align();
    roundButtons = [menuButton, homeButton, micButton, playPauseButton, volumeButton];
    innerButtons = [menuButtonInner, homeButtonInner, micButtonInner, playPauseButtonInner];
    volumeButtons = [volumeButtonUp, volumeButtonDown];
    highlight = this.options.highlightColor;
    for (i = 0, len = roundButtons.length; i < len; i++) {
      button = roundButtons[i];
      button.onMouseOver(function() {
        return this.style = {
          boxShadow: "0 0 0 2pt rgba(0, 0, 0, 0.5), 0 0 0 5pt " + highlight
        };
      });
      button.onMouseOut(function() {
        return this.style = {
          boxShadow: '0 0 0 2pt rgba(0, 0, 0, 0.5)'
        };
      });
    }
    for (j = 0, len1 = innerButtons.length; j < len1; j++) {
      button = innerButtons[j];
      button.onMouseDown(function() {
        return this.brightness = 70;
      });
      button.onMouseUp(function() {
        return this.brightness = 100;
      });
      button.onMouseOut(function() {
        return this.brightness = 100;
      });
    }
    for (k = 0, len2 = volumeButtons.length; k < len2; k++) {
      button = volumeButtons[k];
      button.onMouseDown(function() {
        return volumeButtonInner.brightness = 70;
      });
      button.onMouseUp(function() {
        return volumeButtonInner.brightness = 100;
      });
    }
  }

  RemoteLayer.prototype.align = function(align, margin, fromBottom) {
    if (align == null) {
      align = this.options.align;
    }
    if (margin == null) {
      margin = this.options.margin;
    }
    if (fromBottom == null) {
      fromBottom = this.options.fromBottom;
    }
    if (align === 'left') {
      this.x = margin + borderThickness;
      return this.y = Screen.height + borderThickness - fromBottom;
    } else if (align === 'center') {
      this.centerX();
      return this.y = Screen.height + borderThickness - fromBottom;
    } else {
      this.x = Screen.width - this.width - margin - borderThickness;
      return this.y = Screen.height + borderThickness - fromBottom;
    }
  };

  RemoteLayer.prototype.show = function() {
    this._hidden = false;
    switch (this.transition) {
      case 'fade':
        return this.base.states["switch"]('show');
      case 'pop':
        return this.base.states["switch"]('up');
    }
  };

  RemoteLayer.prototype.hide = function() {
    this._hidden = true;
    switch (this.transition) {
      case 'fade':
        return this.base.states["switch"]('hide');
      case 'pop':
        return this.base.states["switch"]('down');
    }
  };

  RemoteLayer.prototype.showCautiously = Utils.debounce(0.1, function() {
    return this.show();
  });

  RemoteLayer.prototype.hideCautiously = Utils.debounce(1.0, function() {
    return this.hide();
  });

  return RemoteLayer;

})(Layer);

module.exports = RemoteLayer;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2JyZXR0LmNpcHBlcmx5L0RvY3VtZW50cy9HaXRIdWIvbmZsLWZyYW1lci1jdHYtdG8tcmVtb3RlL1JlbW90ZS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9icmV0dC5jaXBwZXJseS9Eb2N1bWVudHMvR2l0SHViL25mbC1mcmFtZXItY3R2LXRvLXJlbW90ZS9SZW1vdGUuZnJhbWVyL21vZHVsZXMvUmVtb3RlTGF5ZXIuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiIyBjb21tb25seSB1c2VkIGJvcmRlciB0aGlja25lc3NcbmJvcmRlclRoaWNrbmVzcyA9IDJcblxubm9vcCA9ICgpIC0+XG5cbmNyZWF0ZUNvbW1vbkNpcmNsZUJ1dHRvbiA9ICgpIC0+XG4gIG5ldyBMYXllclxuICAgIHdpZHRoOiA3NlxuICAgIGhlaWdodDogNzZcbiAgICBib3JkZXJSYWRpdXM6IDM4XG4gICAgc3R5bGU6XG4gICAgICBiYWNrZ3JvdW5kOiAnLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjOTk5OTk5LCAjMUExQTFBKSdcbiAgICAgIGJveFNoYWRvdzogJzAgMCAwIDJwdCByZ2JhKDAsIDAsIDAsIDAuNSknXG5cbmNyZWF0ZUNvbW1vbkJ1dHRvbklubmVyID0gKCkgLT5cbiAgbmV3IExheWVyXG4gICAgeDogMVxuICAgIHk6IDFcbiAgICB3aWR0aDogNzRcbiAgICBoZWlnaHQ6IDc0XG4gICAgYm9yZGVyUmFkaXVzOiAzN1xuICAgIGJhY2tncm91bmRDb2xvcjogJyMzRDNEM0QnXG5cbmNyZWF0ZUJhc2UgPSAocGFyZW50KSAtPlxuICBsYXllciA9IG5ldyBMYXllclxuICAgIHdpZHRoOiAyMjhcbiAgICBoZWlnaHQ6IDc0MFxuICAgIGJhY2tncm91bmRDb2xvcjogJyMxQTFBMUEnXG4gICAgc3R5bGU6IGJhY2tncm91bmQ6ICctd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICM0MDQwNDAsICMzMzMzMzMpJ1xuICAgIGJvcmRlclJhZGl1czogNDJcbiAgICBzaGFkb3dDb2xvcjogJyM4MDgwODAnXG4gICAgc2hhZG93Qmx1cjogMFxuICAgIHNoYWRvd1NwcmVhZDogMlxuICAgIG5hbWU6ICdiYXNlJ1xuICAgIHBhcmVudDogcGFyZW50XG4gICAgY2xpcDogdHJ1ZVxuXG4gIGxheWVyLnN0YXRlcy5hbmltYXRpb25PcHRpb25zID0gdGltZTogMC41XG4gIGxheWVyLnN0YXRlcy5hZGRcbiAgICBoaWRlOiBvcGFjaXR5OiAwXG4gICAgc2hvdzogb3BhY2l0eTogMVxuICAgIHVwOiB5OiAwXG4gICAgZG93bjogeTogU2NyZWVuLmhlaWdodCArIGJvcmRlclRoaWNrbmVzc1xuXG4gIHJldHVybiBsYXllclxuXG5jcmVhdGVUb3VjaFN1cmZhY2UgPSAocGFyZW50KSAtPlxuICBuZXcgTGF5ZXJcbiAgICB4OiAwXG4gICAgeTogMFxuICAgIHdpZHRoOiAyMjhcbiAgICBoZWlnaHQ6IDMyMlxuICAgIGJhY2tncm91bmRDb2xvcjogJ2dyYXknXG4gICAgb3BhY2l0eTogMFxuICAgIG5hbWU6ICd0b3VjaFN1cmZhY2UnXG4gICAgcGFyZW50OiBwYXJlbnRcblxuY3JlYXRlSW5lcnRTdXJmYWNlID0gKHBhcmVudCkgLT5cbiAgbmV3IExheWVyXG4gICAgeDogMFxuICAgIHk6IDMyM1xuICAgIHdpZHRoOiAyMjhcbiAgICBoZWlnaHQ6IDQxN1xuICAgIHN0eWxlOiBiYWNrZ3JvdW5kOiAnLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoLTYwZGVnLCAjMzMzMzMzLCAjMUExQTFBKSdcbiAgICBuYW1lOiAnaW5lcnRTdXJmYWNlJ1xuICAgIHBhcmVudDogcGFyZW50XG5cbmNyZWF0ZUdsb3NzRWZmZWN0ID0gKHBhcmVudCkgLT5cbiAgbmV3IExheWVyXG4gICAgeDogMFxuICAgIHk6IDMyM1xuICAgIHdpZHRoOiAyMjhcbiAgICBoZWlnaHQ6IDQxN1xuICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgIGh0bWw6ICc8c3ZnIHdpZHRoPVwiMjI4XCIgaGVpZ2h0PVwiNDE3XCIgdmlld0JveD1cIjAgMCAyMjggNDE3XCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPVwiYVwiIHgxPVwiMTI4XCIgeDI9XCIxMjhcIiB5Mj1cIjQzNi4xMVwiIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPjxzdG9wIG9mZnNldD1cIjBcIiBzdG9wLWNvbG9yPVwiZ3JheVwiLz48c3RvcCBvZmZzZXQ9XCIuNzJcIiBzdG9wLWNvbG9yPVwiIzFhMWExYVwiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPVwidXJsKCNhKVwiIGQ9XCJNMjI4IDBIMjhsMTY2LjggNDE3SDIyOFYwXCIvPjwvc3ZnPidcbiAgICBuYW1lOiAnZ2xvc3NFZmZlY3QnXG4gICAgdmlzaWJsZTogZmFsc2VcbiAgICBwYXJlbnQ6IHBhcmVudFxuXG5jcmVhdGVHcm9vdmUgPSAocGFyZW50KSAtPlxuICBuZXcgTGF5ZXJcbiAgICB4OiAwXG4gICAgeTogMzIyXG4gICAgd2lkdGg6IDIyOFxuICAgIGhlaWdodDogMVxuICAgIGJhY2tncm91bmRDb2xvcjogJyMyNjI2MjYnXG4gICAgbmFtZTogJ2dyb292ZSdcbiAgICBwYXJlbnQ6IHBhcmVudFxuXG5jcmVhdGVHcm9vdmVIaWdodGxpZ2h0ID0gKHBhcmVudCkgLT5cbiAgbmV3IExheWVyXG4gICAgeDogMFxuICAgIHk6IDMyM1xuICAgIHdpZHRoOiAyMjhcbiAgICBoZWlnaHQ6IDFcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjNTk1OTU5J1xuICAgIG5hbWU6ICdncm9vdmVIaWdobGlnaHQnXG4gICAgcGFyZW50OiBwYXJlbnRcblxuY3JlYXRlTWljU2xvdCA9IChwYXJlbnQpIC0+XG4gIG5ldyBMYXllclxuICAgIHg6IDEwNlxuICAgIHk6IDIzXG4gICAgd2lkdGg6IDE2XG4gICAgaGVpZ2h0OiA2XG4gICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgYm9yZGVyQ29sb3I6ICcjMTQxNDE0J1xuICAgIGJvcmRlcldpZHRoOiAyXG4gICAgYm9yZGVyUmFkaXVzOiAzXG4gICAgc2hhZG93WDogMFxuICAgIHNoYWRvd1k6IDFcbiAgICBzaGFkb3dDb2xvcjogJyM0RDRENEQnXG4gICAgbmFtZTogXCJtaWNTbG90XCJcbiAgICBwYXJlbnQ6IHBhcmVudFxuXG5jcmVhdGVNZW51QnV0dG9uID0gKHBhcmVudCkgLT5cbiAgbGF5ZXIgPSBjcmVhdGVDb21tb25DaXJjbGVCdXR0b24oKVxuICBsYXllci54ID0gMjVcbiAgbGF5ZXIueSA9IDIzOFxuICBsYXllci5uYW1lID0gJ21lbnVCdXR0b24nXG4gIGxheWVyLnBhcmVudCA9IHBhcmVudFxuICByZXR1cm4gbGF5ZXJcblxuY3JlYXRlTWVudUJ1dHRvbklubmVyID0gKHBhcmVudCkgLT5cbiAgbGF5ZXIgPSBjcmVhdGVDb21tb25CdXR0b25Jbm5lcigpXG4gIGxheWVyLm5hbWUgPSAnbWVudUJ1dHRvbklubmVyJ1xuICBsYXllci5wYXJlbnQgPSBwYXJlbnRcbiAgbGF5ZXIuaHRtbCA9ICc8c3ZnIHdpZHRoPVwiNzRcIiBoZWlnaHQ9XCI3NFwiIHZpZXdCb3g9XCIwIDAgNzQgNzRcIj48ZyBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiNkOGQ4ZDhcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBzdHJva2Utd2lkdGg9XCIyXCI+PHBhdGggZD1cIk0yNSA0MlYzMmwtNSA5LjUtNS05LjV2MTBNMzUgMzJoLTZ2MTBoNk0zOSA0MlYzMmw4IDEwVjMyTTM1IDM3aC02TTU5IDMydjZhNCA0IDAgMCAxLTQgNCA0IDQgMCAwIDEtNC00di02XCIvPjwvZz48L3N2Zz4nXG4gIHJldHVybiBsYXllclxuXG5jcmVhdGVIb21lQnV0dG9uID0gKHBhcmVudCkgLT5cbiAgbGF5ZXIgPSBjcmVhdGVDb21tb25DaXJjbGVCdXR0b24oKVxuICBsYXllci54ID0gMTI3XG4gIGxheWVyLnkgPSAyMzhcbiAgbGF5ZXIubmFtZSA9ICdob21lQnV0dG9uJ1xuICBsYXllci5wYXJlbnQgPSBwYXJlbnRcbiAgcmV0dXJuIGxheWVyXG5cbmNyZWF0ZUhvbWVCdXR0b25Jbm5lciA9IChwYXJlbnQpIC0+XG4gIGxheWVyID0gY3JlYXRlQ29tbW9uQnV0dG9uSW5uZXIoKVxuICBsYXllci5uYW1lID0gJ2hvbWVCdXR0b25Jbm5lcidcbiAgbGF5ZXIucGFyZW50ID0gcGFyZW50XG4gIGxheWVyLmh0bWwgPSAnPHN2ZyB3aWR0aD1cIjc0XCIgaGVpZ2h0PVwiNzRcIiB2aWV3Qm94PVwiMCAwIDc0IDc0XCI+PGcgZmlsbD1cIiNkOGQ4ZDhcIj48cGF0aCBkPVwiTTQ4IDI5djEzSDI0VjI5aDI0bTAtMkgyNGEyIDIgMCAwIDAtMiAydjEzYTIgMiAwIDAgMCAyIDJoMjRhMiAyIDAgMCAwIDItMlYyOWEyIDIgMCAwIDAtMi0yelwiLz48cmVjdCB4PVwiMzFcIiB5PVwiNDZcIiB3aWR0aD1cIjEwXCIgaGVpZ2h0PVwiMlwiIHJ4PVwiMVwiIHJ5PVwiMVwiLz48L2c+PC9zdmc+J1xuICByZXR1cm4gbGF5ZXJcblxuY3JlYXRlTWljQnV0dG9uID0gKHBhcmVudCkgLT5cbiAgbGF5ZXIgPSBjcmVhdGVDb21tb25DaXJjbGVCdXR0b24oKVxuICBsYXllci54ID0gMjVcbiAgbGF5ZXIueSA9IDMzNFxuICBsYXllci5uYW1lID0gJ21pY0J1dHRvbidcbiAgbGF5ZXIucGFyZW50ID0gcGFyZW50XG4gIHJldHVybiBsYXllclxuXG5jcmVhdGVNaWNCdXR0b25Jbm5lciA9IChwYXJlbnQpIC0+XG4gIGxheWVyID0gY3JlYXRlQ29tbW9uQnV0dG9uSW5uZXIoKVxuICBsYXllci5uYW1lID0gJ21pY0J1dHRvbklubmVyJ1xuICBsYXllci5wYXJlbnQgPSBwYXJlbnRcbiAgbGF5ZXIuaHRtbCA9ICc8c3ZnIHdpZHRoPVwiNzRcIiBoZWlnaHQ9XCI3NFwiIHZpZXdCb3g9XCIwIDAgNzQgNzRcIj48cmVjdCB4PVwiMzJcIiB5PVwiMjJcIiB3aWR0aD1cIjhcIiBoZWlnaHQ9XCIyMFwiIHJ4PVwiNFwiIHJ5PVwiNFwiIGZpbGw9XCIjZDhkOGQ4XCIvPjxyZWN0IHg9XCIzMFwiIHk9XCI0OFwiIHdpZHRoPVwiMTJcIiBoZWlnaHQ9XCIyXCIgcng9XCIxXCIgcnk9XCIxXCIgZmlsbD1cIiNkOGQ4ZDhcIi8+PHBhdGggZD1cIk0yOSAzM3Y1YTcgNyAwIDAgMCA3IDcgNyA3IDAgMCAwIDctN3YtNVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiI2Q4ZDhkOFwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIgc3Ryb2tlLXdpZHRoPVwiMlwiLz48cGF0aCBmaWxsPVwiI2Q4ZDhkOFwiIGQ9XCJNMzUgNDVoMnYzaC0yelwiLz48L3N2Zz4nXG4gIHJldHVybiBsYXllclxuXG5jcmVhdGVQbGF5UGF1c2VCdXR0b24gPSAocGFyZW50KSAtPlxuICBsYXllciA9IGNyZWF0ZUNvbW1vbkNpcmNsZUJ1dHRvbigpXG4gIGxheWVyLnggPSAyNVxuICBsYXllci55ID0gNDMwXG4gIGxheWVyLm5hbWUgPSAncGxheVBhdXNlQnV0dG9uJ1xuICBsYXllci5wYXJlbnQgPSBwYXJlbnRcbiAgcmV0dXJuIGxheWVyXG5cbmNyZWF0ZVBsYXlQYXVzZUJ1dHRvbklubmVyID0gKHBhcmVudCkgLT5cbiAgbGF5ZXIgPSBjcmVhdGVDb21tb25CdXR0b25Jbm5lcigpXG4gIGxheWVyLm5hbWUgPSAncGxheVBhdXNlQnV0dG9uSW5uZXInXG4gIGxheWVyLnBhcmVudCA9IHBhcmVudFxuICBsYXllci5odG1sID0gJzxzdmcgd2lkdGg9XCI3NFwiIGhlaWdodD1cIjc0XCIgdmlld0JveD1cIjAgMCA3NCA3NFwiPjxnIGZpbGw9XCIjZDhkOGQ4XCI+PHJlY3QgeD1cIjQyXCIgeT1cIjMwXCIgd2lkdGg9XCIzXCIgaGVpZ2h0PVwiMTNcIiByeD1cIjEuNVwiIHJ5PVwiMS41XCIvPjxyZWN0IHg9XCI0OFwiIHk9XCIzMFwiIHdpZHRoPVwiM1wiIGhlaWdodD1cIjEzXCIgcng9XCIxLjVcIiByeT1cIjEuNVwiLz48cGF0aCBkPVwiTTI1IDMwLjI5djEyLjQyYTEgMSAwIDAgMCAxLjUyLjg1bDEwLjA5LTYuMjFhMSAxIDAgMCAwIDAtMS43bC0xMC4wOS02LjIxYTEgMSAwIDAgMC0xLjUyLjg1elwiLz48L2c+PC9zdmc+J1xuICByZXR1cm4gbGF5ZXJcblxuY3JlYXRlVm9sdW1lQnV0dG9uID0gKHBhcmVudCkgLT5cbiAgbmV3IExheWVyXG4gICAgeDogMTMwXG4gICAgeTogMzM0XG4gICAgd2lkdGg6IDcwXG4gICAgaGVpZ2h0OiAxNzJcbiAgICBib3JkZXJSYWRpdXM6IDM4XG4gICAgc3R5bGU6XG4gICAgICBiYWNrZ3JvdW5kOiAnLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjOTk5OTk5LCAjMUExQTFBKSdcbiAgICAgIGJveFNoYWRvdzogJzAgMCAwIDJwdCByZ2JhKDAsIDAsIDAsIDAuNSknXG4gICAgbmFtZTogJ3ZvbHVtZUJ1dHRvbidcbiAgICBwYXJlbnQ6IHBhcmVudFxuXG5jcmVhdGVWb2x1bWVCdXR0b25Jbm5lciA9IChwYXJlbnQpIC0+XG4gIG5ldyBMYXllclxuICAgIHg6IDFcbiAgICB5OiAxXG4gICAgd2lkdGg6IDY4XG4gICAgaGVpZ2h0OiAxNzBcbiAgICBib3JkZXJSYWRpdXM6IDM3XG4gICAgYmFja2dyb3VuZENvbG9yOiAnIzNEM0QzRCdcbiAgICBuYW1lOiAndm9sdW1lQnV0dG9uSW5uZXInXG4gICAgcGFyZW50OiBwYXJlbnRcbiAgICBodG1sOiAnPHN2ZyB3aWR0aD1cIjcwXCIgaGVpZ2h0PVwiMTcyXCIgdmlld0JveD1cIjAgMCA3MCAxNzJcIj48ZyBmaWxsPVwiI2Q4ZDhkOFwiPjxyZWN0IHg9XCIyNVwiIHk9XCIzNlwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyXCIgcng9XCIxXCIgcnk9XCIxXCIvPjxyZWN0IHg9XCIyNVwiIHk9XCIzNlwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyXCIgcng9XCIxXCIgcnk9XCIxXCIgdHJhbnNmb3JtPVwicm90YXRlKDkwIDM1IDM3KVwiLz48cmVjdCB4PVwiMjRcIiB5PVwiMTMyXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjJcIiByeD1cIjFcIiByeT1cIjFcIi8+PC9nPjwvc3ZnPidcblxuY3JlYXRlVm9sdW1lQnV0dG9uVXAgPSAocGFyZW50KSAtPlxuICBuZXcgTGF5ZXJcbiAgICB3aWR0aDogNzBcbiAgICBoZWlnaHQ6IDg2XG4gICAgYmFja2dyb3VuZENvbG9yOiAnZ3JheSdcbiAgICBvcGFjaXR5OiAwXG4gICAgbmFtZTogJ3ZvbHVtZUJ1dHRvblVwJ1xuICAgIHBhcmVudDogcGFyZW50XG5cbmNyZWF0ZVZvbHVtZUJ1dHRvbkRvd24gPSAocGFyZW50KSAtPlxuICBuZXcgTGF5ZXJcbiAgICB5OiA4NlxuICAgIHdpZHRoOiA3MFxuICAgIGhlaWdodDogODZcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICdncmF5J1xuICAgIG9wYWNpdHk6IDBcbiAgICBuYW1lOiAndm9sdW1lQnV0dG9uRG93bidcbiAgICBwYXJlbnQ6IHBhcmVudFxuXG5kZWZhdWx0T3B0aW9ucyA9XG4gIGdsb3NzOiBmYWxzZVxuICB0cmFuc2l0aW9uOiAnZmFkZSdcbiAgaGlkZTogZmFsc2VcbiAgYWxpZ246ICdyaWdodCdcbiAgbWFyZ2luOiA1MFxuICBmcm9tQm90dG9tOiA1NTBcbiAgYXV0b0hpZGU6IGZhbHNlXG4gIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICBoaWdobGlnaHRDb2xvcjogJ3JnYmEoNzQsIDE0NCwgMjI2LCAwLjUpJ1xuICB3aWR0aDogMjI4XG4gIGhlaWdodDogNzQwXG4gIGNsaXA6IGZhbHNlXG4gIGhvbWVBY3Rpb246IG5vb3BcbiAgbWVudUFjdGlvbjogbm9vcFxuICBtaWNBY3Rpb246IG5vb3BcbiAgcGxheVBhdXNlQWN0aW9uOiBub29wXG4gIHZvbHVtZVVwQWN0aW9uOiBub29wXG4gIHZvbHVtZURvd25BY3Rpb246IG5vb3BcbiAgY2xpY2tBY3Rpb246IG5vb3BcbiAgc3dpcGVVcEFjdGlvbjogbm9vcFxuICBzd2lwZURvd25BY3Rpb246IG5vb3BcbiAgc3dpcGVMZWZ0QWN0aW9uOiBub29wXG4gIHN3aXBlUmlnaHRBY3Rpb246IG5vb3BcblxuY2xhc3MgUmVtb3RlTGF5ZXIgZXh0ZW5kcyBMYXllclxuICBAZGVmaW5lICdoaWRkZW4nLCBnZXQ6ICgpIC0+IEBfaGlkZGVuXG4gIEBkZWZpbmUgJ3RyYW5zaXRpb24nLCBnZXQ6ICgpIC0+IEBvcHRpb25zLnRyYW5zaXRpb25cblxuICAjIGluaXRpYWxpemF0aW9uXG4gIGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cbiAgICBAb3B0aW9ucyA9IF8uZGVmYXVsdHMgb3B0aW9ucywgZGVmYXVsdE9wdGlvbnNcbiAgICBAX2hpZGRlbiA9IEBvcHRpb25zLmhpZGU7XG4gICAgc3VwZXIgQG9wdGlvbnNcblxuICAgICMgYmFzZSBsYXllciB0byBjb250YWluIGFsbCB2aXN1YWwgZWxlbWVudHNcbiAgICBAYmFzZSA9IGNyZWF0ZUJhc2UoQClcblxuICAgICMgbGF5ZXIgY29uc3RydWN0aW9uXG4gICAgdG91Y2hTdXJmYWNlID0gY3JlYXRlVG91Y2hTdXJmYWNlKEBiYXNlKVxuICAgIGluZXJ0U3VyZmFjZSA9IGNyZWF0ZUluZXJ0U3VyZmFjZShAYmFzZSlcbiAgICBnbG9zc0VmZmVjdCA9IGNyZWF0ZUdsb3NzRWZmZWN0KEBiYXNlKVxuICAgIGdyb292ZSA9IGNyZWF0ZUdyb292ZShAYmFzZSlcbiAgICBncm9vdmVIaWdobGlnaHQgPSBjcmVhdGVHcm9vdmVIaWdodGxpZ2h0KEBiYXNlKVxuICAgIG1pY1Nsb3QgPSBjcmVhdGVNaWNTbG90KEBiYXNlKVxuICAgIG1lbnVCdXR0b24gPSBjcmVhdGVNZW51QnV0dG9uKEBiYXNlKVxuICAgIG1lbnVCdXR0b25Jbm5lciA9IGNyZWF0ZU1lbnVCdXR0b25Jbm5lcihtZW51QnV0dG9uKVxuICAgIGhvbWVCdXR0b24gPSBjcmVhdGVIb21lQnV0dG9uKEBiYXNlKVxuICAgIGhvbWVCdXR0b25Jbm5lciA9IGNyZWF0ZUhvbWVCdXR0b25Jbm5lcihob21lQnV0dG9uKVxuICAgIG1pY0J1dHRvbiA9IGNyZWF0ZU1pY0J1dHRvbihAYmFzZSlcbiAgICBtaWNCdXR0b25Jbm5lciA9IGNyZWF0ZU1pY0J1dHRvbklubmVyKG1pY0J1dHRvbilcbiAgICBwbGF5UGF1c2VCdXR0b24gPSBjcmVhdGVQbGF5UGF1c2VCdXR0b24oQGJhc2UpXG4gICAgcGxheVBhdXNlQnV0dG9uSW5uZXIgPSBjcmVhdGVQbGF5UGF1c2VCdXR0b25Jbm5lcihwbGF5UGF1c2VCdXR0b24pXG4gICAgdm9sdW1lQnV0dG9uID0gY3JlYXRlVm9sdW1lQnV0dG9uKEBiYXNlKVxuICAgIHZvbHVtZUJ1dHRvbklubmVyID0gY3JlYXRlVm9sdW1lQnV0dG9uSW5uZXIodm9sdW1lQnV0dG9uKVxuICAgIHZvbHVtZUJ1dHRvblVwID0gY3JlYXRlVm9sdW1lQnV0dG9uVXAodm9sdW1lQnV0dG9uKVxuICAgIHZvbHVtZUJ1dHRvbkRvd24gPSBjcmVhdGVWb2x1bWVCdXR0b25Eb3duKHZvbHVtZUJ1dHRvbilcblxuICAgICMgYXNzaWduIGFjdGlvbnMgdG8gYnV0dG9uc1xuICAgIG1lbnVCdXR0b24ub25DbGljayA9PiBAb3B0aW9ucy5tZW51QWN0aW9uKClcbiAgICBob21lQnV0dG9uLm9uQ2xpY2sgPT4gQG9wdGlvbnMuaG9tZUFjdGlvbigpXG4gICAgbWljQnV0dG9uLm9uQ2xpY2sgPT4gQG9wdGlvbnMubWljQWN0aW9uKClcbiAgICBwbGF5UGF1c2VCdXR0b24ub25DbGljayA9PiBAb3B0aW9ucy5wbGF5UGF1c2VBY3Rpb24oKVxuICAgIHZvbHVtZUJ1dHRvblVwLm9uQ2xpY2sgPT4gQG9wdGlvbnMudm9sdW1lVXBBY3Rpb24oKVxuICAgIHZvbHVtZUJ1dHRvbkRvd24ub25DbGljayA9PiBAb3B0aW9ucy52b2x1bWVEb3duQWN0aW9uKClcbiAgICB0b3VjaFN1cmZhY2Uub25DbGljayA9PiBAb3B0aW9ucy5jbGlja0FjdGlvbigpXG4gICAgdG91Y2hTdXJmYWNlLm9uU3dpcGVVcCA9PiBAb3B0aW9ucy5zd2lwZVVwQWN0aW9uKClcbiAgICB0b3VjaFN1cmZhY2Uub25Td2lwZURvd24gPT4gQG9wdGlvbnMuc3dpcGVEb3duQWN0aW9uKClcbiAgICB0b3VjaFN1cmZhY2Uub25Td2lwZUxlZnQgPT4gQG9wdGlvbnMuc3dpcGVMZWZ0QWN0aW9uKClcbiAgICB0b3VjaFN1cmZhY2Uub25Td2lwZVJpZ2h0ID0+IEBvcHRpb25zLnN3aXBlUmlnaHRBY3Rpb24oKVxuXG4gICAgIyBzaG93IG9yIGhpZGUgZ2xvc3MgZWZmZWN0cyBkZXBlbmRpbmcgb24gdXNlciBzZXR0aW5nXG4gICAgaWYgQG9wdGlvbnMuZ2xvc3NcbiAgICAgIGdsb3NzRWZmZWN0LnZpc2libGUgPSB0cnVlXG4gICAgICBpbmVydFN1cmZhY2Uuc3R5bGUuYmFja2dyb3VuZCA9ICcnXG4gICAgICBpbmVydFN1cmZhY2UuYmFja2dyb3VuZENvbG9yID0gJyMxQTFBMUEnXG5cbiAgICAjIHNob3cvaGlkZSBidXR0b24gYXJlYVxuICAgIGlmIEBvcHRpb25zLmF1dG9IaWRlIHx8IEBvcHRpb25zLmhpZGVcbiAgICAgIEBfaGlkZGVuID0gdHJ1ZVxuICAgICAgQG9uTW91c2VPdmVyIEBzaG93Q2F1dGlvdXNseVxuICAgICAgQG9uTW91c2VPdXQgQGhpZGVDYXV0aW91c2x5XG4gICAgICBzd2l0Y2ggQHRyYW5zaXRpb25cbiAgICAgICAgd2hlbiAnZmFkZScgdGhlbiBAYmFzZS5zdGF0ZXMuc3dpdGNoSW5zdGFudCgnaGlkZScpXG4gICAgICAgIHdoZW4gJ3BvcCcgdGhlbiBAYmFzZS5zdGF0ZXMuc3dpdGNoSW5zdGFudCgnZG93bicpXG4gICAgICAgIGVsc2UgcmV0dXJuXG5cbiAgICBAYWxpZ24oKVxuXG4gICAgIyBhcnJheXMgb2YgYnV0dG9ucyBmb3IgaW50ZXJhY3Rpb24gc3RhdGVzXG4gICAgcm91bmRCdXR0b25zID0gW21lbnVCdXR0b24sIGhvbWVCdXR0b24sIG1pY0J1dHRvbiwgcGxheVBhdXNlQnV0dG9uLCB2b2x1bWVCdXR0b25dXG4gICAgaW5uZXJCdXR0b25zID0gW21lbnVCdXR0b25Jbm5lciwgaG9tZUJ1dHRvbklubmVyLCBtaWNCdXR0b25Jbm5lciwgcGxheVBhdXNlQnV0dG9uSW5uZXJdXG4gICAgdm9sdW1lQnV0dG9ucyA9IFt2b2x1bWVCdXR0b25VcCwgdm9sdW1lQnV0dG9uRG93bl1cbiAgICBoaWdobGlnaHQgPSBAb3B0aW9ucy5oaWdobGlnaHRDb2xvclxuXG4gICAgIyBidXR0b24gbW91c2VvdmVyIGVmZmVjdHNcbiAgICBmb3IgYnV0dG9uIGluIHJvdW5kQnV0dG9uc1xuICAgICAgYnV0dG9uLm9uTW91c2VPdmVyIC0+XG4gICAgICAgIHRoaXMuc3R5bGUgPVxuICAgICAgICAgIGJveFNoYWRvdzogXCIwIDAgMCAycHQgcmdiYSgwLCAwLCAwLCAwLjUpLCAwIDAgMCA1cHQgI3toaWdobGlnaHR9XCJcbiAgICAgIGJ1dHRvbi5vbk1vdXNlT3V0IC0+XG4gICAgICAgIHRoaXMuc3R5bGUgPVxuICAgICAgICAgIGJveFNoYWRvdzogJzAgMCAwIDJwdCByZ2JhKDAsIDAsIDAsIDAuNSknXG5cbiAgICAjIGJ1dHRvbiBtb3VzZWRvd24gZWZmZWN0c1xuICAgIGZvciBidXR0b24gaW4gaW5uZXJCdXR0b25zXG4gICAgICBidXR0b24ub25Nb3VzZURvd24gLT4gQGJyaWdodG5lc3MgPSA3MFxuICAgICAgYnV0dG9uLm9uTW91c2VVcCAtPiBAYnJpZ2h0bmVzcyA9IDEwMFxuICAgICAgYnV0dG9uLm9uTW91c2VPdXQgLT4gQGJyaWdodG5lc3MgPSAxMDBcblxuICAgIGZvciBidXR0b24gaW4gdm9sdW1lQnV0dG9uc1xuICAgICAgYnV0dG9uLm9uTW91c2VEb3duIC0+IHZvbHVtZUJ1dHRvbklubmVyLmJyaWdodG5lc3MgPSA3MFxuICAgICAgYnV0dG9uLm9uTW91c2VVcCAtPiB2b2x1bWVCdXR0b25Jbm5lci5icmlnaHRuZXNzID0gMTAwXG5cbiAgYWxpZ246IChhbGlnbiA9IEBvcHRpb25zLmFsaWduLCBtYXJnaW4gPSBAb3B0aW9ucy5tYXJnaW4sIGZyb21Cb3R0b20gPSBAb3B0aW9ucy5mcm9tQm90dG9tKSAtPlxuICAgIGlmIGFsaWduID09ICdsZWZ0J1xuICAgICAgQHggPSBtYXJnaW4gKyBib3JkZXJUaGlja25lc3NcbiAgICAgIEB5ID0gU2NyZWVuLmhlaWdodCArIGJvcmRlclRoaWNrbmVzcyAtIGZyb21Cb3R0b21cbiAgICBlbHNlIGlmIGFsaWduID09ICdjZW50ZXInXG4gICAgICBAY2VudGVyWCgpXG4gICAgICBAeSA9IFNjcmVlbi5oZWlnaHQgKyBib3JkZXJUaGlja25lc3MgLSBmcm9tQm90dG9tXG4gICAgZWxzZVxuICAgICAgQHggPSBTY3JlZW4ud2lkdGggLSBAd2lkdGggLSBtYXJnaW4gLSBib3JkZXJUaGlja25lc3NcbiAgICAgIEB5ID0gU2NyZWVuLmhlaWdodCArIGJvcmRlclRoaWNrbmVzcyAtIGZyb21Cb3R0b21cblxuICBzaG93OiAoKSAtPlxuICAgIEBfaGlkZGVuID0gZmFsc2VcbiAgICBzd2l0Y2ggQHRyYW5zaXRpb25cbiAgICAgIHdoZW4gJ2ZhZGUnIHRoZW4gQGJhc2Uuc3RhdGVzLnN3aXRjaCgnc2hvdycpXG4gICAgICB3aGVuICdwb3AnIHRoZW4gQGJhc2Uuc3RhdGVzLnN3aXRjaCgndXAnKVxuICAgICAgZWxzZSByZXR1cm5cblxuICBoaWRlOiAoKSAtPlxuICAgIEBfaGlkZGVuID0gdHJ1ZVxuICAgIHN3aXRjaCBAdHJhbnNpdGlvblxuICAgICAgd2hlbiAnZmFkZScgdGhlbiBAYmFzZS5zdGF0ZXMuc3dpdGNoKCdoaWRlJylcbiAgICAgIHdoZW4gJ3BvcCcgdGhlbiBAYmFzZS5zdGF0ZXMuc3dpdGNoKCdkb3duJylcbiAgICAgIGVsc2UgcmV0dXJuXG5cbiAgc2hvd0NhdXRpb3VzbHk6IFV0aWxzLmRlYm91bmNlIDAuMSwgLT4gQHNob3coKVxuICBoaWRlQ2F1dGlvdXNseTogVXRpbHMuZGVib3VuY2UgMS4wLCAtPiBAaGlkZSgpXG5cbm1vZHVsZS5leHBvcnRzID0gUmVtb3RlTGF5ZXJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4g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
