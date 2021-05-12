import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import React,{Component, useState} from 'react';
import axios from 'react-native-axios'
import {newcss} from '../newcss'
import {fonts} from '../fonts'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import AppLoading  from "expo-app-loading";

export default function Notes({navigation})
{    
  const [isLoaded] = useFonts(fonts);
  const styles = StyleSheet.create(newcss);
  const [editable,setEditable] = useState(true)
  const [deleteable,setdelete] = useState(true)
  const [data,setData]= useState(navigation.state.params.key)
 
 const handleInput = (e) =>{
    const {name,value} = e
    setData(values=>{
      return{
        ...values,
        [name]:value
      }
    })

  }
  const del = () =>{
    axios.delete(`http://127.0.0.1:3000/notes/${data._id}`,data,
        {headers:
          {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS"
          }
        }
        ).then(navigation.navigate('Homepage'))
  }

  const changeState = ()=>{
    setEditable(!editable)
    setdelete(!deleteable)
    if(!editable){
      navigation.navigate('Notes')
    }
  }

  const submit  = () =>{
    axios.put(`http://127.0.0.1:3000/notes/${data._id}`,data,
        {headers:
          {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS"
          }
        }
        ).then(navigation.navigate('Homepage'))
  }
  if (!isLoaded) {
    return <AppLoading/>;
  } else { return (
    <View style={styles.background}>
    <View style={styles.view_headerbg}>
    <Text style={styles.fakeheading}></Text>
      </View>
    <View style={styles.view_headingview}>

      {editable?(<>
      <Text style={styles.view_headingtext}>Addresses</Text>
      </>):(
            <Text style={styles.view_headingtext}>Editing Mode</Text>
            )}
            </View>

        <View style={styles.view_actualheading}>
              {editable?(<>
                <Icons onPress={() => navigation.goBack()} 
                name={'arrow-back'} size={30} 
                color='#F0F5F9' style={styles.editbackicon}/>
              <TouchableOpacity style={styles.editbutton}
                onPress={changeState}>
                  <Text style={styles.editbuttontext}>Edit</Text></TouchableOpacity>
            </>):(<>

            <TouchableOpacity style={styles.cancelbutton}
            onPress={changeState}>
              <Text style={styles.cancelbuttontext}>Cancel</Text>
              </TouchableOpacity>

            <TouchableOpacity style={styles.submitbutton}
            onPress={submit}>
              <Text style={styles.submitbuttontext}>Submit</Text></TouchableOpacity>

            </>)}
            </View>
        <ScrollView style={styles.scroll}>
        <View style={[styles.screenview],{alignItems:'flex-start'}}>
        {/* <Text >{"\n"}Name</Text>
        <TextInput style={styles.fieldinput}
        onChangeText={text =>handleInput({value:text,name:"name"})}
        placeholder='Name'
        placeholderTextColor= '#F0F5F9'
        defaultValue={data.name}
        disabled={editable}
        /> */}
        <Text style={styles.fieldname}>{"\n"}Topic</Text>
        <TextInput style={styles.fieldinput}
        onChangeText={text =>handleInput({value:text,name:"topic"})}
        placeholder='Topic'
        placeholderTextColor= '#F0F5F9'
        defaultValue={data.topic}
        disabled={editable}
        />
        <Text style={styles.fieldname}>{"\n"}Note</Text>
        <TextInput style={styles.fieldinput}
        onChangeText={text =>handleInput({value:text,name:"note"})}
        placeholder='Note'
        placeholderTextColor= '#F0F5F9'
        defaultValue={data.note}
        disabled={editable}
        />
        <View style={styles.deletebuttonview}>
          <Text>{"\n"}{"\n"}</Text>
         {deleteable?null:(
         <><TouchableOpacity style={styles.deletebutton}
            onPress={del}><Text style={styles.deletebuttontext}>Delete</Text></TouchableOpacity>
            </>)}
            </View>
            <Text>{"\n"}{"\n"}{"\n"}</Text>
            </View>
            </ScrollView>
          </View> 
    );
}}