import { StyleSheet, Text, TextInput, View, TouchableOpacity,Button } from 'react-native';
import { useFonts } from 'expo-font';
import React,{useEffect, useState} from 'react';
import axios from 'react-native-axios'
import {newcss} from '../newcss'
import {fonts} from '../fonts'
import Icons from 'react-native-vector-icons/MaterialIcons'
import {store} from '../Redux/globalReducer'
import AppLoading  from "expo-app-loading";
import { ScrollView } from 'react-native-gesture-handler';
export default function Alldata({navigation})
{
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
      const [data,setData] = useState([])
     
useEffect(()=>{
  const getData  = async ()=>{
    const token =store.getState().reducer.user.data
    await axios.get('http://127.0.0.1:3000/alldata',{headers:{Auth:token}}).then((res)=>{
    setData(res.data)
    
})  }
getData()
},[setData])
var merged = [].concat.apply([], data)

const onPressHandler = key => event => {
  
   if(key.city){
    navigation.navigate('viewAddress',{ key })
  }
  else if(key.bank_name){
    
    navigation.navigate('viewBank',{ key })
  }
  else if(key.topic){
    navigation.navigate('viewNotes',{ key })
  }
  else if(key.username){
    navigation.navigate('viewPassword',{ key })
  }
  else if(key.moe){
    navigation.navigate('viewCards',{ key })
  }
  
  
  // navigation.navigate('viewAddress',{ key })
}
const render = (e) =>{
  if(e.city){
    return(
      <TouchableOpacity key={e._id} style={styles.datacard} onPress={onPressHandler(e)}>
        <Text style={styles.datacardtext}>{e.name}</Text>
        <Text style={styles.datacardtext}>{e.city}</Text>
        </TouchableOpacity>
    )
  }
  else if(e.bank_name){
    return(
      <TouchableOpacity key={e._id} style={styles.datacard} onPress={onPressHandler(e)}>
        <Text style={styles.datacardtext}>{e.bank_name}</Text>
        </TouchableOpacity>
    )
  }
  else if(e.topic){
    return(
      <TouchableOpacity key={e._id} style={styles.datacard} onPress={onPressHandler(e)}>
        <Text style={styles.datacardtext}>{e.topic}</Text>
        </TouchableOpacity>
    )
  }
  else if(e.username){
    return(
      <TouchableOpacity key={e._id} style={styles.datacard} onPress={onPressHandler(e)}>
        <Text style={styles.datacardtext}>{e.name}</Text>
        <Text style={styles.datacardtext}>{e.email}</Text>
        </TouchableOpacity>
    )
  }
  else if(e.moe){
    return(
      <TouchableOpacity key={e._id} style={styles.datacard} onPress={onPressHandler(e)}>
        <Text style={styles.datacardtext}>{e.bankname}</Text>
        <Text style={styles.datacardtext}>{e.name}</Text>
        </TouchableOpacity>
    )
  }
}






  if (!isLoaded) {
    return <AppLoading/>;
  } else { return (
    <View style={styles.background}>
    <View style={styles.header}>
      <Text style={styles.fakeheading}></Text>
    </View>
        <View style={{position:'absolute',elevation:4,flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <Icons onPress={() => navigation.goBack()} 
          name={'arrow-back'} size={30} 
          color='#F0F5F9' style={styles.iconback}/>
              <Text style={styles.heading}>All Data</Text>
              <Icons onPress={() => navigation.goBack()} 
        name={'search'} size={30} 
        color='#F0F5F9' style={styles.iconsearch}/>
            </View>
        <ScrollView style={styles.scroll}>
                <View style={styles.screenview}>
        
        {  merged.map(render)}
          {/* :<Text style={styles.carddata}>No data available</Text>} */}

        </View>
            </ScrollView>
          </View>
    );
    }}