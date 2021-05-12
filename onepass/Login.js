import { StatusBar } from 'expo-status-bar';
import React,{ useState,useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,Switch, DevSettings} from 'react-native';
import { useFonts } from 'expo-font';
import  AppLoading  from "expo-app-loading";
import axios from 'react-native-axios'
import {css} from './css'
import {fonts} from './fonts'
import {useDispatch,useSelector} from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
export default function Login  ({navigation}) {
  
const [input,setInput] = useState("")
const [isLoaded] = useFonts(fonts);
const styles = StyleSheet.create(css); 

const creds = useSelector(state=>state.reducer.creds)
const dispatch = useDispatch()
const [toggle, setToggle] = useState(false);
useEffect(()=>{
  const getData  = async ()=>{
       await axios.get('http://127.0.0.1:3000/creds').then((res)=>{
   dispatch({type:"GET_DATA",data:res.data})
 })  }
getData()
  },[dispatch])
const login= (e)=>{  
  e.preventDefault()
  
  if(input !== "")
  {axios.post('http://127.0.0.1:3000/login',{
    username:creds.username ,
    password:input,
  },
  {headers:
    {
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Authorization",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS"
    }
  }
  ).then((res)=>{
    dispatch({type:"LOGIN",data:res.data})
    navigation.navigate('Bottomnavbar')
  }).catch((er)=>{
    console.log("error")
  })
  }
  else
  {
    alert("Credentials cannot be empty")
  }
}

if (!isLoaded) {
  return <AppLoading/>;
} else {
  return (
      <ScrollView><View style={styles.logincontainer}>
      <Text style={styles.header}>{"\n"}One-Pass</Text>
      <Text style={styles.bodytext}>Keep your credentials to yourself!{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
      <Text style={styles.bodytext}>{creds.username?(`Hello ${creds.username}`):(null)}</Text>
      <View style={styles.form}>
      <Text style={styles.bodytext}>{"\n"}Password</Text>
      <TextInput style={[styles.inputbox,{width:300}]}
      onChangeText={text => setInput(text)}
      secureTextEntry = {true}
      />
      </View>
      <View style={styles.hinttoggle}>
      <Text style={styles.hinttext}>Enable Hint</Text>
      <Switch
                style={{marginTop:16}}
                trackColor={{false: '#F0F5F9', true: '#4dd163'}}
                thumbColor='#F0F5F9'
                // onTintColor='#F0F5F9'
                // ios_backgroundColor="#F0F5F9"
                onValueChange={(value) => setToggle(value)}
                value={toggle}
            />
      </View>
      {toggle?(<Text style={styles.hint}>{creds.hint}</Text>):(null)}
      

      <Text style={styles.bodytext}>{"\n"}Login using biometrics{"\n"}</Text>

      <TouchableOpacity
          style={styles.button}
          onPress={e=>login(e)} 
        >
        <Text style={styles.loginbuttontext}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.bodytext}>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}Not registered? Create account now{"\n"}</Text>

      <TouchableOpacity
          style={styles.button}
          onPress={() => {navigation.navigate("Register") }}
        >
        <Text style={styles.loginbuttontext}>Register{"\n"}</Text>
        </TouchableOpacity>
      <StatusBar style="auto" /> 
      </View>
    </ScrollView>
  );
}
};
