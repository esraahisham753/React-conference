import { data } from "../SpeakerData";
import SpeakersList from "../src/components/speakerslist";

const IndexPage = () => {
  return (
    <div className="container speakers-list">
      <SpeakersList speakers={data} />
    </div>
  );
};

export default IndexPage;
