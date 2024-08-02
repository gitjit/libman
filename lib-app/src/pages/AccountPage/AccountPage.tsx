import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import "./AccountPage.css";
import { getAccountDetails } from "../../redux/authSlice";

// interface HomePageProps {
//    user:User | undefined
// }

const AccountPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.authentication);
  useEffect(() => {
    console.log(authState.token);
    if (authState.token) {
      dispatch(getAccountDetails(authState.token));
    }
  }, [dispatch, authState.token]);

  return (
    <div className="page">
      Account Page
      {authState.userInfo && (
        <>
          <p>{authState.userInfo.email}</p>
          <p>{authState.userInfo.firstName}</p>
          <p>{authState.userInfo.lastName}</p>
        </>
      )}
    </div>
  );
};

export default AccountPage;
