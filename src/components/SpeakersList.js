import Speaker from "./Speaker";
import ReactPlaceHolder from "react-placeholder";
import { data } from "../../SpeakerData";
import useRequestDelay, { REQUEST_STATUS } from "../hooks/useRequestDelay";
import { useContext } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";

const SpeakersList = () => {
  const {
    requestStatus,
    error,
    updateRecord,
    data: speakersData,
  } = useRequestDelay(2000, data);

  const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

  if (requestStatus === REQUEST_STATUS.FAILURE) {
    return (
      <div className="text-danger">
        ERROR: Loading Speakers Data failed {error}
      </div>
    );
  }

  /*if (isLoading === true) {
    return <div>Loading....</div>;
  }*/

  return (
    <div className="container speakers-list">
      <ReactPlaceHolder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      >
        <div className="row">
          {speakersData
            .filter((speaker) => {
              return (
                speaker.first.toLowerCase().includes(searchQuery) ||
                speaker.last.toLowerCase().includes(searchQuery)
              );
            })
            .filter((speaker) => {
              return speaker.sessions.find((session) => {
                return session.eventYear === eventYear;
              });
            })
            .map((speaker) => {
              return (
                <Speaker
                  key={speaker.id}
                  speaker={speaker}
                  updateRecord={updateRecord}
                />
              );
            })}
        </div>
      </ReactPlaceHolder>
    </div>
  );
};

export default SpeakersList;
