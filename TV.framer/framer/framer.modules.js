require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"FocusEngine":[function(require,module,exports){

/*
	 * USING THE FOCUSENGINE

	 * Require the module
	fe = require "FocusEngine"

	 * Customize focus and unfocused states
	fe.focusStyle.scale = <number>
	fe.focusStyle.shadowX = <number>
	fe.focusStyle.shadowY = <number>
	fe.focusStyle.shadowColor = <string> (hex or rgba)
	fe.focusStyle.shadowBlur = <number>
	fe.focusStyle.shadowSpread = <number>

	fe.unfocusStyle.shadowX = <number>
	fe.unfocusStyle.shadowY = <number>
	fe.unfocusStyle.shadowColor = <string> (hex or rgba)
	fe.unfocusStyle.shadowBlur = <number>
	fe.unfocusStyle.shadowSpread = <number>

	 * Customize state switch duration
	fe.time = <number>

	 * Collect layers which will participate into an array
	myFocusableLayers = [layerA, layerB, layerC]

	 * Initialize the engine with your array
	fe.initialize(myFocusableLayers)

	 * Add a layer created post-initialization
	fe.addLayer(layerA)

	 * Optionally attach changeFocus() to keyboard events
	document.addEventListener "keydown", (event) ->
		keyCode = event.which
		switch keyCode
			when 13 then fe.changeFocus("select")
			when 37 then fe.changeFocus("left")
			when 38 then fe.changeFocus("up")
			when 39 then fe.changeFocus("right")
			when 40 then fe.changeFocus("down")
			else null

	 * Place initial focus
	fe.placeFocus(layerA)

	 * focusPrevious() is available to use in conjunction with FlowComponent's showPrevious()
	fe.focusPrevious()

	 * Layers can trigger behavior upon receiving or losing focus, or being selected
	layerA.on "focus", ->
	layerA.on "unfocus", ->
	layerA.on "selected", ->

	 * Check the currently focused layer
	print fe.focus

	 * Check whether a layer has focus
	print layerA.focus

	 * Integration with RemoteLayer (https://github.com/bpxl-labs/RemoteLayer)
	RemoteLayer = require "RemoteLayer"
	myRemote = new RemoteLayer
		clickAction: -> fe.changeFocus("select")
		swipeUpAction: -> fe.changeFocus("up")
		swipeDownAction: -> fe.changeFocus("down")
		swipeLeftAction: -> fe.changeFocus("left")
		swipeRightAction: -> fe.changeFocus("right")

	 * Enable debug mode to log focus changes
	fe.debug = true
 */
var checkVisible, measureDistance, styleLayer, unfocusAll,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

exports.debug = false;

exports.focus = null;

exports.initialFocus = null;

exports.previousFocus = null;

exports.focusable = [];

exports.time = 0.25;

exports.focusStyle = {
  scale: 1.1,
  shadowBlur: 20,
  shadowColor: "rgba(0,0,0,0.3)",
  shadowX: 0,
  shadowY: 0,
  shadowSpread: 0
};

exports.unfocusStyle = {
  shadowBlur: 20,
  shadowColor: "rgba(0,0,0,0)",
  shadowX: 0,
  shadowY: 0,
  shadowSpread: 0
};

exports.initialize = function(focusableArray) {
  var i, layer, len, ref, results;
  exports.focusable = focusableArray;
  ref = exports.focusable;
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    layer = ref[i];
    if (layer.overrides === void 0) {
      layer.overrides = {
        up: null,
        down: null,
        left: null,
        right: null
      };
    }
    layer.focus = false;
    results.push(styleLayer(layer));
  }
  return results;
};

checkVisible = function(layer) {
  var ancestor, i, isVisible, len, ref;
  isVisible = true;
  if (layer.visible === false) {
    isVisible = false;
    return isVisible;
  }
  ref = layer.ancestors();
  for (i = 0, len = ref.length; i < len; i++) {
    ancestor = ref[i];
    if ((ancestor != null ? ancestor.visible : void 0) === false) {
      isVisible = false;
      return isVisible;
    } else {
      isVisible = true;
    }
  }
  return isVisible;
};

exports.placeFocus = Utils.throttle(0.1, function(layer) {
  if (layer == null) {
    layer = null;
  }
  if (layer === null) {
    return;
  }
  if (exports.initialFocus === null) {
    exports.initialFocus = layer;
  }
  if (exports.focus !== null) {
    exports.previousFocus = exports.focus;
  }
  if (checkVisible(layer) === true && layer !== null) {
    exports.focus = layer;
    unfocusAll();
    layer.emit("focus");
    layer.focus = true;
    if (layer !== null && indexOf.call(exports.focusable, layer) >= 0) {
      return layer != null ? layer.animate("focus") : void 0;
    }
  }
});

unfocusAll = function() {
  var i, layer, len, ref, results;
  ref = exports.focusable;
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    layer = ref[i];
    if (layer.focus === true) {
      layer.emit("unfocus");
      layer.focus = false;
      results.push(layer.animate("unfocus"));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

exports.focusPrevious = function() {
  if (exports.previousFocus !== null) {
    return exports.placeFocus(exports.previousFocus);
  }
};

exports.addLayer = function(layer) {
  exports.focusable.push(layer);
  layer.focus = false;
  return styleLayer(layer);
};

styleLayer = function(layer) {
  layer.states.focus = {
    scale: layer.scale * exports.focusStyle.scale,
    shadowBlur: exports.focusStyle.shadowBlur,
    shadowSpread: exports.focusStyle.shadowSpread,
    shadowColor: exports.focusStyle.shadowColor,
    shadowX: exports.focusStyle.shadowX,
    shadowY: exports.focusStyle.shadowY,
    animationOptions: {
      time: exports.time
    }
  };
  layer.states.unfocus = {
    scale: layer.scale,
    shadowBlur: exports.unfocusStyle.shadowBlur,
    shadowSpread: exports.unfocusStyle.shadowSpread,
    shadowColor: exports.unfocusStyle.shadowColor,
    shadowX: exports.unfocusStyle.shadowX,
    shadowY: exports.unfocusStyle.shadowY,
    animationOptions: {
      time: exports.time
    }
  };
  return layer.animate("unfocus", {
    instant: true
  });
};

exports.changeFocus = Utils.throttle(0.1, function(direction) {
  var distance, focusMidX, focusMidY, i, j, k, l, layer, layerMidX, layerMidY, len, len1, len2, len3, len4, m, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, shortestDistance, targetLayer, tempArray;
  if (exports.focus === null && exports.initialFocus === null) {
    print("No initial focus set. Use placeFocus(layer) to set.");
    return;
  }
  if (exports.debug === true) {
    print("focus was: " + (((ref = exports.focus) != null ? ref.name : void 0) || ((ref1 = exports.focus) != null ? (ref2 = ref1.__framerInstanceInfo) != null ? ref2.targetName : void 0 : void 0) || "unnamed layer") + "; direction: " + direction);
  }
  tempArray = [];
  if (exports.focus === null || exports.focus === void 0) {
    exports.placeFocus(exports.initialFocus);
  }
  if (((ref3 = exports.focus.overrides) != null ? ref3[direction] : void 0) !== void 0 && ((ref4 = exports.focus.overrides) != null ? ref4[direction] : void 0) !== null) {
    return exports.placeFocus(exports.focus.overrides[direction]);
  } else {
    focusMidX = exports.focus.screenFrame.x + exports.focus.screenFrame.width / 2;
    focusMidY = exports.focus.screenFrame.y + exports.focus.screenFrame.height / 2;
    if (direction === "up") {
      ref5 = exports.focusable;
      for (i = 0, len = ref5.length; i < len; i++) {
        layer = ref5[i];
        layerMidY = layer.screenFrame.y + layer.screenFrame.height / 2;
        if (layerMidY < focusMidY && checkVisible(layer) === true) {
          tempArray.push(layer);
        }
      }
    } else if (direction === "down") {
      ref6 = exports.focusable;
      for (j = 0, len1 = ref6.length; j < len1; j++) {
        layer = ref6[j];
        layerMidY = layer.screenFrame.y + layer.screenFrame.height / 2;
        if (layerMidY > focusMidY && checkVisible(layer) === true) {
          tempArray.push(layer);
        }
      }
    } else if (direction === "left") {
      ref7 = exports.focusable;
      for (k = 0, len2 = ref7.length; k < len2; k++) {
        layer = ref7[k];
        layerMidX = layer.screenFrame.x + layer.screenFrame.width / 2;
        if (layerMidX < focusMidX && checkVisible(layer) === true) {
          tempArray.push(layer);
        }
      }
    } else if (direction === "right") {
      ref8 = exports.focusable;
      for (l = 0, len3 = ref8.length; l < len3; l++) {
        layer = ref8[l];
        layerMidX = layer.screenFrame.x + layer.screenFrame.width / 2;
        if (layerMidX > focusMidX && checkVisible(layer) === true) {
          tempArray.push(layer);
        }
      }
    } else if (direction === "select") {
      exports.focus.emit("selected");
    }
    if (tempArray.length === 0) {
      return;
    }
    targetLayer = tempArray[0];
    shortestDistance = measureDistance(targetLayer, direction);
    for (m = 0, len4 = tempArray.length; m < len4; m++) {
      layer = tempArray[m];
      distance = measureDistance(layer, direction);
      if (distance < shortestDistance) {
        targetLayer = layer;
        shortestDistance = distance;
      }
    }
    return exports.placeFocus(targetLayer);
  }
});

measureDistance = function(target, direction) {
  var absoluteDistance, distanceX, distanceY, focusBottomCenter, focusLeftCenter, focusRightCenter, focusTopCenter, targetBottomCenter, targetLeftCenter, targetRightCenter, targetTopCenter;
  focusTopCenter = {
    x: exports.focus.screenFrame.x + exports.focus.screenFrame.width / 2,
    y: exports.focus.screenFrame.y
  };
  focusBottomCenter = {
    x: exports.focus.screenFrame.x + exports.focus.screenFrame.width / 2,
    y: exports.focus.screenFrame.y + exports.focus.screenFrame.height
  };
  focusLeftCenter = {
    x: exports.focus.screenFrame.x,
    y: exports.focus.screenFrame.y + exports.focus.screenFrame.height / 2
  };
  focusRightCenter = {
    x: exports.focus.screenFrame.x + exports.focus.screenFrame.width,
    y: exports.focus.screenFrame.y + exports.focus.screenFrame.height / 2
  };
  targetTopCenter = {
    x: target.screenFrame.x + target.screenFrame.width / 2,
    y: target.screenFrame.y
  };
  targetBottomCenter = {
    x: target.screenFrame.x + target.screenFrame.width / 2,
    y: target.screenFrame.y + target.screenFrame.height
  };
  targetLeftCenter = {
    x: target.screenFrame.x,
    y: target.screenFrame.y + target.screenFrame.height / 2
  };
  targetRightCenter = {
    x: target.screenFrame.x + target.screenFrame.width,
    y: target.screenFrame.y + target.screenFrame.height / 2
  };
  switch (direction) {
    case "up":
      distanceX = focusTopCenter.x - targetBottomCenter.x;
      distanceY = focusTopCenter.y - targetBottomCenter.y;
      break;
    case "down":
      distanceX = focusBottomCenter.x - targetTopCenter.x;
      distanceY = focusBottomCenter.y - targetBottomCenter.y;
      break;
    case "left":
      distanceX = focusLeftCenter.x - targetRightCenter.x;
      distanceY = focusLeftCenter.y - targetRightCenter.y;
      break;
    case "right":
      distanceX = focusRightCenter.x - targetLeftCenter.x;
      distanceY = focusRightCenter.y - targetLeftCenter.y;
  }
  absoluteDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  return absoluteDistance;
};

Events.Focus = "focus";

Layer.prototype.onFocus = function(cb) {
  return this.on(Events.Focus, cb);
};

Events.Unfocus = "unfocus";

Layer.prototype.onUnfocus = function(cb) {
  return this.on(Events.Unfocus, cb);
};

Events.Selected = "selected";

Layer.prototype.onSelected = function(cb) {
  return this.on(Events.Selected, cb);
};


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2JyZXR0LmNpcHBlcmx5L0RvY3VtZW50cy9HaXRIdWIvbmZsLWZyYW1lci1jdHYtdG8tcmVtb3RlL1RWLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2JyZXR0LmNpcHBlcmx5L0RvY3VtZW50cy9HaXRIdWIvbmZsLWZyYW1lci1jdHYtdG8tcmVtb3RlL1RWLmZyYW1lci9tb2R1bGVzL0ZvY3VzRW5naW5lLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIiMjI1xuXHQjIFVTSU5HIFRIRSBGT0NVU0VOR0lORVxuXG5cdCMgUmVxdWlyZSB0aGUgbW9kdWxlXG5cdGZlID0gcmVxdWlyZSBcIkZvY3VzRW5naW5lXCJcblxuXHQjIEN1c3RvbWl6ZSBmb2N1cyBhbmQgdW5mb2N1c2VkIHN0YXRlc1xuXHRmZS5mb2N1c1N0eWxlLnNjYWxlID0gPG51bWJlcj5cblx0ZmUuZm9jdXNTdHlsZS5zaGFkb3dYID0gPG51bWJlcj5cblx0ZmUuZm9jdXNTdHlsZS5zaGFkb3dZID0gPG51bWJlcj5cblx0ZmUuZm9jdXNTdHlsZS5zaGFkb3dDb2xvciA9IDxzdHJpbmc+IChoZXggb3IgcmdiYSlcblx0ZmUuZm9jdXNTdHlsZS5zaGFkb3dCbHVyID0gPG51bWJlcj5cblx0ZmUuZm9jdXNTdHlsZS5zaGFkb3dTcHJlYWQgPSA8bnVtYmVyPlxuXG5cdGZlLnVuZm9jdXNTdHlsZS5zaGFkb3dYID0gPG51bWJlcj5cblx0ZmUudW5mb2N1c1N0eWxlLnNoYWRvd1kgPSA8bnVtYmVyPlxuXHRmZS51bmZvY3VzU3R5bGUuc2hhZG93Q29sb3IgPSA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdGZlLnVuZm9jdXNTdHlsZS5zaGFkb3dCbHVyID0gPG51bWJlcj5cblx0ZmUudW5mb2N1c1N0eWxlLnNoYWRvd1NwcmVhZCA9IDxudW1iZXI+XG5cblx0IyBDdXN0b21pemUgc3RhdGUgc3dpdGNoIGR1cmF0aW9uXG5cdGZlLnRpbWUgPSA8bnVtYmVyPlxuXG5cdCMgQ29sbGVjdCBsYXllcnMgd2hpY2ggd2lsbCBwYXJ0aWNpcGF0ZSBpbnRvIGFuIGFycmF5XG5cdG15Rm9jdXNhYmxlTGF5ZXJzID0gW2xheWVyQSwgbGF5ZXJCLCBsYXllckNdXG5cblx0IyBJbml0aWFsaXplIHRoZSBlbmdpbmUgd2l0aCB5b3VyIGFycmF5XG5cdGZlLmluaXRpYWxpemUobXlGb2N1c2FibGVMYXllcnMpXG5cblx0IyBBZGQgYSBsYXllciBjcmVhdGVkIHBvc3QtaW5pdGlhbGl6YXRpb25cblx0ZmUuYWRkTGF5ZXIobGF5ZXJBKVxuXG5cdCMgT3B0aW9uYWxseSBhdHRhY2ggY2hhbmdlRm9jdXMoKSB0byBrZXlib2FyZCBldmVudHNcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleWRvd25cIiwgKGV2ZW50KSAtPlxuXHRcdGtleUNvZGUgPSBldmVudC53aGljaFxuXHRcdHN3aXRjaCBrZXlDb2RlXG5cdFx0XHR3aGVuIDEzIHRoZW4gZmUuY2hhbmdlRm9jdXMoXCJzZWxlY3RcIilcblx0XHRcdHdoZW4gMzcgdGhlbiBmZS5jaGFuZ2VGb2N1cyhcImxlZnRcIilcblx0XHRcdHdoZW4gMzggdGhlbiBmZS5jaGFuZ2VGb2N1cyhcInVwXCIpXG5cdFx0XHR3aGVuIDM5IHRoZW4gZmUuY2hhbmdlRm9jdXMoXCJyaWdodFwiKVxuXHRcdFx0d2hlbiA0MCB0aGVuIGZlLmNoYW5nZUZvY3VzKFwiZG93blwiKVxuXHRcdFx0ZWxzZSBudWxsXG5cblx0IyBQbGFjZSBpbml0aWFsIGZvY3VzXG5cdGZlLnBsYWNlRm9jdXMobGF5ZXJBKVxuXG5cdCMgZm9jdXNQcmV2aW91cygpIGlzIGF2YWlsYWJsZSB0byB1c2UgaW4gY29uanVuY3Rpb24gd2l0aCBGbG93Q29tcG9uZW50J3Mgc2hvd1ByZXZpb3VzKClcblx0ZmUuZm9jdXNQcmV2aW91cygpXG5cblx0IyBMYXllcnMgY2FuIHRyaWdnZXIgYmVoYXZpb3IgdXBvbiByZWNlaXZpbmcgb3IgbG9zaW5nIGZvY3VzLCBvciBiZWluZyBzZWxlY3RlZFxuXHRsYXllckEub24gXCJmb2N1c1wiLCAtPlxuXHRsYXllckEub24gXCJ1bmZvY3VzXCIsIC0+XG5cdGxheWVyQS5vbiBcInNlbGVjdGVkXCIsIC0+XG5cblx0IyBDaGVjayB0aGUgY3VycmVudGx5IGZvY3VzZWQgbGF5ZXJcblx0cHJpbnQgZmUuZm9jdXNcblxuXHQjIENoZWNrIHdoZXRoZXIgYSBsYXllciBoYXMgZm9jdXNcblx0cHJpbnQgbGF5ZXJBLmZvY3VzXG5cblx0IyBJbnRlZ3JhdGlvbiB3aXRoIFJlbW90ZUxheWVyIChodHRwczovL2dpdGh1Yi5jb20vYnB4bC1sYWJzL1JlbW90ZUxheWVyKVxuXHRSZW1vdGVMYXllciA9IHJlcXVpcmUgXCJSZW1vdGVMYXllclwiXG5cdG15UmVtb3RlID0gbmV3IFJlbW90ZUxheWVyXG5cdFx0Y2xpY2tBY3Rpb246IC0+IGZlLmNoYW5nZUZvY3VzKFwic2VsZWN0XCIpXG5cdFx0c3dpcGVVcEFjdGlvbjogLT4gZmUuY2hhbmdlRm9jdXMoXCJ1cFwiKVxuXHRcdHN3aXBlRG93bkFjdGlvbjogLT4gZmUuY2hhbmdlRm9jdXMoXCJkb3duXCIpXG5cdFx0c3dpcGVMZWZ0QWN0aW9uOiAtPiBmZS5jaGFuZ2VGb2N1cyhcImxlZnRcIilcblx0XHRzd2lwZVJpZ2h0QWN0aW9uOiAtPiBmZS5jaGFuZ2VGb2N1cyhcInJpZ2h0XCIpXG5cblx0IyBFbmFibGUgZGVidWcgbW9kZSB0byBsb2cgZm9jdXMgY2hhbmdlc1xuXHRmZS5kZWJ1ZyA9IHRydWVcbiMjI1xuXG5leHBvcnRzLmRlYnVnID0gZmFsc2VcblxuIyBmb2N1cyBzdG9yZVxuZXhwb3J0cy5mb2N1cyA9IG51bGxcbmV4cG9ydHMuaW5pdGlhbEZvY3VzID0gbnVsbFxuZXhwb3J0cy5wcmV2aW91c0ZvY3VzID0gbnVsbFxuZXhwb3J0cy5mb2N1c2FibGUgPSBbXVxuZXhwb3J0cy50aW1lID0gMC4yNVxuXG4jIGZvY3VzIHN0eWxlXG5leHBvcnRzLmZvY3VzU3R5bGUgPVxuXHRzY2FsZTogMS4xXG5cdHNoYWRvd0JsdXI6IDIwXG5cdHNoYWRvd0NvbG9yOiBcInJnYmEoMCwwLDAsMC4zKVwiXG5cdHNoYWRvd1g6IDBcblx0c2hhZG93WTogMFxuXHRzaGFkb3dTcHJlYWQ6IDBcblxuZXhwb3J0cy51bmZvY3VzU3R5bGUgPVxuXHRzaGFkb3dCbHVyOiAyMFxuXHRzaGFkb3dDb2xvcjogXCJyZ2JhKDAsMCwwLDApXCJcblx0c2hhZG93WDogMFxuXHRzaGFkb3dZOiAwXG5cdHNoYWRvd1NwcmVhZDogMFxuXG4jIHByZXAgZm9jdXMgc3RhdGVzXG5leHBvcnRzLmluaXRpYWxpemUgPSAoZm9jdXNhYmxlQXJyYXkpIC0+XG5cdGV4cG9ydHMuZm9jdXNhYmxlID0gZm9jdXNhYmxlQXJyYXlcblx0Zm9yIGxheWVyIGluIGV4cG9ydHMuZm9jdXNhYmxlXG5cdFx0aWYgbGF5ZXIub3ZlcnJpZGVzID09IHVuZGVmaW5lZFxuXHRcdFx0bGF5ZXIub3ZlcnJpZGVzID1cblx0XHRcdFx0dXA6IG51bGxcblx0XHRcdFx0ZG93bjogbnVsbFxuXHRcdFx0XHRsZWZ0OiBudWxsXG5cdFx0XHRcdHJpZ2h0OiBudWxsXG5cdFx0bGF5ZXIuZm9jdXMgPSBmYWxzZVxuXHRcdHN0eWxlTGF5ZXIobGF5ZXIpXG5cbiMgbGF5ZXIgdmlzaWJpbGl0eVxuY2hlY2tWaXNpYmxlID0gKGxheWVyKSAtPlxuXHRpc1Zpc2libGUgPSB0cnVlXG5cdGlmIGxheWVyLnZpc2libGUgPT0gZmFsc2Vcblx0XHRpc1Zpc2libGUgPSBmYWxzZVxuXHRcdHJldHVybiBpc1Zpc2libGVcblx0Zm9yIGFuY2VzdG9yIGluIGxheWVyLmFuY2VzdG9ycygpXG5cdFx0aWYgYW5jZXN0b3I/LnZpc2libGUgPT0gZmFsc2Vcblx0XHRcdGlzVmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRyZXR1cm4gaXNWaXNpYmxlXG5cdFx0ZWxzZVxuXHRcdFx0aXNWaXNpYmxlID0gdHJ1ZVxuXHRyZXR1cm4gaXNWaXNpYmxlXG5cbiMgZm9jdXMgY2hhbmdlXG5leHBvcnRzLnBsYWNlRm9jdXMgPSBVdGlscy50aHJvdHRsZSAwLjEsIChsYXllciA9IG51bGwpIC0+XG5cdGlmIGxheWVyID09IG51bGxcblx0XHRyZXR1cm5cblx0IyBzdG9yZSBpbml0aWFsIGZvY3VzIG9uIGZpcnN0IHJ1blxuXHRpZiBleHBvcnRzLmluaXRpYWxGb2N1cyA9PSBudWxsXG5cdFx0ZXhwb3J0cy5pbml0aWFsRm9jdXMgPSBsYXllclxuXHQjIHN0b3JlIGN1cnJlbnQgZm9jdXMgZm9yIHJldHVybmluZyBlYXNpbHlcblx0aWYgZXhwb3J0cy5mb2N1cyAhPSBudWxsXG5cdFx0ZXhwb3J0cy5wcmV2aW91c0ZvY3VzID0gZXhwb3J0cy5mb2N1c1xuXHRpZiBjaGVja1Zpc2libGUobGF5ZXIpID09IHRydWUgYW5kIGxheWVyICE9IG51bGxcblx0XHRleHBvcnRzLmZvY3VzID0gbGF5ZXJcblx0XHR1bmZvY3VzQWxsKClcblx0XHRsYXllci5lbWl0IFwiZm9jdXNcIlxuXHRcdGxheWVyLmZvY3VzID0gdHJ1ZVxuXHRcdGlmIGxheWVyICE9IG51bGwgYW5kIGxheWVyIGluIGV4cG9ydHMuZm9jdXNhYmxlXG5cdFx0XHRsYXllcj8uYW5pbWF0ZShcImZvY3VzXCIpXG5cbnVuZm9jdXNBbGwgPSAoKSAtPlxuXHRmb3IgbGF5ZXIgaW4gZXhwb3J0cy5mb2N1c2FibGVcblx0XHRpZiBsYXllci5mb2N1cyA9PSB0cnVlXG5cdFx0XHRsYXllci5lbWl0IFwidW5mb2N1c1wiXG5cdFx0XHRsYXllci5mb2N1cyA9IGZhbHNlXG5cdFx0XHRsYXllci5hbmltYXRlKFwidW5mb2N1c1wiKVxuXG5leHBvcnRzLmZvY3VzUHJldmlvdXMgPSAoKSAtPlxuXHRpZiBleHBvcnRzLnByZXZpb3VzRm9jdXMgIT0gbnVsbFxuXHRcdGV4cG9ydHMucGxhY2VGb2N1cyhleHBvcnRzLnByZXZpb3VzRm9jdXMpXG5cbmV4cG9ydHMuYWRkTGF5ZXIgPSAobGF5ZXIpIC0+XG5cdGV4cG9ydHMuZm9jdXNhYmxlLnB1c2gobGF5ZXIpXG5cdGxheWVyLmZvY3VzID0gZmFsc2Vcblx0c3R5bGVMYXllcihsYXllcilcblxuc3R5bGVMYXllciA9IChsYXllcikgLT5cblx0bGF5ZXIuc3RhdGVzLmZvY3VzID1cblx0XHRzY2FsZTogbGF5ZXIuc2NhbGUgKiBleHBvcnRzLmZvY3VzU3R5bGUuc2NhbGVcblx0XHRzaGFkb3dCbHVyOiBleHBvcnRzLmZvY3VzU3R5bGUuc2hhZG93Qmx1clxuXHRcdHNoYWRvd1NwcmVhZDogZXhwb3J0cy5mb2N1c1N0eWxlLnNoYWRvd1NwcmVhZFxuXHRcdHNoYWRvd0NvbG9yOiBleHBvcnRzLmZvY3VzU3R5bGUuc2hhZG93Q29sb3Jcblx0XHRzaGFkb3dYOiBleHBvcnRzLmZvY3VzU3R5bGUuc2hhZG93WFxuXHRcdHNoYWRvd1k6IGV4cG9ydHMuZm9jdXNTdHlsZS5zaGFkb3dZXG5cdFx0YW5pbWF0aW9uT3B0aW9uczogdGltZTogZXhwb3J0cy50aW1lXG5cdGxheWVyLnN0YXRlcy51bmZvY3VzID1cblx0XHRzY2FsZTogbGF5ZXIuc2NhbGVcblx0XHRzaGFkb3dCbHVyOiBleHBvcnRzLnVuZm9jdXNTdHlsZS5zaGFkb3dCbHVyXG5cdFx0c2hhZG93U3ByZWFkOiBleHBvcnRzLnVuZm9jdXNTdHlsZS5zaGFkb3dTcHJlYWRcblx0XHRzaGFkb3dDb2xvcjogZXhwb3J0cy51bmZvY3VzU3R5bGUuc2hhZG93Q29sb3Jcblx0XHRzaGFkb3dYOiBleHBvcnRzLnVuZm9jdXNTdHlsZS5zaGFkb3dYXG5cdFx0c2hhZG93WTogZXhwb3J0cy51bmZvY3VzU3R5bGUuc2hhZG93WVxuXHRcdGFuaW1hdGlvbk9wdGlvbnM6IHRpbWU6IGV4cG9ydHMudGltZVxuXHRsYXllci5hbmltYXRlKFwidW5mb2N1c1wiLCBpbnN0YW50OiB0cnVlKVxuXG5leHBvcnRzLmNoYW5nZUZvY3VzID0gVXRpbHMudGhyb3R0bGUgMC4xLCAoZGlyZWN0aW9uKSAtPlxuXHQjIGlmIGZvY3VzIHdhcyBuZXZlciBwbGFjZWQsIGdpdmUgdXBcblx0aWYgZXhwb3J0cy5mb2N1cyA9PSBudWxsIGFuZCBleHBvcnRzLmluaXRpYWxGb2N1cyA9PSBudWxsXG5cdFx0cHJpbnQgXCJObyBpbml0aWFsIGZvY3VzIHNldC4gVXNlIHBsYWNlRm9jdXMobGF5ZXIpIHRvIHNldC5cIlxuXHRcdHJldHVyblxuXHRpZiBleHBvcnRzLmRlYnVnID09IHRydWVcblx0XHRwcmludCBcImZvY3VzIHdhczogXCIgKyAoZXhwb3J0cy5mb2N1cz8ubmFtZSBvciBleHBvcnRzLmZvY3VzPy5fX2ZyYW1lckluc3RhbmNlSW5mbz8udGFyZ2V0TmFtZSBvciBcInVubmFtZWQgbGF5ZXJcIikgKyBcIjsgZGlyZWN0aW9uOiBcIiArIGRpcmVjdGlvblxuXHR0ZW1wQXJyYXkgPSBbXVxuXHQjIGlmIHdlJ3ZlIGxvc3QgYWxsIGZvY3VzLCByZXNldFxuXHRpZiBleHBvcnRzLmZvY3VzID09IG51bGwgb3IgZXhwb3J0cy5mb2N1cyA9PSB1bmRlZmluZWRcblx0XHRleHBvcnRzLnBsYWNlRm9jdXMoZXhwb3J0cy5pbml0aWFsRm9jdXMpXG5cdGlmIGV4cG9ydHMuZm9jdXMub3ZlcnJpZGVzP1tkaXJlY3Rpb25dICE9IHVuZGVmaW5lZCBhbmQgZXhwb3J0cy5mb2N1cy5vdmVycmlkZXM/W2RpcmVjdGlvbl0gIT0gbnVsbCAjIG92ZXJyaWRlXG5cdFx0ZXhwb3J0cy5wbGFjZUZvY3VzKGV4cG9ydHMuZm9jdXMub3ZlcnJpZGVzW2RpcmVjdGlvbl0pXG5cdGVsc2Vcblx0XHRmb2N1c01pZFggPSBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLnggKyBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLndpZHRoLzJcblx0XHRmb2N1c01pZFkgPSBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLnkgKyBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLmhlaWdodC8yXG5cdFx0aWYgZGlyZWN0aW9uID09IFwidXBcIlxuXHRcdFx0Zm9yIGxheWVyIGluIGV4cG9ydHMuZm9jdXNhYmxlXG5cdFx0XHRcdGxheWVyTWlkWSA9IGxheWVyLnNjcmVlbkZyYW1lLnkgKyBsYXllci5zY3JlZW5GcmFtZS5oZWlnaHQvMlxuXHRcdFx0XHRpZiBsYXllck1pZFkgPCBmb2N1c01pZFkgYW5kIGNoZWNrVmlzaWJsZShsYXllcikgPT0gdHJ1ZVxuXHRcdFx0XHRcdHRlbXBBcnJheS5wdXNoKGxheWVyKVxuXHRcdGVsc2UgaWYgZGlyZWN0aW9uID09IFwiZG93blwiXG5cdFx0XHRmb3IgbGF5ZXIgaW4gZXhwb3J0cy5mb2N1c2FibGVcblx0XHRcdFx0bGF5ZXJNaWRZID0gbGF5ZXIuc2NyZWVuRnJhbWUueSArIGxheWVyLnNjcmVlbkZyYW1lLmhlaWdodC8yXG5cdFx0XHRcdGlmIGxheWVyTWlkWSA+IGZvY3VzTWlkWSBhbmQgY2hlY2tWaXNpYmxlKGxheWVyKSA9PSB0cnVlXG5cdFx0XHRcdFx0dGVtcEFycmF5LnB1c2gobGF5ZXIpXG5cdFx0ZWxzZSBpZiBkaXJlY3Rpb24gPT0gXCJsZWZ0XCJcblx0XHRcdGZvciBsYXllciBpbiBleHBvcnRzLmZvY3VzYWJsZVxuXHRcdFx0XHRsYXllck1pZFggPSBsYXllci5zY3JlZW5GcmFtZS54ICsgbGF5ZXIuc2NyZWVuRnJhbWUud2lkdGgvMlxuXHRcdFx0XHRpZiBsYXllck1pZFggPCBmb2N1c01pZFggYW5kIGNoZWNrVmlzaWJsZShsYXllcikgPT0gdHJ1ZVxuXHRcdFx0XHRcdHRlbXBBcnJheS5wdXNoKGxheWVyKVxuXHRcdGVsc2UgaWYgZGlyZWN0aW9uID09IFwicmlnaHRcIlxuXHRcdFx0Zm9yIGxheWVyIGluIGV4cG9ydHMuZm9jdXNhYmxlXG5cdFx0XHRcdGxheWVyTWlkWCA9IGxheWVyLnNjcmVlbkZyYW1lLnggKyBsYXllci5zY3JlZW5GcmFtZS53aWR0aC8yXG5cdFx0XHRcdGlmIGxheWVyTWlkWCA+IGZvY3VzTWlkWCBhbmQgY2hlY2tWaXNpYmxlKGxheWVyKSA9PSB0cnVlXG5cdFx0XHRcdFx0dGVtcEFycmF5LnB1c2gobGF5ZXIpXG5cdFx0ZWxzZSBpZiBkaXJlY3Rpb24gPT0gXCJzZWxlY3RcIlxuXHRcdFx0ZXhwb3J0cy5mb2N1cy5lbWl0IFwic2VsZWN0ZWRcIlxuXHRcdGlmIHRlbXBBcnJheS5sZW5ndGggPT0gMFxuXHRcdFx0cmV0dXJuXG5cdFx0dGFyZ2V0TGF5ZXIgPSB0ZW1wQXJyYXlbMF1cblx0XHRzaG9ydGVzdERpc3RhbmNlID0gbWVhc3VyZURpc3RhbmNlKHRhcmdldExheWVyLCBkaXJlY3Rpb24pXG5cdFx0Zm9yIGxheWVyIGluIHRlbXBBcnJheVxuXHRcdFx0ZGlzdGFuY2UgPSBtZWFzdXJlRGlzdGFuY2UobGF5ZXIsIGRpcmVjdGlvbilcblx0XHRcdGlmIGRpc3RhbmNlIDwgc2hvcnRlc3REaXN0YW5jZVxuXHRcdFx0XHR0YXJnZXRMYXllciA9IGxheWVyXG5cdFx0XHRcdHNob3J0ZXN0RGlzdGFuY2UgPSBkaXN0YW5jZVxuXHRcdGV4cG9ydHMucGxhY2VGb2N1cyh0YXJnZXRMYXllcilcblxubWVhc3VyZURpc3RhbmNlID0gKHRhcmdldCwgZGlyZWN0aW9uKSAtPlxuXHRmb2N1c1RvcENlbnRlciA9XG5cdFx0eDogZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS54ICsgZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS53aWR0aC8yXG5cdFx0eTogZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS55XG5cdGZvY3VzQm90dG9tQ2VudGVyID1cblx0XHR4OiBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLnggKyBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLndpZHRoLzJcblx0XHR5OiBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLnkgKyBleHBvcnRzLmZvY3VzLnNjcmVlbkZyYW1lLmhlaWdodFxuXHRmb2N1c0xlZnRDZW50ZXIgPVxuXHRcdHg6IGV4cG9ydHMuZm9jdXMuc2NyZWVuRnJhbWUueFxuXHRcdHk6IGV4cG9ydHMuZm9jdXMuc2NyZWVuRnJhbWUueSArIGV4cG9ydHMuZm9jdXMuc2NyZWVuRnJhbWUuaGVpZ2h0LzJcblx0Zm9jdXNSaWdodENlbnRlciA9XG5cdFx0eDogZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS54ICsgZXhwb3J0cy5mb2N1cy5zY3JlZW5GcmFtZS53aWR0aFxuXHRcdHk6IGV4cG9ydHMuZm9jdXMuc2NyZWVuRnJhbWUueSArIGV4cG9ydHMuZm9jdXMuc2NyZWVuRnJhbWUuaGVpZ2h0LzJcblx0dGFyZ2V0VG9wQ2VudGVyID1cblx0XHR4OiB0YXJnZXQuc2NyZWVuRnJhbWUueCArIHRhcmdldC5zY3JlZW5GcmFtZS53aWR0aC8yXG5cdFx0eTogdGFyZ2V0LnNjcmVlbkZyYW1lLnlcblx0dGFyZ2V0Qm90dG9tQ2VudGVyID1cblx0XHR4OiB0YXJnZXQuc2NyZWVuRnJhbWUueCArIHRhcmdldC5zY3JlZW5GcmFtZS53aWR0aC8yXG5cdFx0eTogdGFyZ2V0LnNjcmVlbkZyYW1lLnkgKyB0YXJnZXQuc2NyZWVuRnJhbWUuaGVpZ2h0XG5cdHRhcmdldExlZnRDZW50ZXIgPVxuXHRcdHg6IHRhcmdldC5zY3JlZW5GcmFtZS54XG5cdFx0eTogdGFyZ2V0LnNjcmVlbkZyYW1lLnkgKyB0YXJnZXQuc2NyZWVuRnJhbWUuaGVpZ2h0LzJcblx0dGFyZ2V0UmlnaHRDZW50ZXIgPVxuXHRcdHg6IHRhcmdldC5zY3JlZW5GcmFtZS54ICsgdGFyZ2V0LnNjcmVlbkZyYW1lLndpZHRoXG5cdFx0eTogdGFyZ2V0LnNjcmVlbkZyYW1lLnkgKyB0YXJnZXQuc2NyZWVuRnJhbWUuaGVpZ2h0LzJcblx0c3dpdGNoIGRpcmVjdGlvblxuXHRcdHdoZW4gXCJ1cFwiXG5cdFx0XHRkaXN0YW5jZVggPSBmb2N1c1RvcENlbnRlci54IC0gdGFyZ2V0Qm90dG9tQ2VudGVyLnhcblx0XHRcdGRpc3RhbmNlWSA9IGZvY3VzVG9wQ2VudGVyLnkgLSB0YXJnZXRCb3R0b21DZW50ZXIueVxuXHRcdHdoZW4gXCJkb3duXCJcblx0XHRcdGRpc3RhbmNlWCA9IGZvY3VzQm90dG9tQ2VudGVyLnggLSB0YXJnZXRUb3BDZW50ZXIueFxuXHRcdFx0ZGlzdGFuY2VZID0gZm9jdXNCb3R0b21DZW50ZXIueSAtIHRhcmdldEJvdHRvbUNlbnRlci55XG5cdFx0d2hlbiBcImxlZnRcIlxuXHRcdFx0ZGlzdGFuY2VYID0gZm9jdXNMZWZ0Q2VudGVyLnggLSB0YXJnZXRSaWdodENlbnRlci54XG5cdFx0XHRkaXN0YW5jZVkgPSBmb2N1c0xlZnRDZW50ZXIueSAtIHRhcmdldFJpZ2h0Q2VudGVyLnlcblx0XHR3aGVuIFwicmlnaHRcIlxuXHRcdFx0ZGlzdGFuY2VYID0gZm9jdXNSaWdodENlbnRlci54IC0gdGFyZ2V0TGVmdENlbnRlci54XG5cdFx0XHRkaXN0YW5jZVkgPSBmb2N1c1JpZ2h0Q2VudGVyLnkgLSB0YXJnZXRMZWZ0Q2VudGVyLnlcblx0IyBQeXRoYWdvcmVhbiB0aGVvcmVtIHRvIG1lYXN1cmUgdGhlIGh5cG90ZW5ldXNlXG5cdGFic29sdXRlRGlzdGFuY2UgPSBNYXRoLnNxcnQoZGlzdGFuY2VYICogZGlzdGFuY2VYICsgZGlzdGFuY2VZICogZGlzdGFuY2VZKVxuXHRyZXR1cm4gYWJzb2x1dGVEaXN0YW5jZVxuXG5FdmVudHMuRm9jdXMgPSBcImZvY3VzXCJcbkxheWVyOjpvbkZvY3VzID0gKGNiKSAtPiBAb24oRXZlbnRzLkZvY3VzLCBjYilcbkV2ZW50cy5VbmZvY3VzID0gXCJ1bmZvY3VzXCJcbkxheWVyOjpvblVuZm9jdXMgPSAoY2IpIC0+IEBvbihFdmVudHMuVW5mb2N1cywgY2IpXG5FdmVudHMuU2VsZWN0ZWQgPSBcInNlbGVjdGVkXCJcbkxheWVyOjpvblNlbGVjdGVkID0gKGNiKSAtPiBAb24oRXZlbnRzLlNlbGVjdGVkLCBjYilcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBOztBREFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBLHFEQUFBO0VBQUE7O0FBeUVBLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUdoQixPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFDaEIsT0FBTyxDQUFDLFlBQVIsR0FBdUI7O0FBQ3ZCLE9BQU8sQ0FBQyxh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
