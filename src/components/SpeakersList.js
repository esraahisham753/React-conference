import { data } from "../../SpeakerData";
import Speaker from "./Speaker";

import { useState, useEffect } from "react";

const SpeakersList = ({ showSessions }) => {
  const [speakersData, setSpeakersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  const delay = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(2000);
        setIsLoading(false);
        setSpeakersData(data);
      } catch (e) {
        setIsLoading(false);
        setHasError(true);
        setError(e);
      }
    }

    delayFunc();
  }, []);

  const onToggleFavorite = (id) => {
    const speakersRecPrev = speakersData.find((rec) => {
      return rec.id === id;
    });
    const speakersRecUpdated = {
      ...speakersRecPrev,
      favorite: !speakersRecPrev.favorite,
    };
    const speakersDateNew = speakersData.map((rec) => {
      return rec.id === id ? speakersRecUpdated : rec;
    });
    setSpeakersData(speakersDateNew);
  };

  if (hasError === true) {
    return (
      <div className="text-danger">
        ERROR: <b>Loading Speakers Data failed {error}</b>
      </div>
    );
  }

  if (isLoading === true) {
    return <div>Loading....</div>;
  }

  return (
    <div className="container speakers-list">
      <div className="row">
        {speakersData.map((speaker) => {
          return (
            <Speaker
              key={speaker.id}
              speaker={speaker}
              showSessions={showSessions}
              onToggleFavorite={() => {
                onToggleFavorite(speaker.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SpeakersList;
