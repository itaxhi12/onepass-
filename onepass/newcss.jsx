import { Dimensions } from 'react-native';
const deviceWindow = Dimensions.get('window')
export const newcss ={
    scroll:{
        backgroundColor: '#F8F8FF',
        width: deviceWindow.width,
        height:deviceWindow.height,
        elevation:0,
      },
    background:{
        backgroundColor: '#F8F8FF',
        alignItems: 'center',
        height:deviceWindow.height,
        elevation:1,
      },
    header:{
        backgroundColor:'#5970ce',
        width: deviceWindow.width,
        height:(deviceWindow.height * 0.12),
        flexDirection:'row',
        elevation:2,
        position:'relative',
      },
      fakeheading:{
          flex:2,
          textAlign:'right',
          paddingRight:(deviceWindow.width * 0.167),
          elevation:0,
      },
      textheading:{
        position:'absolute',
        elevation:4
      },
      heading:{
        fontFamily: 'RobotoCondensed-Light',
        fontSize: 50,
        paddingTop:30,
        paddingBottom:8,
        color:'#F0FFFF',
      },
      addbutton:{
          flex:1,
          alignItems:'center',
          backgroundColor:'#6bf060',
          top:43,
          bottom:20,
          right:20,
          justifyContent:'center',
          height:(deviceWindow.height * 0.04),
          maxWidth:(deviceWindow.width * 0.20),
          borderRadius:5,
          borderWidth:0.5,
          elevation:10,
          shadowColor: 'rgba(0, 0, 0, 1)',
          shadowOpacity: 1,
          shadowRadius: 5 ,
          shadowOffset : { width: 1, height: 4},
      },
      addbuttontext:{
        fontFamily: 'RobotoCondensed-Light',
        fontSize: 20,
        color:'#F0FFFF',
      },
      screenview:{
        alignItems:'center',
        elevation:5,
      },
      datacard:{
        borderRadius:5,
        borderWidth:0.75,
        width:(deviceWindow.width * 0.89),
        height:(deviceWindow.height * 0.08),
        margin:'4.7%',
        backgroundColor:'#c3ccea',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOpacity: 0.8,
        shadowRadius: 5 ,
        shadowOffset : { width: 1, height: 4},
        elevation: 5,
        justifyContent: 'center',
      },
      datacardtext:{
        fontFamily: 'RobotoCondensed-Light',
        fontSize: 28,
      },
      overlay:{
        width:deviceWindow.width * 0.80,
        alignItems:'center',
        height:120,
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        position:'absolute',
        marginBottom:222,
      },
      overlaycard:{
        borderRadius:7,
          width:'85%',
          height:'8%',
          margin:'3%',
          backgroundColor:'#F0F5F9',
          alignItems: 'center',
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOpacity: 0.8,
          elevation: 6,
          shadowRadius: 10 ,
          justifyContent: 'center',
          shadowOffset : { width: 1, height: 13},
      },
      fieldname:{
        fontFamily: 'RobotoCondensed-Light',
        fontSize: 28,
        paddingLeft:deviceWindow.width * 0.045,
      },
      fieldinput:{
        marginLeft:deviceWindow.width * 0.045,
        borderWidth:1,
        width:deviceWindow.width * 0.85,
        maxWidth:deviceWindow.width * 0.85,
        // height:deviceWindow.height * 0.05,
        maxHeight:deviceWindow.height * 0.10,
        paddingLeft:10,
        paddingRight:10,
        fontFamily: 'RobotoCondensed-Light',
        fontSize: 18,
      },
      view_headerbg:{
        backgroundColor:'#5970ce',
        width: deviceWindow.width,
        height:(deviceWindow.height * 0.12),
        elevation:2,
        position:'relative',
      },
      editbackicon:{
        flex:1,
        paddingTop:43,
        paddingLeft:15,
      },
      view_headingtext:{
        fontFamily: 'RobotoCondensed-Light',
        fontSize: 40,
        paddingTop:38,
        paddingBottom:8,
        color:'#F0FFFF',
        flex:1,
      },
      view_headingview:{
        position:'absolute',
        elevation:4
      },
      view_actualheading:{
        position:'absolute',
        elevation:3,
        flexDirection:'row',
        height:(deviceWindow.height * 0.12),
        width: deviceWindow.width,
        justifyContent:'space-between',
      },
      editbutton:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#6bf060',
        top:43,
        bottom:20,
        right:15,
        justifyContent:'center',
        height:(deviceWindow.height * 0.04),
        maxWidth:(deviceWindow.width * 0.20),
        borderRadius:5,
        borderWidth:0.5,
        elevation:10,
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOpacity: 1,
        shadowRadius: 5 ,
        shadowOffset : { width: 1, height: 4},
    },
    editbuttontext:{
      fontFamily: 'RobotoCondensed-Light',
      fontSize: 25,
      color:'#F0FFFF',
    },
    submitbutton:{
      flex:1,
      alignItems:'center',
      backgroundColor:'#6bf060',
      top:43,
      bottom:20,
      right:15,
      justifyContent:'center',
      height:(deviceWindow.height * 0.04),
      maxWidth:(deviceWindow.width * 0.20),
      width:(deviceWindow.width * 0.20),
      borderRadius:5,
      borderWidth:0.5,
      elevation:10,
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOpacity: 1,
      shadowRadius: 5 ,
      shadowOffset : { width: 1, height: 4},
    },
    submitbuttontext:{
      fontFamily: 'RobotoCondensed-Light',
      fontSize: 25,
      color:'#F0FFFF',
    },
    cancelbutton:{
      flex:1,
      alignItems:'center',
      backgroundColor:'#F0FFFF',
      top:43,
      bottom:20,
      // right:20,
      left:15,
      justifyContent:'center',
      height:(deviceWindow.height * 0.04),
      maxWidth:(deviceWindow.width * 0.20),
      width:(deviceWindow.width * 0.20),
      borderRadius:5,
      borderWidth:0.5,
      elevation:10,
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOpacity: 1,
      shadowRadius: 5 ,
      shadowOffset : { width: 1, height: 4},
    },
    cancelbuttontext:{
      fontFamily: 'RobotoCondensed-Light',
      fontSize: 25,
      color:'#6bf060',
    },
    deletebuttonview:{
      maxWidth:deviceWindow.width,
      width:deviceWindow.width,
      alignItems:'center'
    },
    deletebutton:{
      flex:1,
      alignItems:'center',
      backgroundColor:'#fb4737',
      justifyContent:'center',
      height:(deviceWindow.height * 0.04),
      maxWidth:(deviceWindow.width * 0.20),
      width:(deviceWindow.width * 0.20),
      borderRadius:3,
      borderWidth:0.5,
      elevation:5,
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOpacity: 1,
      shadowRadius: 1 ,
      shadowOffset : { width: 1, height: 2},
    },
    deletebuttontext:{
      fontFamily: 'RobotoCondensed-Light',
      fontSize: 25,
      color:'#F0FFFF',
    },
}