import React from 'react';
import LoginForm from '../../features/auth/login/LoginForm';
import { useSelector, UseSelector } from 'react-redux';
import { RootState} from '../../redux/store';


// interface HomePageProps {
//    user:User | undefined
// }

const HomePage: React.FC = () => {
  const authState = useSelector((state:RootState) => state.authentication)

  return (
    <div className='page'>
      Home 
      {
        authState.loggedInUser ? <><p>{authState.loggedInUser.email}</p> <button>Account</button>  </>:<LoginForm/>
      }
    </div>
  );
};

export default HomePage;