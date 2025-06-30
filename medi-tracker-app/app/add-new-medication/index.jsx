import {View,Text, ScrollView} from 'react-native';
import AddMedicationHeader from '../../components/AddMedicationHeader';
import React from 'react';
import AddMedicationForm from '../../components/AddMedicationForm';

export default function AddNewMedication(){
    return(
        <ScrollView>
            <AddMedicationHeader/>
            
            <AddMedicationForm/>
        </ScrollView>
    )
}