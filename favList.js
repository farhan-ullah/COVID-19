import React, { useEffect, useState } from "react";
import {Text,View,StyleSheet,FlatList,} from "react-native";


const FavList = ({ navigation,route}) => {
    const {d} = route.params;
    return (
      <View style={styles.container}>
        {d && (
          <FlatList
            data={d}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({ item }) => (
              <Text>{item.name}</Text>)}
          />
        )}
      </View>
    );
  }
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    listStyle: {
      padding:50,
      margin: 50,
    },
    textSyle: {
      fontSize: 18,
    },
  });
  

  export default FavList;