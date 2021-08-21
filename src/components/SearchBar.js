import React from "react"
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default SearchBar = ({ value, search, setInputValue, setIsPromiseReady }) => {
    const styles = StyleSheet.create({
        Wrapper: {
            height: 38,
            width: "94%",
            backgroundColor: "#DDDDDD",
            margin: 10,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center"
        },
        input: {
            color: "#7095FF",
            marginLeft: 8,
            height: "100%",
            width: "78%",
            fontSize: 22,
            fontWeight: "bold",
        }
    })

    function DoSearch() {
        search(value)
        setIsPromiseReady(false)
    }

    return (
        <View style={styles.Wrapper}>
            <Ionicons name="md-search-sharp" size={24} color="#7095FF" style={{ marginLeft: 10, marginTop: 2 }} />
            <TextInput
                value={value}
                onSubmitEditing={DoSearch}
                autoCapitalize="none"
                autoComplete={false}
                onChangeText={(textVal) => setInputValue(textVal)}
                style={styles.input}
                placeholder="Search something..."
            />
            <TouchableOpacity onPress={() => setInputValue("")}>
                <AntDesign name="close" size={24} color="#7095FF" style={{ marginRight: 10, marginTop: 2, display: value === "" ? "none" : "flex"}} />
            </TouchableOpacity>
        </View>
    )
}