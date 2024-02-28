import React, { useState, createContext, useEffect } from "react";
import {
    onAuthStateChanged,
  } from "firebase/auth";
import { loginRequest, registerRequest, logoutRequest, auth } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
  onAuthStateChanged(auth, (user) => {
        console.log("USER IS STILL LOGGED IN: " , user);
        if (user) {
            setUser(user);
            setIsLoading(false);
            setIsAuthenticating(false);
        }
        else{
            setIsLoading(false)
            setIsAuthenticating(false);
        }
    });
  }, [user]);


   

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    registerRequest(email, password)
    .then((u) => {
      setUser(u);
      setIsLoading(false);
    })
    .catch((e) => {
      setIsLoading(false);
      setError(e.toString());
    });
  };

  const onLogout = () => {
    setIsLoading(true);
    logoutRequest()
        .then(() => {
            setIsLoading(false);
            setUser(null);
            setError(null);
        })
        .catch((error) => {
            setIsLoading(false);
            console.error("Error with signout: ", error);
        });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        isAuthenticating,
        user,
        setUser,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};