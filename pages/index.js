import { data } from "../SpeakerData";

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
        <p>
          {bio} {company} {twitterHandle} {favorite}
        </p>
      </div>
    </div>
  );
};

const Speaker = ({speaker}) => {
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

const IndexPage = () => {
  return (
    <div className="container speakers-list">
      <div className="row">
        {data.map((speaker) => {
          return (
            <Speaker key={speaker.id} speaker={speaker}/>
          );
        })}
      </div>
    </div>
  );
};

export default IndexPage;
