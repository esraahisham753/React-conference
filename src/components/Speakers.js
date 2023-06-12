import SpeakersList from "./SpeakersList";
import SpeakersToolbar from "./SpeakersToolbar";
import { SpeakerFilterProvider } from "../contexts/SpeakerFilterContext";

const Speakers = () => {
  return (
    <SpeakerFilterProvider
      startingShowSessions={false}
      startingEventYear={"2008"}
    >
      <SpeakersToolbar />
      <SpeakersList />
    </SpeakerFilterProvider>
  );
};

export default Speakers;
