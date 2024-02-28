import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { colors } from "../../infrastructure/theme/colors";
import styled from "styled-components/native";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const Navigation = () => {
  const { isAuthenticated, isAuthenticating } = useContext(AuthenticationContext);


  return (
        <NavigationContainer>
        {isAuthenticated ? 
            <AppNavigator /> : 
            isAuthenticating ? 
                (<LoadingContainer>
                    <Loading size={50} animating={true} />
                </LoadingContainer>) :  
                <AccountNavigator />}
      </NavigationContainer>
  );
};