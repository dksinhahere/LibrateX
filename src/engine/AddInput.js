import React from "https://esm.sh/react@18";

/**
 * Build an input UI element (input/textarea/select + optional label wrapper)
 * @param {object} props
 * @param {object} appInstance - instance of App (needed for call_listener)
 * @returns ReactElement
 */
function AddInput(props, appInstance) {
  if (props.context !== "__INPUT__") {
    throw new Error(`AddInput expects context="__INPUT__", got ${props.context}`);
  }
  if (!props.id) {
    throw new Error('AddInput requires unique "id"');
  }

  // Create the input element based on type
  let inputElement;
  
  if (props.type === "textarea") {
    inputElement = React.createElement("textarea", {
      id: props.id,
      name: props.id,
      placeholder: props.placeholder || "",
      className: props.style || "",
      required: props.required || false,
      onChange: (e) => {
        if (typeof props.onchange === "string" && appInstance) {
          appInstance.call_listener(props.onchange, e);
        }
        if (typeof props.onchange === "function") {
          props.onchange(e);
        }
      }
    });
  } else if (props.type === "select" && props.options) {
    inputElement = React.createElement(
      "select",
      {
        id: props.id,
        name: props.id,
        className: props.style || "",
        required: props.required || false,
        onChange: (e) => {
          if (typeof props.onchange === "string" && appInstance) {
            appInstance.call_listener(props.onchange, e);
          }
          if (typeof props.onchange === "function") {
            props.onchange(e);
          }
        }
      },
      ...props.options.map((opt, idx) =>
        React.createElement("option", { key: idx, value: opt.value }, opt.text)
      )
    );
  } else {
    // Regular input (text, password, email, url, date, etc.)
    inputElement = React.createElement("input", {
      id: props.id,
      type: props.type || "text",
      name: props.id,
      placeholder: props.placeholder || "",
      className: props.style || "",
      required: props.required || false,
      onChange: (e) => {
        if (typeof props.onchange === "string" && appInstance) {
          appInstance.call_listener(props.onchange, e);
        }
        if (typeof props.onchange === "function") {
          props.onchange(e);
        }
      }
    });
  }

  // If no label, return just the input element
  if (!props.label) {
    return inputElement;
  }

  // For all other inputs: label first, then input
  return React.createElement(
    "div",
    { className: props.wrapperStyle || "mb-4" },
    React.createElement(
      "label",
      { htmlFor: props.id, className: props.labelStyle || "block mb-2 font-medium" },
      props.label
    ),
    inputElement
  );
}

export { AddInput };