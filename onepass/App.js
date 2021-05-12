import React from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './index';
import {Provider} from 'react-redux'
import {store} from './Redux/globalReducer'


export default function App() {
  return (
    <Provider store={store}>
    <Navigator/>
    </Provider>
  );
} 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1E2022',
//     alignItems: 'center',
//   }
// });