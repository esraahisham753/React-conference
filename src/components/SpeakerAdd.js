import withAuth from "./withAuth";

const SpeakerAdd = ({ eventYear, insertRecord, initialLoggedUser }) => {
  if (!initialLoggedUser || initialLoggedUser.length === 0) {
    return null;
  }

  return (
    <a href="#" className="addSes">
      <i
        onClick={(e) => {
          e.preventDefault();
          //console.log("in click event");
          const firstLast = window.prompt("Enter first and last name:");
          const firstLastArray = firstLast.split(" ");
          insertRecord({
            id: "99999",
            first: firstLastArray[0],
            last: firstLastArray[1],
            bio: "bio not entered yet",
            sessions: [
              {
                id: "88888",
                title: `New Session for ${firstLastArray[0]}`,
                room: {
                  name: "Main Ball room",
                },
                eventYear,
              },
            ],
          });
        }}
      >
        +
      </i>
    </a>
  );
};

export default withAuth(SpeakerAdd);
