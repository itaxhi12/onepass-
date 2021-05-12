import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import React,{useState} from 'react';
import axios from 'react-native-axios'
import {newcss} from '../newcss'
import {fonts} from '../fonts'
import Icons from 'react-native-vector-icons/MaterialIcons'
import DatePicker from 'react-native-datepicker';
import AppLoading  from "expo-app-loading";
import { ScrollView } from 'react-native-gesture-handler';

export default function CardDetails({navigation})
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
    axios.post('http://127.0.0.1:3000/cards',input,
        {headers:
          {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "PUT, DELETE, POST, GET, OPTIONS"
          }
        }
        ).then(navigation.navigate('CardDetails'))
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
              <Text style={styles.heading}>Card Details</Text>
            <Icons onPress={() => navigation.goBack()} 
            name={'search'} size={30} 
            color='#F0F5F9' style={styles.iconsearch}/>
            </View>
              <ScrollView style={styles.scroll}>
          <View style={[styles.screenview],{alignItems:'flex-start'}}>
          <Text style={styles.fieldname}>{"\n"}Card Holder Name</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"name"})}
          placeholder='Card Holder Name'          
          placeholderTextColor= '#F0F5F9'
          />

          <Text style={styles.fieldname}>{"\n"}Card Number</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"number"})}
          placeholder='Card Number'          
          placeholderTextColor= '#F0F5F9'
          />

          <Text style={styles.fieldname}>{"\n"}CVV</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"cvv"})}
          placeholder='CVV'          
          placeholderTextColor= '#F0F5F9'
          />

          <Text style={styles.fieldname}>{"\n"}Month Of Expiry</Text>
          {/* <DatePicker
            style={styles.datePickerStyle}
            // date={date} // Initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder="Select date"
            format="DD-MM-YYYY"
            minDate="01-01-2016"
            maxDate="01-01-2019"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              handleInput({value:date,name:"moe"});
            }}
          /> */}

          <Text style={styles.fieldname}>{"\n"}Bank Name</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"bankname"})}
          placeholder='Bank Name'
          placeholderTextColor= '#F0F5F9'
          />

          <Text style={styles.fieldname}>{"\n"}Password</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"password"})}
          placeholder='Password'
          placeholderTextColor= '#F0F5F9'
          />

          <Text style={styles.fieldname}>{"\n"}Note</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"notes"})}
          placeholder='Note'
          placeholderTextColor= '#F0F5F9'
          />

          <TouchableOpacity
            onPress={submit}><Text>Submit</Text></TouchableOpacity>
     </View>
            </ScrollView>
          </View>
    );
  }}