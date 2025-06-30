import {View, Text,Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function AddNewMedication(){
    const router = useRouter();
    return (
        <View>
            <Image source={require('./../assets/images/consult.png')}
            style={{
                height:280,
                width:'100%'
            }}
            />
            <TouchableOpacity style={{
                position:'absolute',
                padding:25
            }}
            onPress={()=>router.back()}
            > 
            <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}