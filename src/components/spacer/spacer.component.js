import React from "react"
import {View} from "react-native"
import styled, {useTheme} from "styled-components"

const sizeVariant = {
    small : 1,
    medium: 2,
    large: 3
}

const positionVariant = {
    top: "marginTop",
    left: "margin-left",
    right: "margin-right",
    bottom: "margin-bottom"
}

const getVariant = (position, size, theme) => {
    const sizeIndex = sizeVariant[size];
    const property = positionVariant[position];
    const value = theme.space[sizeIndex]
    return `${property}:${value}`;
}

const SpacerView = styled.View`
    ${({variant}) => variant}
`
export const Spacer = ({position = 'top', size = 'small', children}) => {
    const theme = useTheme();
    const variant = getVariant(position, size, theme);
    return(
        <SpacerView variant={variant}>{children}</SpacerView>
    )
}