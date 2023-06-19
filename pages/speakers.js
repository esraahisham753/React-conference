import React from "react";

import SpeakersRenderProps from "../src/components/SpeakersRenderProps";

const Speakers = () => {
  return (
    <SpeakersRenderProps>
      {({ speakers }) => {
        return (
          <div>
            {speakers.map(({ imgSrc, name }) => {
              return (
                <img src={`images/${imgSrc}.jpg`} alt={name} key={imgSrc} />
              );
            })}
          </div>
        );
      }}
    </SpeakersRenderProps>
  );
};

export default Speakers;
