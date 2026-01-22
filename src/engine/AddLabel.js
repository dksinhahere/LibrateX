import React from "https://esm.sh/react@18";

/**
 * Build heading/paragraph element
 * Supported:
 *  - __H__ : value 1..6
 *  - __P__ : value must be null
 *
 * @param {object} props
 * @returns ReactElement
 */
function AddLabel(props) {
  const decision = props.context;

  switch (decision) {
    case "__H__": {
      const kind = props.value;

      if (!(kind >= 1 && kind <= 6)) {
        throw new Error("Heading must be between 1 and 6");
      }

      const header = `h${kind}`;
      return React.createElement(
        header,
        { className: props.style || "" },
        props.content
      );
    }

    case "__P__": {
      if (props.value !== null) {
        throw new Error("__P__ requires null as value");
      }

      return React.createElement(
        "p",
        { className: props.style || "" },
        props.content
      );
    }

    default:
      throw new Error(`AddLabel unknown context: ${decision}`);
  }
}

export { AddLabel };
