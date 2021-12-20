import Vue from 'vue';

function _defineProperty(obj, key, value) {
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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

// import Tooltip from "element-ui/lib/tooltip";
// Elment Tooltip 指令简单的封装
// overflowMode, 通过 .overflow 修饰符，只有当内容超过时才显示tooltip
var positions = ["top", "top-start", "top-end", "right", "right-start", "right-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end"];

function getContent(value) {
  var type = _typeof(value);

  if (type === "string") {
    return value;
  } else if (value && type === "object") {
    return value.content;
  } else {
    return false;
  }
}

function getPlacement(value, modifiers) {
  var placement = value.placement;

  for (var i = 0; i < positions.length; i++) {
    var pos = positions[i];

    if (modifiers[pos]) {
      placement = pos;
    }
  }

  return placement;
}

function createTooltip(el, value, modifiers) {
  var content = getContent(value);
  var placement = getPlacement(value, modifiers);
  var instance = new Vue({
    data: function data() {
      return {
        config: value,
        content: content,
        placement: placement
      };
    },
    methods: {
      updateConifg: function updateConifg(content, placement, value) {
        this.content = content;
        this.placement = placement;
        this.config = value;
      }
    },
    render: function render() {
      var h = arguments[0];
      return h("Tooltip", {
        "ref": "tooltip",
        "attrs": _objectSpread2(_objectSpread2({}, this.config), {}, {
          "content": this.content,
          "placement": this.placement
        })
      });
    }
  }).$mount();
  el._tooltip = instance.$refs.tooltip;
  el._tooltip.referenceElm = el;
  el._tooltipWrapper = instance;
  return el._tooltip;
}

function addListeners(el) {
  el.addEventListener("mouseenter", function (event) {
    var tooltip = el._tooltip;

    if (el._overflowMode && !isContentOverflow(el)) {
      return;
    }

    if (tooltip) {
      tooltip.$refs.popper && (tooltip.$refs.popper.style.display = "none");
      tooltip.doDestroy();
      tooltip.setExpectedState(true);
      tooltip.handleShowPopper();
    }
  });
  el.addEventListener("mouseleave", function (event) {
    var tooltip = el._tooltip;

    if (tooltip) {
      tooltip.setExpectedState(false);
      tooltip.handleClosePopper();
    }
  });
}

function isContentOverflow(el) {
  // use range width instead of scrollWidth to determine whether the text is overflowing
  // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
  var range = document.createRange();
  range.setStart(el, 0);
  range.setEnd(el, el.childNodes.length);
  var rangeWidth = range.getBoundingClientRect().width;
  var padding = (parseInt(getComputedStyle(el).paddingLeft, 10) || 0) + (parseInt(getComputedStyle(el).paddingRight, 10) || 0);
  return rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth;
}

function bind(el, _ref) {
  var value = _ref.value;
      _ref.oldValue;
      var modifiers = _ref.modifiers;
  var content = getContent(value); // console.log(value, oldValue, modifiers);

  if (!content) {
    destroyTooltip(el);
  } else {
    if (el._tooltip) {
      el._tooltipWrapper.updateConifg(content, getPlacement(value, modifiers), value);
    } else {
      createTooltip(el, value, modifiers);
      addListeners(el);
    }

    if (modifiers.overflow) {
      el._overflowMode = true;
    }
  }
}

var directive = {
  bind: bind,
  update: bind,
  unbind: function unbind(el) {
    destroyTooltip(el);
  }
};

function destroyTooltip(el) {
  if (el._tooltip) {
    el._tooltip.doDestroy();

    el._tooltipWrapper.$destroy();

    delete el._tooltip;
    delete el._overflowMode;
    delete el._tooltipWrapper;
  }
}

var install = function install(Vue) {
  Vue.directive('tooltip', directive);
};

var index = {
  install: install,
  ElementVTooltip: directive
};

export { index as default };
