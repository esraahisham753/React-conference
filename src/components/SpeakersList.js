import Speaker from "./Speaker";
import ReactPlaceHolder from "react-placeholder";
import { data } from "../../SpeakerData";
import useRequestDelay, { REQUEST_STATUS } from "../hooks/useSpeakersRequest";

const SpeakersList = ({ showSessions }) => {
  const {
    requestStatus,
    error,
    updateRecord,
    data: speakersData,
  } = useRequestDelay(2000, data);

  if (requestStatus === REQUEST_STATUS.FAILURE) {
    return (
      <div className="text-danger">
        ERROR: <b>Loading Speakers Data failed {error}</b>
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
          {speakersData.map((speaker) => {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                showSessions={showSessions}
                onToggleFavorite={() => {
                  updateRecord({ ...speaker, favorite: !speaker.favorite });
                }}
              />
            );
          })}
        </div>
      </ReactPlaceHolder>
    </div>
  );
};

export default SpeakersList;
