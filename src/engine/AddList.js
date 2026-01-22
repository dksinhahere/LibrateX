import React from "https://esm.sh/react@18";

/**
 * Build a list element (ul/ol)
 * @param {object} props
 * @param {object} appInstance - App instance for call_listener
 * @returns ReactElement
 */
function AddList(props, appInstance) {
  if (props.context !== "__LIST__") {
    throw new Error(`AddList expects context="__LIST__", got ${props.context}`);
  }

  const listType = props.type === "ol" ? "ol" : "ul";

  if (!Array.isArray(props.items)) {
    throw new Error('AddList requires "items" array');
  }

  const fire = (maybeListener, e) => {
    if (typeof maybeListener === "string" && appInstance) {
      appInstance.call_listener(maybeListener, e);
    } else if (typeof maybeListener === "function") {
      maybeListener(e);
    }
  };

  const listItems = props.items.map((item, index) => {
    // string item
    if (typeof item === "string") {
      return React.createElement(
        "li",
        { key: index, className: props.itemStyle || "" },
        item
      );
    }

    // object item: { text, onclick }
    if (item && typeof item === "object") {
      return React.createElement(
        "li",
        {
          key: index,
          className: props.itemStyle || "",
          onClick: (e) => fire(item.onclick, e),
        },
        item.text ?? ""
      );
    }

    return null;
  });

  return React.createElement(
    listType,
    { className: props.style || "" },
    ...listItems
  );
}

export { AddList };
