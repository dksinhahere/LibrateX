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
    const { context, onchange, ...otherProps } = child;
    
    let inputElement;

    // Create textarea element
    if (child.type === "textarea") {
      inputElement = React.createElement("textarea", {
        key: child.id || index,
        id: child.id,
        name: child.id,
        placeholder: child.placeholder || "",
        className: child.style || "",
        required: child.required || false,
        rows: child.rows || 4,
        cols: child.cols,
        onChange: (e) => {
          if (typeof onchange === "string" && appInstance) {
            appInstance.call_listener(onchange, e);
          }
          if (typeof onchange === "function") {
            onchange(e);
          }
        }
      });
    }
    // Create select element
    else if (child.type === "select" && Array.isArray(child.options)) {
      inputElement = React.createElement(
        "select",
        {
          key: child.id || index,
          id: child.id,
          name: child.id,
          className: child.style || "",
          required: child.required || false,
          onChange: (e) => {
            if (typeof onchange === "string" && appInstance) {
              appInstance.call_listener(onchange, e);
            }
            if (typeof onchange === "function") {
              onchange(e);
            }
          }
        },
        // Add placeholder option if specified
        child.placeholder && React.createElement("option", {
          value: "",
          disabled: true,
          selected: true
        }, child.placeholder),
        // Map through options
        ...child.options.map((opt, idx) =>
          React.createElement("option", {
            key: idx,
            value: opt.value || opt
          }, opt.text || opt)
        )
      );
    }
    // Create regular input element
    else {
      inputElement = React.createElement("input", {
        key: child.id || index,
        id: child.id,
        type: child.type || "text",
        placeholder: child.placeholder || "",
        name: child.id,
        className: child.style || "",
        required: child.required || false,
        onChange: (e) => {
          if (typeof onchange === "string" && appInstance) {
            appInstance.call_listener(onchange, e);
          }
          if (typeof onchange === "function") {
            onchange(e);
          }
        }
      });
    }

    // Wrap with label if provided
    if (child.label) {
      return React.createElement(
        "div",
        {
          key: `wrapper-${child.id || index}`,
          className: child.wrapperStyle || "mb-4"
        },
        React.createElement(
          "label",
          {
            htmlFor: child.id,
            className: child.labelStyle || "block mb-2 font-medium"
          },
          child.label
        ),
        inputElement
      );
    }

    return inputElement;
  });

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
    ...formChildren,
    // Add submit button if specified
    props.button && React.createElement("button", {
      type: "submit",
      className: props.buttonStyle || "mt-4 px-6 py-2 bg-blue-600 text-white rounded"
    }, props.button)
  );

  return formElement;
}

export { AddForm };