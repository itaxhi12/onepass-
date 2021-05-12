import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import React,{useState} from 'react';
import axios from 'react-native-axios'
import {newcss} from '../newcss'
import {fonts} from '../fonts'
import Icons from 'react-native-vector-icons/MaterialIcons'
import AppLoading  from "expo-app-loading";
import { ScrollView } from 'react-native-gesture-handler';

export default function Notes({navigation})
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
    axios.post('http://127.0.0.1:3000/notes',input,
        {headers:
          {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS"
          }
        }
        ).then(navigation.navigate('Notes'))
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
                  color='#F0F5F9' style={styles.iconback}/>
                    <Text style={styles.heading}>Notes</Text>
                  <Icons onPress={() => navigation.goBack()} 
                  name={'search'} size={30} 
                  color='#F0F5F9' style={styles.iconsearch}/>
                  </View>
                    <ScrollView style={styles.scroll}>
                <View style={[styles.screenview],{alignItems:'flex-start'}}>
          {/* <Text style={styles.formtext}>{"\n"}Name</Text>
          <TextInput  style={styles.formfields}
          onChangeText={text =>handleInput({value:text,name:"name"})}
          placeholder='Name'
          placeholderTextColor= '#F0F5F9'
          /> */}

          <Text style={styles.fieldname}>{"\n"}Topic</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"topic"})}
          placeholder='Topic'
          placeholderTextColor= '#F0F5F9'
          />

          <Text style={styles.fieldname}>{"\n"}Note</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"note"})}
          placeholder='Note'
          placeholderTextColor= '#F0F5F9'
          />

          <TouchableOpacity
          onPress={submit}>
          <Text>Submit</Text>
          </TouchableOpacity>
          </View>
            </ScrollView>
          </View>
    );
  }}