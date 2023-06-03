import { data } from "../SpeakerData";

const IndexPage = () => {
  const { id, bio, first, last, favorite, twitterHandle, company, sessions } =
    data[0];
  return (
    <div className="container speakers-list">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <div className="card card-height p-4 mt-4">
            <div className="speaker-image d-flex flex-row justify-content-center align-items-center h-300">
              <img
                className="contain-fit"
                src={`images/speaker-${id}.jpg`}
                width="300"
                alt={`${first} ${last}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
