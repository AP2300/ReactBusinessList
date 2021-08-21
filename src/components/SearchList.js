import React from "react"
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import normalize from "../helpers/Normalize"
import { Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import ContentLoader from "react-native-easy-content-loader";

export default SearchList = ({ data, IsPromiseReady}) => {
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        mainContainer: {
            width: 290,
            height: 190,
            margin: 8,
            backgroundColor: "whitesmoke",
            borderRadius: 5,
        },
        containerShadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        },
        Name: {
            fontSize: normalize(21),
            fontWeight: "bold",
            marginTop: 8,
            marginBottom: 3,
            marginLeft: 10
        },
        score: {
            fontSize: 24,
            textShadowColor: "#B2B1B9",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 3
        },
        bottomContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10
        }, loader: {
            backgroundColor: "white",
            width: 290,
            height: 190,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            borderRadius: 5,
            elevation: 3,
            margin: 10
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

    const render = ({ item }) => {

        return <TouchableOpacity
            onPress={() => {
                navigation.navigate("BusinessPage", {
                    BusinessId: item.id,
                    BusinessName: item.name
                })
            }}>
            <ContentLoader
                active
                pRows={2}
                pHeight={[25, 30]}
                pWidth={[268, 268]}
                containerStyles={styles.loader}
                tHeight={90}
                tWidth={290}
                titleStyles={{ marginHorizontal: -10 }}
                loading={!IsPromiseReady}
            >
               {item ?  <View style={[styles.mainContainer, styles.containerShadow]}>
                    <Image source={{ uri: item.image_url }} style={{ width: "100%", height: "50%", borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
                    <Text style={styles.Name}>{item.name}</Text>
                    <View style={styles.bottomContainer}>
                        <Text style={[styles.score, item.rating > 3.5 ? styles.green : item.rating > 2 ? styles.yellow : styles.red]}>{item.rating}</Text>
                        <Text style={{ fontSize: 18, color: "gray" }}>  |  </Text>
                        <Text style={{ fontSize: 18, color: "gray" }}>based on: {item.review_count} reviews</Text>
                    </View>
                </View>: null}
            </ContentLoader>
        </TouchableOpacity>
    }

    return (
        <FlatList
            keyExtractor={data ? (item) => item.id : (index) => index}
            data={data ? data : Array(3) }
            renderItem={render}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
                borderBottomColor: '#B2B1B9',
                borderBottomWidth: 1,
                width: Dimensions.get("window").width
            }}
        />
    )


}