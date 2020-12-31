import React, { useEffect, useState } from "react";
import {Text,View,StyleSheet,} from "react-native";



const CountryDetails = ({ navigation,route}) => {
    const cont = route.params.cont;
    const [getdataSource, setdataSource] = useState(null);
    const [getdataPop, setdataPop] = useState(null);
    const [getCountry, setCountry] = useState(cont);
    
    useEffect(() => {
      getData();
    }, []);
    useEffect(() => {
      getDataPop();
    }, []);
    const getDataPop = async () => {
      return await fetch(
        "https://world-population.p.rapidapi.com/population?country_name=" +
          getCountry,
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
          console.log(getdataPop);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
    const getData = async () => {
      return await fetch(
        "https://covid-19-data.p.rapidapi.com/country?name=" + getCountry,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5e58e6b9c9mshaeb7764d9fb2bf6p111fcfjsn661356c8fd05",
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "useQueryString": true
          },
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setdataSource(responseJson);
          console.log(getdataSource);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
    return (
      <View style={styles.container}>
        {getdataSource !== null && getdataPop !== null ? (
          <View >
            <Text style={{ fontSize: 36, color:'white', backgroundColor: 'black' }}>
              {getCountry} RECENT DATA
            </Text>
            <Infodisplay
                critical={getdataSource[0].critical}
                deaths={getdataSource[0].deaths}
                confirmed={getdataSource[0].confirmed}
                recovered={getdataSource[0].recovered}
                population={getdataPop.body.population}
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
    },
    listStyle: {
      padding: 20,
      margin: 10,
    },
    textSyle: {
      fontSize: 18,
    },
  });
  

  export default CountryDetails;