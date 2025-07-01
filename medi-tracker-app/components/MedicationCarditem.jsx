import { View, StyleSheet, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constant/Colors";
import { formatTime } from "../service/ConvertDateTime";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MedicationCardItem({
  medicine,
  selectedDate = ""
}) {
  // Convert Firestore Timestamp → JS Date
  const reminderDate = medicine.reminder?.toDate
    ? medicine.reminder.toDate()
    : new Date(medicine.reminder);

  const [status, setStatus] = useState(null);

  useEffect(() => {
    const actionsRaw = medicine.action;
    let actions = [];

    if (Array.isArray(actionsRaw)) {
      actions = actionsRaw;
    } else if (actionsRaw && typeof actionsRaw === 'object') {
      // convert map to array
      actions = Object.entries(actionsRaw).map(([date, data]) => ({ date, data }));
    }

    const found = actions.find(item => item.date === selectedDate);
    console.log('found action:', found);
    setStatus(found);
  }, [medicine, selectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: medicine.type.icon }}
            style={{ width: 60, height: 60 }}
          />
        </View>
        <View>
          <Text style={styles.nameText}>{medicine.name}</Text>
          <Text style={styles.whenText}>{medicine.when}</Text>
          <Text style={styles.doseText}>
            {medicine.dose} {medicine.type.name}
          </Text>
        </View>
      </View>

      <View style={styles.reminderContainer}>
        <Ionicons name="timer-outline" size={24} color="black" />
        <Text style={styles.timeText}>
          {formatTime(reminderDate)}
        </Text>
      </View>

      {status?.data && 
        <View style={styles.statusContainer}>
         {status?.status=='Taken'? <Ionicons name="checkmark-circle" size={24} color={Colors.GREEN} 
         />:
         status?.status=='Missed'&&
          <Ionicons name="close-circle" size={24} color='red' 
         />}
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 15,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  whenText: {
    fontSize: 17,
  },
  doseText: {
    color: 'white',
  },
  reminderContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 7,
  },
});
