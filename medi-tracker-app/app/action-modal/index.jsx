import {View,Text,Image,StyleSheet, Touchable, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams,useRouter } from 'expo-router';
import Colors from '../../constant/Colors';
import MedicationCardItem from '../../components/MedicationCarditem';
import {arrayUnion, doc,updateDoc} from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import moment from 'moment';
export default function MedicationActionModal(){
    const medicine = useLocalSearchParams();
    const router = useRouter();


    const UpdateActionStatus = async(status)=>{
        try{
            const docRef = doc(db,'medication',medicine?.docId);
            await updateDoc(docRef,{
                action:arrayUnion({
                    status: status,
                    time:moment().format('LT'),
                    date:medicine?.selectedDate
                })
            });
            Alert.alert(status,'Response Saved!',[
                {
                    text:'OK',
                    onPress:()=>router.replace('(tabs)')
                }
            ])
        }catch(e){

            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('./../../assets/images/notification.gif')}
                style={{
                    width:120,
                    height:120
                }}
            />
            <Text style={{fontSize:18}}>{medicine?.selectedDate}</Text>
            <Text style={{fontSize:30,fontWeight:'bold',color:Colors.PRIMARY}}>{medicine?.reminder}</Text>
            <Text style = {{fontSize:18}}>It's Time To take </Text>
        
            <MedicationCardItem medicine={medicine}/>
            <View style={styles.btncontainer}> 
                
                <TouchableOpacity style={styles.closebtn}
                    onPress={()=>UpdateActionStatus('Missed')}
                >
                    <Ionicons name="close-outline" size={24} color="red" />
                    <Text style={{
                        fontSize:20,
                        color:'red'
                    }}>Missed</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.successbtn}
                onPress={()=>UpdateActionStatus('Missed')}
                >
                    <Ionicons name="checkmark-outline" size={24} color='white' />
                    <Text style={{
                        fontSize:20,
                        color:'white'
                    }}>Taken</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                onPress={()=>router.back()}
            style={{
                position:'absolute',
                bottom:25
            }}>
                 <Ionicons name="close-circle" size={44} color={Colors.GRAY} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        padding:25,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        height:'100%'
    },
    btncontainer:{
        flexDirection:'row',
        gap:10,
        marginTop:25
    },
    closebtn:{
        padding:10,
        flexDirection:'row',
        gap:6,
        borderColor:'red',
        alignItems:'center',
        borderRadius:10,
        borderWidth:1,
        marginTop:30
    },
    successbtn:{
        padding:10,
        flexDirection:'row',
        gap:6,
        backgroundColor:Colors.LIGHT_GREEN,
        alignItems:'center',
        borderRadius:10,
        borderWidth:1,
        marginTop:30
    }
})