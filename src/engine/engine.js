// librateX/engine/engine.js

function loadTailwind() {
  // already loaded? then skip
  if (document.querySelector('script[data-miniwin="tailwind"]')) return;

  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
  s.defer = true;
  s.setAttribute("data-miniwin", "tailwind");
  document.head.appendChild(s);
}

import React from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18/client";
import { AddForm } from "./AddForm.js";

class App {
  constructor(initial) {
    this.elements = new Map();
    this.listeners = {};

    loadTailwind();
    const el = document.getElementById(initial.id);
    if (!el) throw new Error(`Missing root: #${initial.id}`);

    this.root = ReactDOM.createRoot(el);

    // Agar initial title hai toh usko bhi container ke saath group karo
    if (initial.title) {
      let element = React.createElement(
        "h1",
        { className: initial.style },
        initial.title
      );
      this.append(element, initial.container);
    } else {
      // Agar title nahi hai toh bas empty render karo
      this.render();
    }
  }

  append(_element_, name = "__DEFAULT__") {
    const groupName = name ?? "__DEFAULT__";

    if (!this.elements.has(groupName)) {
      // Pehla element => wrapper div banao
      const wrapper = React.createElement(
        "div",
        { key: groupName, "data-group": groupName },
        _element_
      );
      this.elements.set(groupName, wrapper);
    } else {
      // Existing wrapper ko get karo
      const temp = this.elements.get(groupName);

      // Purane children extract karo
      const oldChildren = temp.props?.children ?? [];
      const childrenArr = Array.isArray(oldChildren) ? oldChildren : [oldChildren];

      // Naya wrapper banao with appended child
      const tmp = React.createElement(
        "div",
        { key: groupName, "data-group": groupName },
        ...childrenArr,
        _element_
      );

      this.elements.set(groupName, tmp);
    }

    this.render();
  }

  render() {
    const groups = Array.from(this.elements.values());
    this.root.render(
      React.createElement("div", {}, ...groups)
    );
  }

  add_listener(name, fn) {
    this.listeners[name] = fn;
  }

  call_listener(name, event) {
    if (this.listeners[name]) {
      this.listeners[name](event);
    }
  }

  add_input(props) {
    if (props.context !== "__INPUT__") {
      throw new Error(`add_input expects context="__INPUT__", got ${props.context}`);
    }

    if (!props.id) {
      throw new Error("add_input requires unique \`id\`");
    }

    const element = React.createElement(
      "input",
      {
        id: props.id,
        type: props.type,
        placeholder: props.placeholder ?? "",
        className: props.style,

        onChange: (e) => {
          if (typeof props.onchange === "string") {
            this.call_listener(props.onchange, e);
          }
        }
      }
    );

    this.append(element, props.container);
  }

  add_button(props) {
    if (props.context !== "__BUTTON__") {
      throw new Error(`add_button expects context="__BUTTON__", got ${props.context}`);
    }

    if (!props.text) {
      throw new Error("add_button requires \`text\`");
    }

    const element = React.createElement(
      "button",
      {
        id: props.id ?? undefined,
        className: props.style ?? "",

        onClick: (e) => {
          if (typeof props.onclick === "string") {
            this.call_listener(props.onclick, e);
          }
          if (typeof props.onclick === "function") {
            props.onclick(e);
          }
        }
      },
      props.text
    );

    this.append(element, props.container);
  }

  add_form(props) {
    if (props.context !== "__FORM__") {
      throw new Error(`add_form expects context="__FORM__", got ${props.context}`);
    }

    const formElement = AddForm(props, this);
    this.append(formElement, props.container);
  }

  add_list(props) {
    if (props.context !== "__LIST__") {
      throw new Error(`add_list expects context="__LIST__", got ${props.context}`);
    }

    const listType = props.type === "ol" ? "ol" : "ul";

    if (!Array.isArray(props.items)) {
      throw new Error("add_list requires \`items\` array");
    }

    const listItems = props.items.map((item, index) => {
      // string item
      if (typeof item === "string") {
        return React.createElement(
          "li",
          { key: index, className: props.itemStyle ?? "" },
          item
        );
      }

      // object item: {text, onclick}
      if (item && typeof item === "object") {
        return React.createElement(
          "li",
          {
            key: index,
            className: props.itemStyle ?? "",
            onClick: (e) => {
              if (typeof item.onclick === "string") this.call_listener(item.onclick, e);
              if (typeof item.onclick === "function") item.onclick(e);
            }
          },
          item.text ?? ""
        );
      }

      return null;
    });

    const element = React.createElement(
      listType,
      { className: props.style ?? "" },
      ...listItems
    );

    this.append(element, props.container);
  }

  add_label(props) {
    let decision = props.context;
    switch (decision) {
      case "__H__": {
        let kind = props.value;
        let header = `h${kind}`;

        if (!(kind >= 1 && kind <= 6)) {
          throw new Error("Heading must be between 1 and 6");
        }
        let element = React.createElement(
          header,
          { className: props.style ?? "" },
          props.content
        );
        this.append(element, props.container);
        break;
      }
      case "__P__": {
        if (props.value !== null) {
          throw new Error("__P__ requires null as value");
        }
        const element = React.createElement(
          "p",
          { className: props.style ?? "" },
          props.content
        );

        this.append(element, props.container);
        break;
      }
    }
  }
}

export { App };