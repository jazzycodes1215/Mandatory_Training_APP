import React, {useEffect, useContext, useState} from 'react'
import AppContext from './../App.js'

/*TL;Dont wanna read the code. It returns an object with two values
validToken: This means that this has ran the fetch request and the user still has a valid token. This is to reduce strain
on the backend.
userType: What the userType is, admin */


//Should we check if we're logged in every time and potentially hammer the hell out of the backend? 
//Or just trust authenticate user actions.

//Im going with auth user actions and set an expiraton before this needs to run again

export const useUserCheck = async () =>
{
  //Pulling only user for now for the context. Probably changing
  const {user} = useContext(AppContext);
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

    const UserCheck = async () =>
    {
      //Logic for pulling a token from local/session storage
      if(sessionToken)

      //Header for login
      const header = {method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${useToken}`
      }};

      let response = await fetch(`SomekindofURLHere`, header)
      let status = response.status;
      let data = await response.json();

      //Set userType within here after checking its valid, backend maybe should return userType
      setUserType(data.userType);
    }

    if(authExp < Date.Now())
    {

    }
    UserCheck();
  },[user])//Should be based off of user data changing. Likely a userContext of some kind.
  return {validToken, userType};
}

export default useUserCheck