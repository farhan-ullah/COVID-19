import React from "react";
import {StyleSheet} from "react-native";

import Main from './Mainscreen';
import CountryDetails from './CountryDetails';
import FavList from './favList';
import CountryList from './Countrylist';

import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Tab.Navigator
        screenOptions={({}) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Main" component={Main} />
        <Tab.Screen name="List of Country" component={Countlist} options={{headerShown:false}}/>
        <Tab.Screen name="Favourited Country" component={favcountry} options={{headerShown:false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function Countlist() {
  return (
    <Stack.Navigator initialRouteName={"CountryList"}>
      <Stack.Screen name="CountryList" component={CountryList} options={{headerShown:false}}/>
      <Stack.Screen name="Detail" component={CountryDetails} options={{headerShown:false}} />
      <Stack.Screen name="favourite" component={FavList} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

function favcountry() {
  return (
    <Stack.Navigator initialRouteName={"FavList"}>
      <Stack.Screen name="CountryList" component={FavList} options={{headerShown:false}}/>
      <Stack.Screen name="Detail" component={CountryDetails} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}
