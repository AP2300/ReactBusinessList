import React, { useState, useEffect } from "react";
import { Text, Button, ScrollView, StyleSheet } from "react-native";
import axios from "axios"
import SearchBar from "../components/SearchBar";
import SearchList from "../components/SearchList";
import normalize from "../helpers/Normalize";



const token = "K3V6i-ZDYwHXrvwcG6blV-agimZdiYhH3uj3YZdPoVqTF5VXKl9VdI7neKpVyEqLo8lBKiraViQwbFmDFQmKO_ZYJvw9mkls6a7TChCcWJCrMEqM2TWzivwdbbcaYXYx"

const Home = () => {
    const [InputValue, setInputValue] = useState("")
    const [SearchData, setSearchData] = useState([])
    const [IsPromiseReady, setIsPromiseReady] = useState(false)

    useEffect(() => {
        search("")
    }, [])

    function search(search) {
        axios.get(`https://api.yelp.com/v3/businesses/search?term=${search}&latitude=${37.786882}&longitude=${-122.399972}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                const costEffective = res.data.businesses.filter(business => business.price ? business.price.length === 1 : null)
                const BigPricer = res.data.businesses.filter(business => business.price ? business.price.length >= 2 && business.price.length < 4 : null)
                const BigSpender = res.data.businesses.filter(business => business.price ? business.price.length === 4 : null)
                setSearchData([...[], costEffective, BigPricer, BigSpender])
                setIsPromiseReady(true)
            })
            .catch(err => {
                console.error(err);
            })
    }

    const styles = StyleSheet.create({
        titles: {
            fontSize: normalize(30),
            fontWeight: "bold",
            marginLeft: 8
        },
        NothingHere: {
            fontSize: 22,
            fontWeight: "bold",
            backgroundColor: "whitesmoke",
            padding: 20,
            color: "#7095FF",
            margin: 12,
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
    })

    return (
        <>
            <SearchBar value={InputValue} search={search} setInputValue={setInputValue} setIsPromiseReady={setIsPromiseReady} />

            <ScrollView>
                <Text style={styles.titles}>Cost Effective</Text>
                <SearchList data={SearchData[0]} IsPromiseReady={IsPromiseReady} />
                <Text style={styles.titles}>Bit Pricer</Text>
                <SearchList data={SearchData[1]} IsPromiseReady={IsPromiseReady} />
                <Text style={styles.titles}>Big Spender!</Text>
                <SearchList data={SearchData[2]} IsPromiseReady={IsPromiseReady} />
            </ScrollView>
        </>

    )
}

export default Home;