import React from 'react';
import { View, StyleSheet } from 'react-native'
import HijriCalendar from 'hijri-calendar'

export default function App() {
  return (
    <View syle={{flex:1}}>
      <HijriCalendar />
    </View>);
}
