import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const withAuth = (Component) => {
  return function (props) {
    const { initialLoggedUser, setInitialLoggedUser } = useContext(AuthContext);

    return (
      <Component
        initialLoggedUser={initialLoggedUser}
        setInitialLoggedUser={setInitialLoggedUser}
        {...props}
      ></Component>
    );
  };
};

export default withAuth;
