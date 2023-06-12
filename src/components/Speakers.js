import SpeakersList from "./SpeakersList";
import SpeakersToolbar from "./SpeakersToolbar";

import { useState } from "react";

const Speakers = () => {
  const [showSessions, setShowSessions] = useState(true);
  return (
    <>
      <SpeakersToolbar
        showSessions={showSessions}
        setShowSessions={setShowSessions}
      />
      <SpeakersList showSessions={showSessions} />
    </>
  );
};

export default Speakers;
