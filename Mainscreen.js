import React, { useEffect, useState } from "react";
import {Text,View,StyleSheet} from "react-native";

const Main = ({ navigation}) => { 
    const [getdataSource, setdataSource] = useState(null);
    const [getdataPop, setdataPop] = useState(null);
    useEffect(() => {
      getDataCovid();
    }, []);
    useEffect(() => {
      getDataPop();
    }, []);
    const getDataCovid = async () => {
      return await fetch("https://covid-19-data.p.rapidapi.com/totals", {
        method: "GET",
        headers: {
          "x-rapidapi-key": "5e58e6b9c9mshaeb7764d9fb2bf6p111fcfjsn661356c8fd05",
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "useQueryString": true
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setdataSource(responseJson);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    const getDataPop = async () => {
      return await fetch(
        "https://world-population.p.rapidapi.com/worldpopulation",
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
          setdataPop(responseJson);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 44, color:'white', backgroundColor: 'black'}}>COVID RECENT DATA IN ALL OVER THE WORLD</Text>
        {getdataSource !== null && getdataPop !== null ? (
          <View >
            <Infodisplay
              critical={getdataSource[0].critical}
              deaths={getdataSource[0].deaths}
              confirmed={getdataSource[0].confirmed}
              recovered={getdataSource[0].recovered}
              population={getdataPop.body.world_population}
            />
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  }

  function Infodisplay(props) {
    return (
      <View style={{ padding: 50, backgroundColor: 'black'}}>
        <Text style={{padding: 20, fontSize: 16, color:'white',}}>
          Cases : {props.confirmed}
        </Text>
        <Text style={{ padding: 20, fontSize: 16, color:'white', }}>
          Deaths : {props.deaths}
        </Text>
        <Text style={{ padding: 20, fontSize: 16, color:'white', }}>
          Deaths Percentage : {((props.deaths / props.confirmed) * 100).toFixed(1)} %
        </Text>
        <Text style={{ padding: 20, fontSize: 16, color:'white', }}>
          Recovered : {props.recovered}
        </Text>
        <Text style={{ padding: 20, fontSize: 16, color:'white', }}>
          Recovered Percentage : {" "}
          {((props.recovered / props.confirmed) * 100).toFixed(1)} %
        </Text>
        <Text style={{ padding: 20, fontSize: 16, color:'white', }}>
          Critical Cases : {props.critical} 
        </Text>
        <Text style={{ padding: 20, fontSize: 16, color:'white', }}>
          Critical Cases Percentage : {" "} %
          {((props.critical / props.confirmed) * 100).toFixed(2)}
        </Text>
      </View>
    );
  }
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    listStyle: {
      padding: 20,
      margin: 10,
    },
    textSyle: {
      fontSize: 18,
    },
  });
  

  export default Main;