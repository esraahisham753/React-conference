import React from "react";

const SpeakersRenderProps = (props) => {
  const speakers = [
    { imgSrc: "speaker-1124", name: "Douglas Crockford" },
    { imgSrc: "speaker-1530", name: "Tamara Baker" },
    { imgSrc: "speaker-10803", name: "Eugene Chuvyrov" },
  ];
  return props.children({
    speakers: speakers,
  });
};

export default SpeakersRenderProps;
