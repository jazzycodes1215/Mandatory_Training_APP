import { useState, useEffect, createContext} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import {
  Header, Help, Login, Account, RequiredTraining, SubordinateTraining, UTM,
  Training, CreateTraining, Admin, UserAccount, CreateUserAccount, TrainingDisplay, ChangePassword
} from './components';
import TrainingDisplayUTM from './components/TrainingDisplay UTM-ADMIN';
import UtmPersonellTrainingDetails from './components/UtmPersonellTrainingDetails';
import LoadingScreen from './components/LoadingScreen';
export const AppContext = createContext();
export const fetchURL = process.env.REACT_APP_FETCH ? process.env.REACT_APP_FETCH : 'http://localhost:4000';

const App = ()=> {

    const [user,setUser]=useState(1);
    const [token, setToken] = useState(null);
    const [authExp, setExp] = useState(0);
    const [userType, setUserType] = useState(0)
    const [isVerified, setIsVerified] = useState(false)
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [isSupervisor, setIsSupervisor] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const ContextObject = { user, setUser,
                            isVerified,  setIsVerified,
                            firstName, setFirstName,
                            lastName, setLastName,
                            isSupervisor, setIsSupervisor,
                            registered, setRegistered,
                            token, setToken,
                            authExp, setExp,
                            userType, setUserType,
                            testStr: `I'm using context!`
                          }

    //console.log(ContextObject);
    useEffect(() => {
        // Simulate a loading delay for demonstration purposes
        setTimeout(() => {
            setIsLoading(false);
        }, 0); // Set the time as per your requirement
    }, []);

    return(
        <>
        {isLoading ? (
        <LoadingScreen />
      ) : (
        <AppWrapper id="App">
            <AppContext.Provider value={ContextObject}>
                <BrowserRouter>
                    <HeaderContainer><Header /></HeaderContainer>
                    <BodyContainer>
                        <Routes>
                            <Route path='/' element={<Help />} />
                            <Route path='/login/*' element={<Login />} />
                            <Route path='/account/*' element={<Account />} />
                            <Route path='/required-training/' element={<RequiredTraining />} />
                            <Route path='/subordinate-training/:id' element={<SubordinateTraining />} />
                            <Route path='/required-training/:training/*' element={<TrainingDisplay />} />
                            <Route path='/training/*' element={<Training />} />
                            <Route path='/create-training/*' element={<CreateTraining />} />
                            <Route path="/unit-training-manager/:userId/:trainingId" element={<UtmPersonellTrainingDetails  />} />
                            <Route path='/unit-training-manager/*' element={<UTM />} />
                            <Route path='/administrator/*' element={<Admin />} />
                            <Route path='/accounts/:user/*' element={<UserAccount />} />
                            <Route path='/training-UTM/:training/*' element={<TrainingDisplayUTM />} />
                            <Route path='/create-account/*' element={<CreateUserAccount />} />
                            <Route path='/change-password/*' element={<ChangePassword />} />
                            <Route path='/*' element={<Help />} /> catch all

                        </Routes>
                    </BodyContainer>
                </BrowserRouter>
            </AppContext.Provider>
        </AppWrapper>
        )}
        </>
    );
}
export default App

const AppWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow-y: hidden;
  display: grid;
  grid-template-rows: minmax(10%, auto) minmax(90%, auto);
  background-color: White;
`;

const HeaderContainer = styled.div`
position: sticky;
top: 0;
z-index: 100;
background-color: #ffffff;
`
const BodyContainer = styled.div` // Adjust this to match your header height
overflow-y: auto;
`