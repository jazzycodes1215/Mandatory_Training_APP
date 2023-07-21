import { useState, useEffect, createContext} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Help, Login, Account, Registration, Info, UTM, Training, CreateTraining, Admin, UserAccon } from './components';

export const AppContext = createContext();


const App = ()=> {

    const [user,setUser]=useState(1);
    const [isVerified, setIsVerified] = useState(false)
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const ContextObject = { user, setUser,
                            isVerified,  setIsVerified,  
                            firstName, setFirstName,
                            lastName, setLastName,
                            testStr: `I'm using context!`
                          }
    
    console.log(ContextObject);
    
    return(
        <>
        <AppWrapper id="App">
            <AppContext.Provider value={ContextObject}>
                <BrowserRouter>
                    <HeaderContainer><Header /></HeaderContainer>
                    <BodyContainer>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/inventory' element={<Inventory />} />
                            <Route path='/sign-in/*' element={<SignIn />} />
                            <Route path='/sign-up/*' element={<SignUp />} />
                            <Route path='/inventory/:item/*' element={<Item />} />
                            <Route path='/*' element={<Home />} /> catch all
                        </Routes>
                    </BodyContainer>
                </BrowserRouter>
            </AppContext.Provider>
        </AppWrapper>
        </>
    );
}
export default App

const AppWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow-y: hidden;
  display: grid;
  grid-template-rows: 10% 90%;
  background-color: #ffffff;
`;

const HeaderContainer = styled.div`
grid-row: 1 / 2;
`
const BodyContainer = styled.div`
grid-row: 2 / 3;
`