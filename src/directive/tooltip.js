import Vue from "vue";
import {Tooltip} from 'element-ui'
// import Tooltip from "element-ui/lib/tooltip";

// Elment Tooltip 指令简单的封装
// overflowMode, 通过 .overflow 修饰符，只有当内容超过时才显示tooltip

const positions = [
  "top",
  "top-start",
  "top-end",
  "right",
  "right-start",
  "right-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end"
];

function getContent(value) {
  const type = typeof value;
  if (type === "string") {
    return value;
  } else if (value && type === "object") {
    return value.content;
  } else {
    return false;
  }
}

export function getPlacement(value, modifiers) {
  let placement = value.placement;
  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    if (modifiers[pos]) {
      placement = pos;
    }
  }
  return placement;
}

function createTooltip(el, value, modifiers) {
  const content = getContent(value);
  const placement = getPlacement(value, modifiers);

  const instance = new Vue({
    data() {
      return {
        config: value,
        content,
        placement
      };
    },
    methods: {
      updateConifg(content, placement, value) {
        this.content = content;
        this.placement = placement;
        this.config = value;
      }
    },
    render() {
      return (
        <Tooltip
          ref="tooltip"
          {...{ attrs: this.config }}
          content={this.content}
          placement={this.placement}
        />
      );
    }
  }).$mount();
  el._tooltip = instance.$refs.tooltip;
  el._tooltip.referenceElm = el;
  el._tooltipWrapper = instance;
  return el._tooltip;
}

function addListeners(el) {
  el.addEventListener("mouseenter", event => {
    let tooltip = el._tooltip;
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
  el.addEventListener("mouseleave", event => {
    let tooltip = el._tooltip;
    if (tooltip) {
      tooltip.setExpectedState(false);
      tooltip.handleClosePopper();
    }
  });
}

export function isContentOverflow(el) {
  // use range width instead of scrollWidth to determine whether the text is overflowing
  // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
  const range = document.createRange();
  range.setStart(el, 0);
  range.setEnd(el, el.childNodes.length);
  const rangeWidth = range.getBoundingClientRect().width;
  const padding =
    (parseInt(getComputedStyle(el).paddingLeft, 10) || 0) +
    (parseInt(getComputedStyle(el).paddingRight, 10) || 0);
  return (
    rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth
  );
}

function bind(el, { value, oldValue, modifiers }) {
  const content = getContent(value);
  // console.log(value, oldValue, modifiers);
  if (!content) {
    destroyTooltip(el);
  } else {
    if (el._tooltip) {
      el._tooltipWrapper.updateConifg(
        content,
        getPlacement(value, modifiers),
        value
      );
    } else {
      createTooltip(el, value, modifiers);
      addListeners(el);
    }
    if (modifiers.overflow) {
      el._overflowMode = true;
    }
  }
}

export const directive = {
  bind,
  update: bind,
  unbind(el) {
    destroyTooltip(el);
  }
};

export default directive;

function destroyTooltip(el) {
  if (el._tooltip) {
    el._tooltip.doDestroy();
    el._tooltipWrapper.$destroy();
    delete el._tooltip;
    delete el._overflowMode;
    delete el._tooltipWrapper;
  }
}
