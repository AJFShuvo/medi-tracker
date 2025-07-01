// components/MedicationList.jsx
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import EmptyState from './EmptyState';
import { GetDateRangeToDisplay } from '../service/ConvertDateTime';
import Colors from '../constant/Colors';
import moment from 'moment';
import { getLocalStorage } from '../service/Storage';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import MedicationCardItem from './MedicationCarditem';
import {useRouter} from 'expo-router'

export default function MedicationList() {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setDateRange(GetDateRangeToDisplay());
    fetchMedications(selectedDate);
  }, []);

  // When a new date is selected
  const onDatePress = (date) => {
    setSelectedDate(date);
    fetchMedications(date);
  };

  const fetchMedications = async (dateString) => {
    setLoading(true);
    setMedList([]);

    try {
      const user = await getLocalStorage('userDetail');
      if (!user?.email) throw new Error('User email not found');

      // Build date range for Firestore query
      const dayMoment = moment(dateString, 'MM/DD/YYYY');
      const startOfDay = Timestamp.fromDate(dayMoment.startOf('day').toDate());
      const endOfDay = Timestamp.fromDate(dayMoment.endOf('day').toDate());

      // Query: filter by userEmail AND reminder between start/end of selectedDate
      const q = query(
        collection(db, 'medication'),
        where('userEmail', '==', user.email),
        where('reminder', '>=', startOfDay),
        where('reminder', '<=', endOfDay)
      );

      const snap = await getDocs(q);
      const results = [];
      snap.forEach(doc => results.push({ id: doc.id, ...doc.data() }));
      setMedList(results);
    } catch (e) {
      console.error('Error fetching medications:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Image
        source={require('./../assets/images/medication.jpeg')}
        style={{ width: '100%', height: 150, borderRadius: 15 }}
      />

      <FlatList
        data={dateRange}
        horizontal
        style={{ marginTop: 15 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dateGroup,
              {
                backgroundColor:
                  item.formattedDate === selectedDate
                    ? Colors.PRIMARY
                    : Colors.LIGHT_GRAY_BORDER,
              },
            ]}
            onPress={() => onDatePress(item.formattedDate)}
          >
            <Text
              style={[
                styles.day,
                { color: item.formattedDate === selectedDate ? 'white' : 'black' },
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.date,
                { color: item.formattedDate === selectedDate ? 'white' : 'black' },
              ]}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />

      {medList?.length > 0 ? (
        <FlatList
          data={medList}
          keyExtractor={(item) => item.id}
          onRefresh={() => fetchMedications(selectedDate)}
          refreshing={loading}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>router.push({
              pathname:'/action-modal',
              params:{
                ...item,
                selectedDate:selectedDate
              }
            })}>
            <MedicationCardItem medicine={item} selectedDate={selectedDate} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateGroup: {
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
  },
  day: {
    fontSize: 20,
  },
  date: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
