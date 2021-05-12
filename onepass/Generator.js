import React,{useState} from 'react';
import { StyleSheet,Clipboard, Text, TextInput, View, TouchableOpacity, Button} from 'react-native';
import { useFonts } from 'expo-font';
import {fonts} from './fonts'
import {newcss} from './newcss'
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
function Generator(){
const [isLoaded] = useFonts(fonts);
const styles = StyleSheet.create(newcss); 
const [slider,setSlider] = useState(8);//size of password
const [isUpper, setUpper] = useState(false);
const [isLower, setLower] = useState(true);
const [isNumber, setNumber] = useState(false);
const [isSpecial, setSpecial] = useState(false);
const [characters, setCharacters] = useState(false);

const [generalchar, setGeneralchar] = useState(true);
const [specialchar, setSpecialchar] = useState(false);
const [parenthesis, setParenthesis] = useState(false);

const [password,setPassword] = useState('defaultvalue');

const generatePassword = ()=>{
let exclude = `${!generalchar?('!@#$%^&*'):(null)}${!specialchar?('-.?_`~;:+=<>\|/'):(null)}${!parenthesis?('(){}[]'):(null)}`

axios.post('http://127.0.0.1:3000/generatepass',{length:slider,numbers:isNumber,lowercase:isLower,uppercase:isUpper,symbols:isSpecial,exclude:exclude})
.then(res=>{
  setPassword(res.data)
})
}


const copyPass = ()=>{
  if(password ==='defaultvalue'){
    alert("Please Generate a password first")
  }else{
    Clipboard.setString(password)
  }
  

}
const symbolsetting = ()=>{
  setCharacters(!characters)
}
if(!isSpecial && characters)
{
  setCharacters(!characters)

}
    return(
        <ScrollView style={styles.scroll}>
            <View style={styles.background}>
            <Text>Generator{"\n"}</Text>
            {/* 1. slider value is stored inside 'slider'
                 2. each checkbox has different states. at least 1 checkbox has to be
                checked by default. (lowercase). 
                DONE AT END: User cannot uncheck all boxes. 
                3. Click on generate password to generate password and store it inside 'password'
                4. click on copy password to copy the password.
                5. Click on the password itself to copy password.*/}
            <TouchableOpacity onPress={copyPass}>
            <Text style={{borderWidth:'1'}}>Password:{password}</Text>
            </TouchableOpacity >
            <TouchableOpacity onPress={generatePassword}><Text>Generate Password{"\n"}</Text></TouchableOpacity>
            <TouchableOpacity onPress={copyPass}><Text>Copy Password{"\n"}</Text></TouchableOpacity>
            <Text>Password Length:{slider}</Text>
            <Slider
                style={{width: 200, height: 40,color:'black'}}
                minimumValue={8}
                maximumValue={100}
                minimumTrackTintColor="#6bf060"
                maximumTrackTintColor="#fb4737"
                thumbTintColor="#5970ce"
                value={8}
                step={1}
                onValueChange={value=>setSlider(value)}
                />
            <Text>Upper Case</Text>
                                
        <Checkbox
          style={styles.checkbox}
          value={isUpper}
          onValueChange={setUpper}
          color={isUpper ? '#5970ce' : undefined}
        />
                    <Text>Lower Case</Text>
        <Checkbox
          style={styles.checkbox}
          value={isLower}
          onValueChange={setLower}
          color={isLower ? '#5970ce' : undefined}
        />
                    <Text>Number</Text>
        <Checkbox
          style={styles.checkbox}
          value={isNumber}
          onValueChange={setNumber}
          color={isNumber ? '#5970ce' : undefined}
        />
                    <Text>Special Characters</Text>
        <Checkbox
          style={styles.checkbox}
          value={isSpecial}
          onValueChange={setSpecial}
          color={isSpecial ? '#5970ce' : undefined}
        />

        <TouchableOpacity onPress={symbolsetting}
        disabled={!isSpecial}
        >
          <Text>Symbols Settings</Text>
          </TouchableOpacity>
        {characters?
        <>
        <Text>General Characters (!@#$%^&*)</Text>
        <Checkbox
          style={styles.checkbox}
          value={generalchar}
          onValueChange={setGeneralchar}
          color={generalchar ? '#5970ce' : undefined}
        />
        <Text>Special Characters (-.?_`~;:+=)</Text>
        <Checkbox
          style={styles.checkbox}
          value={specialchar}
          onValueChange={setSpecialchar}
          color={specialchar ? '#5970ce' : undefined}
        />
        <Text>Parenthesis ((){}[])</Text>
        <Checkbox
          style={styles.checkbox}
          value={parenthesis}
          onValueChange={setParenthesis}
          color={parenthesis ? '#5970ce' : undefined}
        />
        </>
        :null}
        {(!isUpper && !isLower && !isNumber && !isSpecial)?setLower(true):null}
        {(!generalchar && !specialchar && !parenthesis)?setGeneralchar(true):null}
        
            </View>
        </ScrollView>
    );
}
export default Generator