import React, { MouseEventHandler, useRef } from 'react';
import "./LoginForm.css"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { loginUser } from '../../../redux/authSlice';



const LoginForm: React.FC = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

    const auth = useSelector((state:RootState) => state.authentication);
    const dispatch:AppDispatch = useDispatch();

    const handleLoginUser:MouseEventHandler<HTMLButtonElement> = async(e) => {
        e.preventDefault();
        console.log('handle login user');
        if(emailRef.current && passwordRef.current){
          try {
            dispatch(loginUser({
              email:emailRef.current.value,
              password:passwordRef.current.value 
            }))
          } catch (error:any) {
            console.log("There was an error logging in :", error);
          }
        }
        else {
          console.log('Refs are null');
        }
    }


    return (
        <form className="login-form">
          <h2>Please Login</h2>
          {auth.error ? <p className="login-form-error">Username or password incorrect</p> : <></>}
          <div className="login-form-input-group">
            <h6>Email</h6>
            <input className="login-form-input" placeholder='email' name='email' required ref={emailRef} />
          </div>
          <div className="login-form-input-group">
            <h6>Password</h6>
            <input className="login-form-input" placeholder='password' name='password' type='password' required ref={passwordRef} />
          </div>
          <button className="login-form-submit" onClick={handleLoginUser}>Login</button>
          <p>
            Don't have an account?
            <span className="login-form-register">Create one here.</span>
          </p>
        </form>
      );
      
};

export default LoginForm;