const Session = ({ title, room }) => {
  return (
    <span className="session w-100">
      {title} <strong>{room.name}</strong>
    </span>
  );
};

const SessionsList = ({ sessions }) => {
  return (
    <div className="sessionBox card h-250">
      {sessions.map((session) => {
        return <Session key={session.id} {...session} />;
      })}
    </div>
  );
};

const SpeakerImage = ({ id, first, last }) => {
  return (
    <div className="speaker-image d-flex flex-row justify-content-center align-items-center h-300">
      <img
        className="contain-fit"
        src={`images/speaker-${id}.jpg`}
        width="300"
        alt={`${first} ${last}`}
      />
    </div>
  );
};

const SpeakerDemographic = ({
  first,
  last,
  bio,
  company,
  twitterHandle,
  favorite,
}) => {
  return (
    <div className="speaker-info">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="text-truncate w-200">
          {first} {last}
        </h3>
      </div>
      <div>
        <p className="card-description">{bio}</p>
        <div className="social d-flex flex-row mt-4 mb-2">
          <div className="company">
            <h5>Company</h5>
            <h6>{company}</h6>
          </div>
          <div className="twitter">
            <h5>Twitter</h5>
            <h6>{twitterHandle}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

const Speaker = ({ speaker }) => {
  const id = speaker.id;
  const first = speaker.first;
  const last = speaker.last;
  const sessions = speaker.sessions;

  return (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
      <div className="card card-height p-4 mt-4">
        <SpeakerImage id={id} first={first} last={last} />
        <SpeakerDemographic {...speaker} />
        <SessionsList sessions={sessions} />
      </div>
    </div>
  );
};

const SpeakersList = ({ speakers }) => {
  return (
    <div className="row">
      {speakers.map((speaker) => {
        return <Speaker key={speaker.id} speaker={speaker} />;
      })}
    </div>
  );
};

export default SpeakersList;
