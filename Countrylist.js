import React, { useEffect, useState } from "react";
import {Text,View,StyleSheet,FlatList,TouchableOpacity,} from "react-native";


import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";



const CountryList = ({ navigation,route}) => {
    var x = 1;
    const [getdataSource, setdataSource] = useState(null);
    const data = [{name:'China'},{name:'China'},]
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      return await fetch(
        "https://world-population.p.rapidapi.com/allcountriesname",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5e58e6b9c9mshaeb7764d9fb2bf6p111fcfjsn661356c8fd05",
            "x-rapidapi-host": "world-population.p.rapidapi.com",
            "useQueryString": true
          },
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setdataSource(responseJson.body.countries);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
    const saveData = async (data) => {
      try {
        await AsyncStorage.setItem(
          "@storage_Key_" + data,
          JSON.stringify({ value: data })
        );
      } catch (e) {
        // saving error
        console.error(e);
      }
    };
  
    return (
      <View style={styles.container}>
        {getdataSource && (
          <FlatList
            data={getdataSource}
            keyExtractor={() => String(x++)}
            renderItem={({ item }) => (
              <View style={styles.listStyle}>
                <TouchableOpacity
                  key={Math.random()}
                  onPress={() => navigation.navigate("Detail", { cont: item })}
                >
                  <View style={{width: "100%",flexDirection: "row"}}>
                    <View style={{ width: "75%"  }}>
                      <Text style={{ fontSize: 16, color:'white',}}>{item}</Text>
                    </View>
                    <TouchableOpacity 
                      style={{ width: "60%"}}
                      onPress={() => navigation.navigate("favourite", { d: data })}>
                      <Ionicons name="md-heart-outline" style={{fontSize:42, color:'white',}}/>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            )}
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
      padding: 20,
      margin: 10,
       backgroundColor:'black'
    },
    textSyle: {
      fontSize: 18,
    },
  });
  

  export default CountryList;