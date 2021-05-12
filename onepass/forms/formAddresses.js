import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import React,{useState} from 'react';
import axios from 'react-native-axios'
import {newcss} from '../newcss'
import {fonts} from '../fonts'
import Icons from 'react-native-vector-icons/MaterialIcons'
import AppLoading  from "expo-app-loading";
import { ScrollView } from 'react-native-gesture-handler';
export default function Addresses({navigation})
{
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [input,setInput] = useState({})
  
  const handleInput = (e) =>{
    const {name,value} = e
    setInput(values=>{
      return{
        ...values,
        [name]:value
      }
    })

  }
  const submit  = () =>{
    axios.post('http://127.0.0.1:3000/address',input,
        {headers:
          {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS"
          }
        }
        ).then(navigation.navigate('Addresses'))
  }
  if (!isLoaded) {
    return <AppLoading/>;
  } else { return (
    <View style={styles.background}>
    <View style={styles.header}>
      <Text style={styles.fakeheading}></Text>
    </View>
    <View style={{position:'absolute',elevation:4}}>
            <Icons onPress={() => navigation.goBack()} 
            name={'arrow-back'} size={30} 
            color='#ffffff' style={styles.iconback}/>
              <Text style={styles.heading}>Addresses</Text>
            <Icons onPress={() => navigation.goBack()} 
            name={'search'} size={30} 
            color='#ffffff' style={styles.iconsearch}/>
            </View>
              <ScrollView style={styles.scroll}>
          <View style={[styles.screenview],{alignItems:'flex-start'}}>
          <Text style={styles.fieldname}>{"\n"}Name</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"name"})}
          placeholder='Name'          
          placeholderTextColor= '#ffffff'
          />
          <Text style={styles.fieldname}>{"\n"}Apartment/Flat</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"apartment"})}
          placeholder='Aparthment / Flat'          
          placeholderTextColor= '#ffffff'
          />

          <Text style={styles.fieldname}>{"\n"}Street</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"street"})}
          placeholder='Street'          
          placeholderTextColor= '#ffffff'
          />

          <Text style={styles.fieldname}>{"\n"}Landmark</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"landmark"})}
          placeholder='Landmark'          
          placeholderTextColor= '#ffffff'
          />

          <Text style={styles.fieldname}>{"\n"}City</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"city"})}
          placeholder='City'          
          placeholderTextColor= '#ffffff'
          />

          <Text style={styles.fieldname}>{"\n"}State</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"state"})}
          placeholder='State'          
          placeholderTextColor= '#ffffff'
          />

          <Text style={styles.fieldname}>{"\n"}Country</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"country"})}
          placeholder='Country'
          placeholderTextColor= '#ffffff'
          />

          <Text style={styles.fieldname}>{"\n"}Pin-Code</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"pincode"})}
          placeholder='Pin-Code'
          placeholderTextColor= '#ffffff'
          />
          <TouchableOpacity
          onPress={submit}><Text>Submit</Text></TouchableOpacity>
        <Text>{"\n"}{"\n"}{"\n"}</Text>
        </View>
            </ScrollView>
          </View>
    );
  }}