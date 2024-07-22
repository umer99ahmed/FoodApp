import React, { useState, createContext, useEffect, useMemo, useContext } from "react";

import { recipesRequest, recipesTransform } from "./recipes.service";
import { LocationContext } from "../location/location.context";

export const RecipesContext = createContext();

export const RecipesContextProvider = ({ children }) => {

  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const {location} = useContext(LocationContext)

  const retrieveRecipes = (loc) => {
    setIsLoading(true)
    setRecipes([]);
    setTimeout(()=>{
        recipesRequest(loc).then(recipesTransform).then(res=>{
            setIsLoading(false)
            setRecipes(res)
        }).catch(err => {
            setIsLoading(false)
            setError(err)
        })
    }, 2000)
  }
  useEffect(()=>{
    if(location){
      const locationString = `${location.lat},${location.lng}`
      retrieveRecipes(locationString)
    }
  }, [location]);
  return (
    <RecipesContext.Provider
      value={{
        recipes,
        isLoading,
        error
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};