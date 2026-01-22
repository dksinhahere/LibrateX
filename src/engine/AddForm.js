// librateX/engine/AddForm.js

import React from "https://esm.sh/react@18";

function AddForm(props, appInstance) {
  if (props.context !== "__FORM__") {
    throw new Error("Require __FORM__ to create form element on web page");
  }

  if (!props.id) {
    throw new Error("add_form requires unique `id`");
  }

  if (!Array.isArray(props.children) || props.children.length === 0) {
    throw new Error("add_form requires `children` array with at least one input");
  }

  // Render form children recursively
  const formChildren = props.children.map((child, index) => {
    switch (child.context) {
      case "__INPUT__": {
        const inputElement = React.createElement(
          "div",
          { key: `input-wrapper-${index}`, className: "mb-4" },
          // Label if provided
          child.label && React.createElement(
            "label",
            { 
              htmlFor: child.id, 
              className: "block mb-2 font-medium" 
            },
            child.label
          ),
          // Input element
          React.createElement("input", {
            id: child.id,
            name: child.id,
            type: child.type || "text",
            placeholder: child.placeholder || "",
            className: child.style || "border rounded px-3 py-2 w-full",
            onChange: (e) => {
              if (typeof child.onchange === "string" && appInstance) {
                appInstance.call_listener(child.onchange, e);
              }
            }
          })
        );
        return inputElement;
      }

      case "__P__": {
        return React.createElement(
          "p",
          { key: `p-${index}`, className: child.style || "" },
          child.content
        );
      }

      case "__H__": {
        const heading = `h${child.value}`;
        return React.createElement(
          heading,
          { key: `h-${index}`, className: child.style || "" },
          child.content
        );
      }

      default:
        console.warn(`Unknown child context: ${child.context}`);
        return null;
    }
  });

  // Add submit button if provided
  if (props.button) {
    formChildren.push(
      React.createElement(
        "button",
        {
          key: "submit-button",
          type: "submit",
          className: props.buttonStyle || ""
        },
        props.button
      )
    );
  }

  // Create the form element
  const formElement = React.createElement(
    "form",
    {
      id: props.id,
      className: props.style || "",
      onSubmit: (e) => {
        e.preventDefault();
        if (typeof props.onsubmit === "string" && appInstance) {
          appInstance.call_listener(props.onsubmit, e);
        }
        if (typeof props.onsubmit === "function") {
          props.onsubmit(e);
        }
      }
    },
    ...formChildren
  );

  return formElement;
}

export { AddForm };