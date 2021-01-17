import React, { useState, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client'; 
import { ToastContainer } from 'react-toastify';
import client from './config/apollo';
import Auth from './pages/Auth';
import { getToken, decodeToken, removeToken } from './utils/token';
import Authcontext from './context/AuthContext';
import Navigation from './routes/Navigation';
function App() {
  let [auth, setAuth] = useState(undefined);

  useEffect(() => {
    let token = getToken();
    if(!token){
      setAuth(null)
    }else{
      setAuth(decodeToken(token))
    }
    console.log(token)
  },[])

  let logout = () => {
    removeToken();
    setAuth(null)
  }

  let setUser = (user) => {
    setAuth(user);
  }

  let authData = useMemo(
    ()=> ({
      auth,
      logout,
      setUser
    }),[auth]
  )

  if( auth === undefined ) return null;

  return (
    <ApolloProvider client={client} >
      <Authcontext.Provider value={authData} >
        { !auth ? <Auth/>:<Navigation />}
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      </Authcontext.Provider>
    </ApolloProvider>
  );
}

export default App;
