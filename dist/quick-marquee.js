
/**
 * quick-marquee.js - 1.0.0
 *
 * @license MIT
 */

var QuickMarquee = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
    return _classApplyDescriptorGet(receiver, descriptor);
  }
  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _classPrivateMethodInitSpec(obj, privateSet) {
    _checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }

  function debounce(waitMs, handler) {
    var timer;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (timer !== undefined) clearTimeout(timer);
      timer = setTimeout(function () {
        handler.apply(void 0, args);
      }, waitMs);
    };
  }

  function getElement(value) {
    if (typeof value === "string") {
      return document.querySelector(value);
    }
    if (value instanceof HTMLElement) return value;
    if (Array.isArray(value) && value[0] instanceof HTMLElement) {
      return value[0];
    }
    return null;
  }

  function getWidth(element) {
    var style = window.getComputedStyle(element, null);
    var left = Number.parseFloat(style.marginLeft);
    var right = Number.parseFloat(style.marginRight);
    var gap = element.parentElement ? Number.parseFloat(window.getComputedStyle(element.parentElement, null).columnGap) : 0;
    return element.offsetWidth + (Number.isFinite(left) ? left : 0) + (Number.isFinite(right) ? right : 0) + (Number.isFinite(gap) ? gap : 0);
  }

  var DEFAULT_OPTIONS = {
    pixelsPerFrame: 0.5,
    debounceMs: 20
  };
  var _itemSources = /*#__PURE__*/new WeakMap();
  var _busy = /*#__PURE__*/new WeakMap();
  var _running = /*#__PURE__*/new WeakMap();
  var _items = /*#__PURE__*/new WeakMap();
  var _totalWidth = /*#__PURE__*/new WeakMap();
  var _offset = /*#__PURE__*/new WeakMap();
  var _generateItems = /*#__PURE__*/new WeakSet();
  var _update = /*#__PURE__*/new WeakSet();
  var QuickMarquee = /*#__PURE__*/function () {
    function QuickMarquee(target) {
      var _options$pixelsPerFra,
        _options$debounceMs,
        _this = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, QuickMarquee);
      _classPrivateMethodInitSpec(this, _update);
      _classPrivateMethodInitSpec(this, _generateItems);
      _defineProperty(this, "target", void 0);
      _defineProperty(this, "pixelsPerFrame", void 0);
      _classPrivateFieldInitSpec(this, _itemSources, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _busy, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _running, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _items, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _totalWidth, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _offset, {
        writable: true,
        value: void 0
      });
      this.target = getElement(target);
      this.pixelsPerFrame = (_options$pixelsPerFra = options === null || options === void 0 ? void 0 : options.pixelsPerFrame) !== null && _options$pixelsPerFra !== void 0 ? _options$pixelsPerFra : DEFAULT_OPTIONS.pixelsPerFrame;
      _classPrivateFieldSet(this, _itemSources, this.target !== null ? Array.from(this.target.querySelectorAll(":scope > *")) : []);
      _classPrivateFieldSet(this, _busy, false);
      _classPrivateFieldSet(this, _running, false);
      _classPrivateFieldSet(this, _items, []);
      _classPrivateFieldSet(this, _totalWidth, 0);
      _classPrivateFieldSet(this, _offset, 0);
      _classPrivateMethodGet(this, _generateItems, _generateItems2).call(this);
      var debounceMs = (_options$debounceMs = options === null || options === void 0 ? void 0 : options.debounceMs) !== null && _options$debounceMs !== void 0 ? _options$debounceMs : DEFAULT_OPTIONS.debounceMs;
      window.addEventListener("resize", debounce(debounceMs, function () {
        return _classPrivateMethodGet(_this, _generateItems, _generateItems2).call(_this);
      }));
    }
    _createClass(QuickMarquee, [{
      key: "start",
      value: function start() {
        var _this2 = this;
        if (_classPrivateFieldGet(this, _running)) return this;
        _classPrivateFieldSet(this, _running, true);
        window.requestAnimationFrame(function () {
          return _classPrivateMethodGet(_this2, _update, _update2).call(_this2);
        });
        return this;
      }
    }, {
      key: "stop",
      value: function stop() {
        _classPrivateFieldSet(this, _running, false);
        return this;
      }
    }]);
    return QuickMarquee;
  }();
  function _generateItems2() {
    var _this3 = this;
    if (this.target === null) return;
    _classPrivateFieldSet(this, _busy, true);
    this.target.innerHTML = "";
    _classPrivateFieldGet(this, _itemSources).forEach(function (x) {
      var _this3$target;
      return (_this3$target = _this3.target) === null || _this3$target === void 0 ? void 0 : _this3$target.appendChild(x);
    });
    Number.parseFloat(window.getComputedStyle(this.target, null).columnGap);
    var widths = _classPrivateFieldGet(this, _itemSources).map(function (e) {
      return e.offsetWidth;
    });
    var fullWidths = _classPrivateFieldGet(this, _itemSources).map(function (e, i, a) {
      return getWidth(e);
    });
    var totalWidth = fullWidths.reduce(function (a, b) {
      return a + b;
    }, 0);
    var containerWidth = this.target.offsetWidth;
    var items = [];
    var width = 0;
    var index = 0;
    while (width < containerWidth + totalWidth) {
      var item = _classPrivateFieldGet(this, _itemSources)[index].cloneNode(true);
      item.style.width = "".concat(widths[index], "px");
      items.push(item);
      width += fullWidths[index];
      index = (index + 1) % widths.length;
    }
    _classPrivateFieldSet(this, _items, items);
    _classPrivateFieldSet(this, _totalWidth, totalWidth);
    this.target.innerHTML = "";
    items.forEach(function (x) {
      var _this3$target2;
      return (_this3$target2 = _this3.target) === null || _this3$target2 === void 0 ? void 0 : _this3$target2.appendChild(x);
    });
    _classPrivateFieldSet(this, _offset, _classPrivateFieldGet(this, _offset) % _classPrivateFieldGet(this, _totalWidth));
    _classPrivateFieldSet(this, _busy, false);
  }
  function _update2() {
    var _this4 = this;
    if (_classPrivateFieldGet(this, _running)) window.requestAnimationFrame(function () {
      return _classPrivateMethodGet(_this4, _update, _update2).call(_this4);
    });
    if (_classPrivateFieldGet(this, _busy)) return;
    _classPrivateFieldSet(this, _offset, this.pixelsPerFrame > 0 ? (_classPrivateFieldGet(this, _offset) + this.pixelsPerFrame) % _classPrivateFieldGet(this, _totalWidth) : (_classPrivateFieldGet(this, _offset) + _classPrivateFieldGet(this, _totalWidth) + this.pixelsPerFrame) % _classPrivateFieldGet(this, _totalWidth));
    _classPrivateFieldGet(this, _items).forEach(function (x) {
      x.style.transform = "translate(".concat(-_classPrivateFieldGet(_this4, _offset), "px, 0)");
    });
  }

  return QuickMarquee;

})();
