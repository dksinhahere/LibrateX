import React from "https://esm.sh/react@18";

function AddAudio(props, appInstance) {
  if (props.context !== "__AUDIO__") {
    throw new Error("audio element needs context='__AUDIO__'");
  }

  const audioProps = {
    controls: !!props.controls,
    autoPlay: !!props.autoplay,
    loop: !!props.loop,
    muted: !!props.muted,
    className: props.style
  };

  return React.createElement(
    "audio",
    audioProps,
    React.createElement("source", {
      src: props.source,                 // must be URL path, not C:\...
      type: props.type || "audio/mpeg",  // ✅ mp3 mime
    }),
    props.message || "Audio not supported."
  );
}

export { AddAudio };
