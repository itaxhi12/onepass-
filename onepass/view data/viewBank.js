
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import React,{ useState,useEffect} from 'react';
import axios from 'axios'
import {newcss} from '../newcss'
import {fonts} from '../fonts'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import AppLoading  from "expo-app-loading";

export default function Viewbank({navigation})
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
    axios.delete(`http://127.0.0.1:3000/bank/${data._id}`,data,
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
      navigation.navigate('BankDetails')
    }
  }

  const submit  = () =>{
    axios.put(`http://10.0.0.4:3000/bank/${data._id}`,data,
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
        <Text style={styles.fieldname}>{"\n"}Bank Name</Text>
          <TextInput style={styles.fieldinput}style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"bank_name"})}
          placeholder='Bank Name'
          placeholderTextColor= '#1E2022'
          defaultValue={data.bank_name}
          disabled={editable}
          />
          <Text style={styles.fieldname} >{"\n"}Account Number</Text>
          <TextInput style={styles.fieldinput}style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"acc_no"})}
          placeholder='Account Number'
          placeholderTextColor= '#1E2022'
          defaultValue={data.acc_no}
          disabled={editable}
          />
          <Text style={styles.fieldname}>{"\n"}IFSC Code</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"ifsc"})}
          placeholder='IFSC Code'
          placeholderTextColor= '#1E2022'
          defaultValue={data.ifsc}
          disabled={editable}
          />
          <Text style={styles.fieldname}>{"\n"}Branch</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"branch"})}
          placeholder='Branch Name'
          placeholderTextColor= '#1E2022'
          defaultValue={data.branch}
          disabled={editable}
          />

          <Text style={styles.fieldname}>{"\n"}Telephone Number</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"telephone"})}
          placeholder='Telephone Number'
          placeholderTextColor= '#1E2022'
          defaultValue={data.telephone}
          disabled={editable}

          />
          <Text style={styles.fieldname}>{"\n"}Note</Text>
          <TextInput style={styles.fieldinput}
          onChangeText={text =>handleInput({value:text,name:"note"})}
          placeholder='Notes'
          placeholderTextColor= '#1E2022'
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