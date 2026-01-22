import React from "https://esm.sh/react@18";

/**
 * Build a button element
 * @param {object} props
 * @param {object} appInstance - App instance (for call_listener)
 * @returns ReactElement
 */
function AddButton(props, appInstance) {
  if (props.context !== "__BUTTON__") {
    throw new Error(
      `AddButton expects context="__BUTTON__", got ${props.context}`
    );
  }

  if (!props.text) {
    throw new Error('AddButton requires "text"');
  }

  const fire = (maybeListener, e) => {
    if (typeof maybeListener === "string" && appInstance) {
      appInstance.call_listener(maybeListener, e);
    } else if (typeof maybeListener === "function") {
      maybeListener(e);
    }
  };

  return React.createElement(
    "button",
    {
      id: props.id ?? undefined,
      type: props.buttonType || "button",
      className: props.style || "",
      disabled: !!props.disabled,
      onClick: (e) => fire(props.onclick, e),
    },
    props.text
  );
}

export { AddButton };
