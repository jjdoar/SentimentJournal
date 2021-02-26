import React, {useState, useEffect, useContext} from 'react';
import {authMethods} from '../firebase/authmethod'

export const firebaseAuth = React.createContext()

export function useAuth() {
  return useContext(firebaseAuth);
}

const AuthProvider = (props) => {
  const initState = {email: '', password: ''}
  const [inputs, setInputs] = useState(initState)
  const [errors, setErrors] = useState([])
  const [token, setToken] = useState(null)
  const [uid, setUID] = useState("")

  const handleSignup = () => {

    // middle man between firebase and signup 
    console.log('handleSignup')
    // calling signup from firebase server
    authMethods.signup(inputs.email, inputs.password, setErrors, setToken, setUID)
    console.log(errors, token, uid)
  }
  const handleSignin = () => {
    //changed to handleSingin
    console.log('handleSignin!!!!')
    // made signup signin
    authMethods.signin(inputs.email, inputs.password, setErrors, setToken, setUID)
    console.log(errors, token, uid)
  }

  const handleSignout = () => {
    authMethods.signout(setErrors, setToken)
  }

  return (
    <firebaseAuth.Provider
    value={{
      //replaced test with handleSignup
      handleSignup,
      handleSignin,
      token,
      inputs,
      uid,
      setInputs,
      errors,
      handleSignout,
    }}>
      {props.children}
    </firebaseAuth.Provider>
  );
};

export default AuthProvider;
