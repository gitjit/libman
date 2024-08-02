import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginPage/LoginForm";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../../redux/store";

// interface HomePageProps {
//    user:User | undefined
// }

const HomePage: React.FC = () => {
  const authState = useSelector((state: RootState) => state.authentication);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate("/account");
  };

  return (
    <div className="page">
      Home
      {authState.loggedInUser ? (
        <>
          <p>{authState.loggedInUser.email}</p>{" "}
          <button onClick={handleAccountClick}>Account</button>{" "}
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default HomePage;
