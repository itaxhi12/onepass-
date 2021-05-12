import { createBottomTabNavigator} from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Generator from './Generator'
import Profile from './Profile'
import React from 'react'
import Homepage from './categories/index'
import {FontAwesome5} from '@expo/vector-icons'; 

const bottomTabNavigator = createBottomTabNavigator(
  {
    Homepage: {
      screen:Homepage,
      navigationOptions:{
        tabBarLabel :'Home',
        tabBarIcon: ()=>(
          <FontAwesome5 name="home" size={24}  />
        )
      }
    },
    Generator: {
      screen:Generator,
      navigationOptions:{
        tabBarLabel :'Generator',
        tabBarIcon: ()=>(
          <FontAwesome5 name="key" size={24}  />
        )
      }
    },
    Profile: {
      screen:Profile,
      navigationOptions:{
        tabBarLabel :'Profile',
        tabBarIcon: ()=>(
          <FontAwesome5 name="user-circle" size={24} />
        )
      }
    },
    }
  );
  const AppContainer = createAppContainer(bottomTabNavigator)
export default AppContainer