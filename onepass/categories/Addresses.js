import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import React,{useEffect, useState} from 'react';
import axios from 'react-native-axios'
import {newcss} from '../newcss'
import {fonts} from '../fonts'
import Icons from 'react-native-vector-icons/MaterialIcons'
import {store} from '../Redux/globalReducer'
import AppLoading  from "expo-app-loading";
import { ScrollView } from 'react-native-gesture-handler';

export default function Addresses({navigation})
{
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
      const [data,setData] = useState([])
      const [filter,setFilter] = useState([])
      const [search,setSearch] = useState('')
      useEffect(()=>{
  const getData  = async ()=>{
    const token =store.getState().reducer.user.data
    await axios.get('http://127.0.0.1:3000/address',{headers:{Auth:token}}).then((res)=>{
    setData(res.data)
})  }
getData()
},[setData])
    useEffect(() => {
    setFilter(
      data.filter((obj) =>
        obj.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search,data,setFilter]);
const onPressHandler = key => event => {
  navigation.navigate('viewAddress',{ key })
}
  const render = (e) =>{
    return(
      <TouchableOpacity key={e._id} onPress={onPressHandler(e)} style={styles.datacard}>
        <Text style={styles.datacardtext}>{e.name}</Text>
        <Text style={styles.datacardtext}>{e.city}</Text>
        </TouchableOpacity>
    )
  }

  if (!isLoaded) {
    return <AppLoading/>;
  } else { return (
    <View style={styles.background}>
    <View style={styles.header}>
      <Text style={styles.fakeheading}></Text>
    </View>
        <View style={{position:'absolute',elevation:4,flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <Icons onPress={() => navigation.navigate('Homepage')} 
          name={'arrow-back'} size={30} 
          color='#F0F5F9' style={styles.iconback}/>
              <Text style={styles.heading}>Addresses</Text>
              <Icons onPress={() => navigation.goBack()} 
        name={'search'} size={30} 
        color='#F0F5F9' style={styles.iconsearch}/>
             <TextInput 
          onChangeText={text =>setSearch(text)}
          placeholder='Search'          
          placeholderTextColor= '#F0F5F9'
          />
            </View>
        <ScrollView style={styles.scroll}>
                <View style={styles.screenview}>
        {(data.length>0)?filter.map(render):<Text style={styles.carddata}>No data available</Text>}
        </View>
            </ScrollView>
          </View>
    );
    }}