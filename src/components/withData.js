const withData = (maxSpeakersToShow) => {
  return function (Component) {
    const speakers = [
      { imgSrc: "speaker-1124", name: "Douglas Crockford" },
      { imgSrc: "speaker-1530", name: "Tamara Baker" },
      { imgSrc: "speaker-10803", name: "Eugene Chuvyrov" },
    ];

    return function () {
      const limitedSpeakers = speakers.slice(0, maxSpeakersToShow);
      return <Component speakers={limitedSpeakers}></Component>;
    };
  };
};

export default withData;
