import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Button} from 'react-native';
import { useFonts } from 'expo-font';
import  AppLoading  from "expo-app-loading";
import {fonts} from './fonts'
import axios from 'react-native-axios';
import {css} from './css'
import {useDispatch} from 'react-redux'
import PassMeter from "react-native-passmeter";
// import { NavigationActions,StackActions } from '@react-navigation/native'


export default function Register({navigation}) {

const dispatch = useDispatch()
const [input,setInput] = useState({
  name:"",
  password:"",
  confirm_password:"",
  hint:"No Hint Available"
})

const [color,setColor] = useState('#F0F5F9')
const [message,setMessage] = useState({creds:"Please enter all the credentials",password:"Please enter a longer password",confirm:"Passwords donot match"})

let valid = false 
let length = false
let confirm = false
const handleInput = (e) =>{
  const {value,name} = e
  setInput(state=>{
    return {...state,[name]:value}
  })
} 
const formValidation = () =>{
  if(input.name!=="" && input.password !=="" && input.confirm_password!=="" ){
    valid = true
    if(input.password.length >6 && input.password.length<=22){
      length = true
      if(input.password === input.confirm_password){
        confirm = true
      }
    }
}
}
const register=()=>{
          if(valid){
            if(length){
              if(confirm){
              const data = {
              username:input.name,
              password:input.password,
              hint:input.hint
            }
          axios.post('http://127.0.0.1:3000/register',data,
        {headers:
          {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS"
          }
        }
        ).then(()=>{
        dispatch({type:"GET_DATA",data:{username:input.name,hint:input.hint}})
        navigation.navigate('Login',{username:input.name,hint:input.hint,flag:true})
        }).catch((er)=>{
          alert(er)
        })
      }else{
        alert(message.confirm)
      }
    }else{
        alert(message.password)
      }
    }else{
        alert(message.creds)
      }

}

const combined = () =>{
  formValidation()
  register()
}

const [isLoaded] = useFonts(fonts);
const styles = StyleSheet.create(css);
const MAX_LEN = 22,
  MIN_LEN = 6,
  PASS_LABELS = ["Too Short", "Weak", "Average", "Strong", "Secure"];

if (!isLoaded) {
  return <AppLoading/>;
} else {
  return (
    <View style={styles.logincontainer}>
      <Text style={styles.header}>{"\n"}One-Pass</Text>
      <Text style={styles.bodytext}>Keep your credentials to yourself!{"\n"}{"\n"}</Text>
      <View style={styles.form}>
      <Text style={styles.bodytext}>{"\n"}Name</Text>
      <TextInput  style={[styles.inputbox,{width:300}]}
      onChangeText={text => handleInput({value:text,name:"name"})}
      placeholder='Enter Name'
      placeholderTextColor= '#F0F5F9'
  
      />
      <Text style={styles.bodytext}>{"\n"}Set Password</Text>
      <TextInput style={[{
        width:300,
        fontFamily: 'RobotoCondensed-Light', 
        borderColor: '#F0F5F9',
        borderWidth: 1,
        alignItems: 'center',
        // outline:'none',
        borderRadius:7,
        textAlign:'center',
        height: 40,
        color: '#F0F5F9',
      }]}
      onChangeText={text =>handleInput({value :text,name:"password"})}
      placeholder='Enter Password'
      secureTextEntry = {true}
      placeholderTextColor= '#F0F5F9'
      />
      <View style={{borderRadius:7,width:300}}>
      <PassMeter
        showLabels
        password={input.password}
        maxLength={MAX_LEN}
        minLength={MIN_LEN}
        labels={PASS_LABELS}
      />
      </View>
      <Text style={styles.bodytext}>{"\n"}Confirm Password</Text>
      <TextInput  style={styles.loginpass}
      onChangeText={text =>handleInput({value:text,name:"confirm_password"})}
      placeholder='Confirm Password'
      secureTextEntry = {true}
      placeholderTextColor= '#F0F5F9'
      />
      <Text style={styles.bodytext}>{"\n"}Password Hint</Text>
      <TextInput style={[styles.inputbox,{width:300}]}
      onChangeText={text => handleInput({value:text,name:"hint"})}
      placeholder='Hint to remember'
      placeholderTextColor= '#F0F5F9'
      />
        </View>
        <Text>{"\n"}{"\n"}</Text>
        {/* <Button onPress = {register}></Button> */}
        <TouchableOpacity
          style={styles.button}
          onPress={combined}
        >
        <Text style={styles.loginbuttontext}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.bodytext}>{"\n"}{"\n"}{"\n"}{"\n"}Already Registered? Login{"\n"}</Text>
        
        <TouchableOpacity style={styles.button}
          onPress={() => { navigation.navigate("Login") ;}} 
        >
        <Text style={styles.loginbuttontext}>Login</Text>
        </TouchableOpacity>
      <StatusBar style="auto" /> 
    </View>
  );
}
};
