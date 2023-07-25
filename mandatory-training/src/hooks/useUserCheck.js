import React, {useEffect, useContext, useState} from 'react'
import AppContext from './../App.js'

/*TL;Dont wanna read the code. It returns an object with two values
validToken: This means that this has ran the fetch request and the user still has a valid token. This is to reduce strain
on the backend. It will only try to get a new token when the token expires
userType: What the userType is, admin, visitor, etc. Defaults to visitor 

To use:
import useUserContext from '../hooks/useUserCheck.js

Within component pull it.
const {validToken, userType} = useUserCheck();*/


//Should we check if we're logged in every time and potentially hammer the hell out of the backend? 
//Or just trust authenticate user actions.

//Im going with auth user actions and set an expiraton before this needs to run again

export const useUserCheck = async () =>
{
  const {user, token, setToken, authExp, setExp} = useContext(AppContext);
  console.log(user);

  //States
  const [userType, setUserType] = useState('visitor');
  const [validToken, setValid] = useState(false);
  //Set this up because grabbing things from storage can be annoying. Make it only happen once when user goes to the page.
  //Else they just need to login. This may exist better in App.js as part of context
  const [initial, setInitial] = useState('false');
  //Session storage token
  const sessionToken = sessionStorage.getItem("token");
  //useEffect to make this run if things change
  useEffect(()=>
  {
    const UserCheck = async () => {
      //Logic for pulling a token from local/session storage
      let authToken;
      if(initial)
      {
        if(sessionToken != null)
        {
          authToken = sessionToken;
        }
        else
        {
          setValid(false)
          setUserType('visitor');
          return;
        }
      }
      else
      {
        console.log("test");
      }


      const header = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`}};

      //Maybe don't go to the login login... API
      let response = await fetch(`http://localhost:3001/login`, header)
      let status = response.status;
      let data = await response.json();

      if(status === 201)
      {
        setUserType(data.userType);
        setToken(data.token)
      }
      
    }

    if(authExp < Date.Now())
    {
      return;
    }
    else
    {
      UserCheck();
    }
    
  },[token])//Should be based off of user data changing. Likely a userContext of some kind.
  return {validToken, userType};
}

export default useUserCheck