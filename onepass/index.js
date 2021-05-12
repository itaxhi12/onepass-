import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Register from './Register';
import Login from './Login';
import Bottomnavbar from './Bottomnavbar'
import Test from './Test'
const screens={
  // Test:{
  //   screen:Test,
  //   navigationOptions: {
  //     headerShown: false,
  //   }
  // },
  Login:{
    screen:Login,
    navigationOptions: {
      headerShown: false,
    }
  },
  Register:{
    screen:Register,
    navigationOptions: {
      headerShown: false,
    }
  },
  Bottomnavbar:{
    screen:Bottomnavbar,
    navigationOptions: {
      headerShown: false,
    }
  },
}

const Homestack = createStackNavigator(screens);
export default createAppContainer(Homestack);