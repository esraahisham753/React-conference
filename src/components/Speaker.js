import { useState, useContext, memo } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import { SpeakerContext, SpeakerProvider } from "../contexts/SpeakerContext";
import SpeakerDelete from "./SpeakerDelete";
import ErrorBoundary from "./ErrorBoundary";

const Session = ({ title, room }) => {
  return (
    <span className="session w-100">
      {title} <strong>{room.name}</strong>
    </span>
  );
};

const SessionsList = () => {
  const { eventYear } = useContext(SpeakerFilterContext);
  const { speaker } = useContext(SpeakerContext);

  return (
    <div className="sessionBox card h-250">
      {speaker.sessions
        .filter((session) => {
          return session.eventYear === eventYear;
        })
        .map((session) => {
          return (
            <div className="session w-100" key={session.id}>
              <Session {...session} />
            </div>
          );
        })}
    </div>
  );
};

const ImageWithFallback = ({ src, ...props }) => {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  const onError = () => {
    if (!error) {
      setImgSrc("/images/speaker-99999.jpg");
      setError(true);
    }
  };
  return <img src={imgSrc} {...props} onError={onError} />;
};

const SpeakerImage = () => {
  const {
    speaker: { id, first, last },
  } = useContext(SpeakerContext);
  return (
    <div className="speaker-image d-flex flex-row justify-content-center align-items-center h-300">
      <ImageWithFallback
        className="contain-fit"
        src={`images/speaker-${id}.jpg`}
        width="300"
        alt={`${first} ${last}`}
      />
    </div>
  );
};

const SpeakerFavorite = () => {
  const [inTransition, setInTransition] = useState(false);
  const { speaker, updateRecord } = useContext(SpeakerContext);

  const doneCallback = () => {
    setInTransition(false);
    /*console.log(
      `In SpeakerFavorite.doneCallback function ${new Date().getMilliseconds()}`
    );*/
  };

  return (
    <div className="action padB1">
      <span
        onClick={() => {
          setInTransition(true);
          const fav = speaker.favorite ? "true" : "false";
          console.log(`The old fav = ${fav}`);
          updateRecord(
            {
              ...speaker,
              favorite: !speaker.favorite,
            },
            doneCallback
          );
        }}
      >
        <i
          className={
            speaker.favorite === true
              ? "fa fa-star orange"
              : "fa fa-star-o orange"
          }
        />{" "}
        Favorite{" "}
        {inTransition ? (
          <span className="fas fa-circle-notch fa-spin"></span>
        ) : null}
      </span>
    </div>
  );
};

const SpeakerDemographic = () => {
  const { speaker } = useContext(SpeakerContext);
  const { first, last, bio, company, twitterHandle } = speaker;

  return (
    <div className="speaker-info">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="text-truncate w-200">
          {first} {last}
        </h3>
      </div>
      <SpeakerFavorite />
      <div>
        <p className="card-description">{bio.substr(0, 70)}</p>
        <div className="social d-flex flex-row mt-4 mb-2">
          <div className="company">
            <h5>Company</h5>
            <h6>{company ? company : "Not assigned"}</h6>
          </div>
          <div className="twitter">
            <h5>Twitter</h5>
            <h6>{twitterHandle ? twitterHandle : "Not assigned"}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpeakerMethod = ({
  speaker,
  updateRecord,
  insertRecord,
  deleteRecord,
  showErrorCard,
}) => {
  const { showSessions } = useContext(SpeakerFilterContext);
  //console.log(`Speaker: ${speaker.id} ${speaker.first} ${speaker.last}`);
  if (showErrorCard) {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
        <div className="card card-height p-4 mt-4">
          <img src="/images/speaker-99999.jpg" />
          <div>
            <b>Error showing speaker</b>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SpeakerProvider
      speaker={speaker}
      updateRecord={updateRecord}
      insertRecord={insertRecord}
      deleteRecord={deleteRecord}
    >
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
        <div className="card card-height p-4 mt-4">
          <SpeakerImage />
          <SpeakerDemographic />
          {showSessions == true ? <SessionsList /> : null}
        </div>
        <SpeakerDelete />
      </div>
    </SpeakerProvider>
  );
};

const areEqualSpeakers = (prevProps, nextProps) => {
  return prevProps.speaker.favorite === nextProps.speaker.favorite;
};

const SpeakerWithoutErrorBoundary = memo(SpeakerMethod, areEqualSpeakers);

const Speaker = (props) => {
  return (
    <ErrorBoundary
      errorUI={<SpeakerWithoutErrorBoundary props={...props} showErrorCard={true}/>}
    >
      <SpeakerWithoutErrorBoundary {...props}></SpeakerWithoutErrorBoundary>
    </ErrorBoundary>
  );
};

export default Speaker;
