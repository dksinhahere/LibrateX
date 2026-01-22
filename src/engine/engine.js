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
import { AddInput } from "./AddInput.js";
import { AddButton } from "./AddButton.js";
import { AddList } from "./AddList.js";
import { AddLabel } from "./AddLabel.js";
import { AddAudio } from "./AddAudio.js";

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
      // First element => wrapper div banao
      const wrapper = React.createElement(
        "div",
        { key: groupName, "data-group": groupName },
        _element_
      );
      this.elements.set(groupName, wrapper);
    } else {
      // Existing wrapper ko get karo
      const temp = this.elements.get(groupName);

      // Old children extract karo
      const oldChildren = temp.props?.children ?? [];
      const childrenArr = Array.isArray(oldChildren) ? oldChildren : [oldChildren];

      // New wrapper banao with appended child
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
    const element = AddInput(props, this);
    this.append(element, props.container);
  }

  add_button(props) {
    const element = AddButton(props, this);
    this.append(element, props.container);
  }

  add_media_audio(props){
    const element = AddAudio(props, this);
    this.append(element, props.container)
  }
  
  add_form(props) {
    if (props.context !== "__FORM__") {
      throw new Error(`add_form expects context="__FORM__", got ${props.context}`);
    }

    const formElement = AddForm(props, this);
    this.append(formElement, props.container);
  }

  add_list(props) {
    const element = AddList(props, this);
    this.append(element, props.container);
  }

  add_label(props) {
    const element = AddLabel(props);
    this.append(element, props.container);
  }

}

export { App };