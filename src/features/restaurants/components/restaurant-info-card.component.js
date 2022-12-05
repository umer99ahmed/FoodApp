import React from "react"
import styled from "styled-components/native";
import { View, Image} from 'react-native';
import {SvgXml} from "react-native-svg"
import { Card } from 'react-native-paper';

import star from "../../../../assets/star"
import open from "../../../../assets/open"
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import {
    RestaurantCard,
    RestaurantCardCover,
    Info,
    Section,
    SectionEnd,
    Rating,
    Icon
} from "./restaurant-info-card.styles"

export const RestaurantInfoCard = ({restaurant = {}}) => {
    const {
        name = 'Some Restaurant',
        icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        photos = [
            "https://images.squarespace-cdn.com/content/v1/53b839afe4b07ea978436183/1608506169128-S6KYNEV61LEP5MS1UIH4/traditional-food-around-the-world-Travlinmad.jpg"
        ],
        address = "100 some street",
        isOpenNow = true,
        rating = 4,
        isClosedTemporarily = true,
    } = restaurant

    const ratingArr = Array.from(new Array(Math.floor(rating)));



    return(
        <>
        <RestaurantCard elevation={5}>
            <RestaurantCardCover key={name} source={{uri: photos[0]}} />
            <Info>
                <Text variant="label">{name}</Text>
                <Section> 
                    <Rating>
                        {ratingArr.map(()=>(
                            <SvgXml xml={star} width={20} height={20}/>
                            ))}
                    </Rating>
                    <SectionEnd>
                        {isClosedTemporarily && (
                        <Text variant="error">
                            CLOSED TEMPORARILY
                        </Text>
                        )}
                        <Spacer position = "left" size = "large">
                            {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
                        </Spacer>
                        <Spacer position = "left" size = "large">
                            <Icon source={{ uri: icon }} />
                        </Spacer>
                    </SectionEnd>
                </Section>
                <Text variant="caption">{address}</Text>
            </Info>
        </RestaurantCard> 
        </>
    )
}