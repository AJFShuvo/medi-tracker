import { View, Text,StyleSheet,TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'
export default function SignUp() {
    const router = useRouter();
  return (
   <View style={{
           padding:25
       }}>
         <Text style= {styles.textHeader}>Create New Account</Text>
         <View>
           <Text>Full Name</Text>
           <TextInput placeholder = 'Full Name'style = {styles.textInput}/>
         </View>
         <View>
           <Text>Email</Text>
           <TextInput placeholder = 'Email'style = {styles.textInput}/>
         </View>
         <View>
           <Text>Password</Text>
           <TextInput placeholder = 'Password'
           secureTextEntry={true}
           style = {styles.textInput}/>
         </View>
         <TouchableOpacity style={styles.button}> 
           <Text style = {{
               fontSize:17,
               color:'white',
               textAlign:'center'
           }}>Create Account</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.buttonCreate}
           onPress={()=>router.push('login/signIn')}
         > 
           <Text style = {{
               fontSize:17,
               color:Colors.PRIMARY,
               textAlign:'center'
           }}>Already Account? Sign In</Text>
         </TouchableOpacity>
       </View>
  )
}

const styles = StyleSheet.create({
    textHeader:{
        fontSize:30,
        fontWeight:'bold',
        marginTop:15
    },
    subText:{
        fontSize:30,
        fontWeight:'bold',
        marginTop:10,
        color:Colors.GRAY
    },
    textInput:{
        padding:10,
        borderWidth:1,
        fontSize:17,
        borderRadius:10,
        marginTop:5,
        backgroundColor:'white'
    },
    button:{
        padding:20,
        backgroundColor:Colors.PRIMARY,
        borderRadius:10,
        marginTop:35
    },
    buttonCreate:{
        padding:20,
        backgroundColor:'white',
        borderRadius:10,
        marginTop:20,
        borderWidth:1,
        borderColor:Colors.PRIMARY
    }
})