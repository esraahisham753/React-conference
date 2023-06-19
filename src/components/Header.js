import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import withAuth from "./withAuth";

const Header = ({ initialLoggedUser, setInitialLoggedUser }) => {
  console.log("username: ", initialLoggedUser);
  const LoggedInUser = ({ initialLoggedUser, setInitialLoggedUser }) => {
    return (
      <div>
        <span>Logged in as {initialLoggedUser}</span>
        <button
          onClick={() => {
            setInitialLoggedUser("");
          }}
          className="btn btn-secondary"
        >
          Log Out
        </button>
      </div>
    );
  };

  const NotLoggedInUser = ({ initialLoggedUser, setInitialLoggedUser }) => {
    return (
      <button
        className="btn btn-secondary"
        onClick={(e) => {
          e.preventDefault();
          const username = window.prompt("Please, Enter your username");
          setInitialLoggedUser(username);
        }}
      >
        Login
      </button>
    );
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div className="padT4 padB4">
      <div className="container mobile-container">
        <div className="d-flex justify-content-between">
          <div>
            <img alt="SVCC Home Page" src="/images/SVCClogo.png" />
          </div>
          <div className="light">
            <h4
              className="header-title"
              style={{ color: theme == "dark" ? "white" : "black" }}
            >
              Silicon Valley Code Camp
            </h4>
          </div>
          <div className={theme == "light" ? "" : "text-info"}>
            {initialLoggedUser && initialLoggedUser.length > 0 ? (
              <LoggedInUser
                initialLoggedUser={initialLoggedUser}
                setInitialLoggedUser={setInitialLoggedUser}
              />
            ) : (
              <NotLoggedInUser
                initialLoggedUser={initialLoggedUser}
                setInitialLoggedUser={setInitialLoggedUser}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Header);
