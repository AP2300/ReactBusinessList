import React, { useEffect, useState } from "react"
import axios from "axios"
import { Text, View, ScrollView, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Linking } from 'react-native'
import { Dimensions } from "react-native";
import normalize from "../helpers/Normalize";
import ContentLoader from "react-native-easy-content-loader";

const token = "K3V6i-ZDYwHXrvwcG6blV-agimZdiYhH3uj3YZdPoVqTF5VXKl9VdI7neKpVyEqLo8lBKiraViQwbFmDFQmKO_ZYJvw9mkls6a7TChCcWJCrMEqM2TWzivwdbbcaYXYx"

export default function BusinessPage({ route, navigation }) {
    const { BusinessId, BusinessName } = route.params;
    const [BusinessData, setBusinessData] = useState({})
    const [Picture, setPicture] = useState("")
    const [IsPromiseReady, setIsPromiseReady] = useState(false)
    
    const styles = StyleSheet.create({
        mainContainer: {
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height
        },
        mainPhoto: {
            width: "97%",
            height: Dimensions.get("window").height * 0.424,
            margin: 5,
            borderRadius: 5
        },
        score: {
            fontSize: 29,
            textShadowColor: "#B2B1B9",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 3,
            marginLeft: 10
        },
        BottomContainer: {
            margin: 6,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },
        Hours: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        card: {
            backgroundColor: "whitesmoke",
            margin: 5,
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        },
        CallButton: {
            backgroundColor: "#7095FF",
            borderRadius: 8,
            padding: 12,
            margin: 9,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        },
        CallButtonText: {
            color: "whitesmoke",
            fontSize: normalize(15),
            marginLeft: 12
        },
        NoPhoneAvalible: {
            color: "#7095FF",
            fontSize: 30,
            fontWeight: "bold",
            alignSelf: "center",
            margin: 15
        },
        Divider: {
            borderColor: "#B2B1B9",
            borderWidth: 1,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 5,
            marginBottom: 5
        },
        loader: {
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            borderRadius: 5,
            elevation: 3,
            margin: 5,
            padding: 10,
            width: "97%"
        },
        lines: {
            alignSelf: "center"
        },
        red: {
            color: "#FF4848"
        },
        yellow: {
            color: "#FFD523"
        },
        green: {
            color: "#54E346"
        },
        gray: {
            color: "#B2B1B9"
        }
    })

    useEffect(() => {
        changeTitle()
        GetBusinessData()
    }, []);

    async function changeTitle() {
        navigation.setOptions({ title: BusinessName })
    }

    async function GetBusinessData() {
        try {
            const response = await axios.get(`https://api.yelp.com/v3/businesses/${BusinessId}`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            setBusinessData(response.data)
            setPicture(response.data.photos[0])
            setIsPromiseReady(true)
        } catch (error) {
            console.error(error);
        }

    }

    function SelectPicture(item) {
        if (item != Picture) setPicture(item)
    }


    return <ScrollView style={styles.mainContainer}>
        <ContentLoader
            active
            loading={!IsPromiseReady}
            pRows={0}
            tHeight={Dimensions.get("window").height * 0.414}
            tWidth="100%"
            containerStyles={{ paddingHorizontal: 5, paddingTop: 6 }}>
            {Picture ?
                <Image source={{ uri: Picture }}
                    style={styles.mainPhoto} />
                : null}
        </ContentLoader>


        <FlatList
            keyExtractor={ BusinessData.photos ? (item ) => item : (index)=> index}
            data={BusinessData.photos ? BusinessData.photos : Array(3)}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => SelectPicture(item)}>
                        <ContentLoader
                            active
                            loading={!IsPromiseReady}
                            pRows={1} title={false}
                            pWidth={normalize(99)}
                            pHeight={normalize(55)}
                            containerStyles={{
                                marginHorizontal: 5,
                                paddingHorizontal: 0,
                                paddingVertical: 0,
                                marginVertical: 0
                            }}>

                            {item ? <Image source={{ uri: item }}
                                style={{
                                    width: normalize(105),
                                    height: normalize(60),
                                    borderColor: item === Picture ? "#7095FF" : "white",
                                    borderWidth: 3,
                                    margin: 2,
                                    borderRadius: 10
                                }}
                            /> : null}
                        </ContentLoader>

                    </TouchableOpacity>

                )
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />


        <ContentLoader
            active
            loading={!IsPromiseReady}
            tHeight={30}
            tWidth="100%"
            pRows={3}
            pWidth={["70%", "76%", "98%"]}
            pHeight={[25, 25, 45]}
            containerStyles={styles.loader}
            paragraphStyles={styles.lines}>
            <View style={styles.card}>
                <View style={styles.BottomContainer}>
                    <FontAwesome name="star" size={24} color={BusinessData.rating > 3.5 ? "#54E346" : BusinessData.rating > 2 ? "#FFD523" : "#FF4848"} />
                    <Text style={[styles.score, BusinessData.rating > 3.5 ? styles.green : BusinessData.rating > 2 ? styles.yellow : styles.red]}>{BusinessData.rating}</Text>
                    <Text style={{ fontSize: normalize(22), color: "#B2B1B9" }}>  |  </Text>
                    <Text style={{ fontSize: normalize(20), color: "#B2B1B9" }}> Based on: {BusinessData.review_count} reviews</Text>
                </View>

                <View style={styles.Divider}></View>

                <View style={styles.Hours}>
                    <Ionicons name="ios-time" size={24} color="gray" style={{ marginRight: 2 }} />
                    <Text style={{ color: "gray", fontSize: normalize(16) }}> {BusinessData.id ? BusinessData.hours[0].open[0].start.substring(0, 2) : null} am  -  {BusinessData.id ? BusinessData.hours[0].open[0].end.substring(0, 2) : null} pm</Text>
                </View>
                <View style={styles.Hours}>
                    <FontAwesome5 name="map-marked" size={24} color="gray" style={{ marginRight: 9 }} />
                    <Text style={{ color: "gray", fontSize: normalize(16) }}>{BusinessData.id ? `${BusinessData.location.address1}, ${BusinessData.location.city}` : null}</Text>
                </View>

                {BusinessData.id ? BusinessData.phone ?
                    <TouchableOpacity onPress={() => { BusinessData.phone ? Linking.openURL(`tel:${BusinessData.id ? BusinessData.phone : null}`) : null }}>
                        <View
                            style={styles.CallButton}>
                            <FontAwesome5 name="phone-alt" size={24} color="whitesmoke" />
                            <Text style={styles.CallButtonText}>Call {BusinessData.id ? BusinessData.name : null} - {BusinessData.id ? BusinessData.display_phone : null}</Text>
                        </View>
                    </TouchableOpacity>
                    : <Text style={styles.NoPhoneAvalible}>No business phone avalible</Text> : null}

            </View>
        </ContentLoader>

    </ScrollView>
}