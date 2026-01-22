import React, { useEffect, useState } from "https://esm.sh/react@18";

function AddAlert(props) {
  if (props.context !== "__ALERT__") {
    throw new Error(`AddAlert expects context="__ALERT__", got ${props.context}`);
  }

  const {
    style,
    type,
    title,
    message,
    dismissible = true,
    onClose,
    duration = 5000,
    position = "top-right",
    animate = true,
    appInstance, // ✅ now comes from props
  } = props;

  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const handleClose = () => {
    setVisible(false);

    setTimeout(() => {
      if (typeof onClose === "string" && appInstance) {
        appInstance.call_listener(onClose, {});
      } else if (typeof onClose === "function") {
        onClose({});
      }
    }, 300);
  };

  useEffect(() => {
    if (!(duration && duration > 0)) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const step = 100 / (duration / 100);
        const next = prev - step;

        if (next <= 0) {
          clearInterval(interval);
          handleClose();
          return 0;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  if (!visible) return null;

  const alertStyles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
  };

  const progressColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  const positions = {
    "top-right": "fixed top-4 right-4 z-50",
    "top-left": "fixed top-4 left-4 z-50",
    "bottom-right": "fixed bottom-4 right-4 z-50",
    "bottom-left": "fixed bottom-4 left-4 z-50",
    "top-center": "fixed top-4 left-1/2 -translate-x-1/2 z-50",

    // ✅ NEW: exact screen center
    "center": "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
    };

  const baseStyle = alertStyles[type] || alertStyles.info;
  const positionStyle = positions[position] || positions["top-right"];
  const animationClass = animate ? "transition-all duration-300 ease-in-out" : "";
  const visibilityClass = "opacity-100 translate-y-0";

  // ✅ added "relative" so progress bar anchors properly
  const combinedStyle =
    `relative ${baseStyle} ${positionStyle} ${animationClass} ${visibilityClass} ` +
    `border px-4 py-3 rounded-lg shadow-lg min-w-80 max-w-md ${style || ""}`;

  return React.createElement(
    "div",
    { className: combinedStyle, role: "alert" },
    React.createElement(
      "div",
      { className: "flex items-start" },
      React.createElement(
        "div",
        { className: "flex-1" },
        title && React.createElement("strong", { className: "font-bold block mb-1" }, title),
        React.createElement("span", { className: "block text-sm" }, message || props.content || "")
      ),
      dismissible &&
        React.createElement(
          "button",
          {
            className:
              "flex-shrink-0 ml-4 inline-flex text-gray-400 hover:text-gray-900 focus:outline-none",
            onClick: handleClose,
          },
          "✕"
        )
    ),
    duration > 0 &&
      React.createElement(
        "div",
        { className: "absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden" },
        React.createElement("div", {
          className: `h-full ${progressColors[type] || progressColors.info}`,
          style: { width: `${progress}%` },
        })
      )
  );
}

export { AddAlert };
