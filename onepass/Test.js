import Modal from 'react-native-root-modal';
import React, {useState } from 'react'
// import {  } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import {newcss} from './newcss'
import {StyleSheet, TouchableOpacity,Button ,View ,Text} from 'react-native'
import Bottomnavbar from './Bottomnavbar'
import {fonts} from './fonts'
import { useFonts } from 'expo-font';
import AppLoading  from "expo-app-loading";
export default function  Test (){
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  if (!isLoaded) {
    return <AppLoading/>;
  } else { return(
      
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.fakeheading}></Text>
      </View>
    <View style={styles.textheading}>
      <Text style={styles.heading}>OnePass</Text>
    </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.screenview}>
      
    </View>
    </ScrollView>
  </View>
    )
  }}
