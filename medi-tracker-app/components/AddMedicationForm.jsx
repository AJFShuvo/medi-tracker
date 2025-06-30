import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {getLocalStorage} from '../service/Storage'
import Colors from '../constant/Colors';
import { TypeList, WhenToTake } from '../constant/Options';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { formatDateForText, FormatDate, formatTime, getDatesRange } from '../service/ConvertDateTime';
import {setDoc,doc} from "firebase/firestore";
import {db} from "../config/FirebaseConfig"
import {useRouter} from 'expo-router';
export default function AddMedicationForm() {
  const [formData, setFormData] = useState({});
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading,setLoading] = useState(false);

  const router = useRouter();
  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

   const SaveMedication = async () => {
  const docId = Date.now().toString();
  const user = await getLocalStorage('userDetail');

  // validate that EVERY required field is present
  if (
    !formData.name ||
    !formData.type ||
    !formData.dose ||
    !formData.startDate ||
    !formData.endDate ||
    !formData.reminder
  ) {
    Alert.alert('Enter all fields');
    return;
  }

    const dates = getDatesRange(formData?.startDate,formData?.endDate);
    console.log(dates);
  setLoading(true);
   
  try {
    await setDoc(doc(db, 'medication', docId), {
      ...formData,
      userEmail: user?.email,
      docId: docId,
      dates:dates
    });
    console.log('Data Saved')
    setLoading(false);
    Alert.alert('Great! ','Added Successfully',[{
      text:'OK',
      onPress:()=>router.push('(tabs)')
    }])  // give the user confirmation
  } catch (e) {
    setLoading(false);
    console.log('❌ Error saving medication:', e);
    Alert.alert('Error', 'Could not save medication. Please try again.');
  }
};

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.header}>Add New Medication</Text>

      <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="medkit-sharp" size={24} color="black" />
        <TextInput
          style={styles.textinput}
          placeholder="Medicine Name"
          onChangeText={(value) => onHandleInputChange('name', value)}
        />
      </View>

      <FlatList
        data={TypeList}
        horizontal
        style={{ marginTop: 5 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.inputGroup,
              { marginRight: 10 },
              { backgroundColor: item.name === formData?.type?.name ? Colors.PRIMARY : 'white' },
            ]}
            onPress={() => onHandleInputChange('type', item)}
          >
            <Text
              style={[
                styles.typetext,
                { color: item.name === formData?.type?.name ? 'white' : 'black' },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.inputGroup}>
        <Ionicons style={styles.icon} name="eyedrop-sharp" size={24} color="black" />
        <TextInput
          style={styles.textinput}
          placeholder="Dose Ex. 2, 5ml"
          onChangeText={(value) => onHandleInputChange('dose', value)}
        />
      </View>

      <View style={styles.inputGroup} >
        <Ionicons style={styles.icon} name="time-sharp" size={24} color="black" />
        <Picker 
          selectedValue={formData?.when}

          onValueChange={(itemValue) => onHandleInputChange('when', itemValue)}
          style={{ width: '90%' }}
          
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* Start and End Date */}
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <Ionicons name="calendar-sharp" size={24} color={Colors.PRIMARY} />
          <Text style={styles.text}>
            {formatDateForText(formData?.startDate) ?? 'Start Date'}
          </Text>
        </TouchableOpacity>
        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            value={
              formData?.startDate ? new Date(formData.startDate) : new Date()
            }
            onChange={(event) => {
              onHandleInputChange('startDate', FormatDate(event.nativeEvent.timestamp));
              setShowStartDate(false);
            }}
          />
        )}

        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}
        >
          <Ionicons name="calendar-sharp" size={24} color={Colors.PRIMARY} />
          <Text style={styles.text}>
            {formatDateForText(formData?.endDate) ?? 'End Date'}
          </Text>
        </TouchableOpacity>
        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            value={
              formData?.endDate ? new Date(formData.endDate) : new Date()
            }
            onChange={(event) => {
              onHandleInputChange('endDate', FormatDate(event.nativeEvent.timestamp));
              setShowEndDate(false);
            }}
          />
        )}
      </View>

      {/* Reminder Time Picker */}
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons name="timer-outline" size={24} color={Colors.PRIMARY} />
          <Text style={styles.text}>
            {formData?.reminder ? formatTime(formData.reminder) : 'Select Reminder Time'}
          </Text>
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <RNDateTimePicker
          mode="time"
          value={
            formData?.reminder ? new Date(formData.reminder) : new Date()
          }
          onChange={(event) => {
            setShowTimePicker(false);
            
              onHandleInputChange('reminder',FormatDate(event.nativeEvent.timestamp));
            
          }}
        />
      )}

      <TouchableOpacity style={styles.button} 
        onPress={SaveMedication}
      >
        {loading?<ActivityIndicator size={'large'} color={'white'}/>:
        <Text style={styles.buttontext}>Add New Medication</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    backgroundColor: 'white',
  },
  textinput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: Colors.GRAY,
  },
  typetext: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  dateInputGroup: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: '100%',
    marginTop: 25,
  },
  buttontext: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
  },
});
