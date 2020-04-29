import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import moment from "moment";
var momentHijri = require("moment-hijri");

const { width, height } = Dimensions.get('window')


export default class HijriCalendar extends Component {
  constructor() {
    super();
    this.state = {
      startOfMonth: "",
      endOfMonth: "",
      currentMonth: "",
      hookDate: "",
      loading: true
    }
  }
  componentDidMount() {
    let date = momentHijri();
    const newMonth = date.format("iMM-iYYYY");
    const monthStart = date.clone().startOf("iMonth").day("sunday");
    const monthEnd = date
      .clone()
      .endOf("iMonth")
      .day("saturday");
    this.setState({
      currentMonth: newMonth,
      hookDate: date,
      loading: false,
      startOfMonth: monthStart,
      endOfMonth: monthEnd
    });
  }

  isToday(date) {
    let today = momentHijri()
    today = today.format("iD-iMM")
    return today == date;
  }

  isCurrentMonth(date) {
    let today = momentHijri(this.state.hookDate).format("iMM");
    return today == date.split("-")[1];
  }

  getMonthName(month) {
    let monthName = ""
    switch (parseInt(month)) {
      case 1:
        monthName = 'Muharram';
        break;
      case 2:
        monthName = 'Safar';
        break;
      case 3:
        monthName = 'Rabi ul Awwal';
        break;
      case 4:
        monthName = 'Rabi ul Thani';
        break;
      case 5:
        monthName = 'Jamadi ul Awwal';
        break;
      case 6:
        monthName = 'Jamadi ul Thani';
        break;
      case 7:
        monthName = 'Rajab';
        break;
      case 8:
        monthName = 'Shaban';
        break;
      case 9:
        monthName = "Ramzan";
        break;
      case 10:
        monthName = 'Shawwal';
        break;
      case 11:
        monthName = 'ZilAqad';
        break;
      case 12:
        monthName = 'Zilhijjah';
        break;
    }
    return monthName;
  }
  getLoader() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  render() {
    let dayNames = ["S", "M", "T", "W", "T", "F", "S"];
    let days = [];
    for (
      let i = momentHijri(this.state.startOfMonth);
      i < momentHijri(this.state.endOfMonth);
      i = momentHijri(i).add("1", "days")
    ) {
      days.push(i.format("iD-iMM"));
    }
    let dates = [...dayNames, ...days];
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.yearName}>{this.state.currentMonth.split("-")[1]}</Text>
          <Text style={styles.monthName}>{this.getMonthName(this.state.currentMonth.split("-")[0])}</Text>
        </View>
        <View style={styles.calendar}>
          <FlatList
            data={dates}
            renderItem={({ item, index }) => <Text style={index > 6 ?
              (this.isCurrentMonth(item) ?
                (this.isToday(item) ? styles.today : styles.numbers)
                : styles.otherMonth)
              : styles.dayNameItem}>
              {index > 6 ? item.split('-')[0] : item}</Text>}
            keyExtractor={(item, index) => index.toString()}
            numColumns={7}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#7875ff',
    marginTop: 24
  },
  numbers: {
    padding: width / 20.83,
    borderRadius: 5,
    color: '#939393',
    width: width / 7.15,
    textAlign: 'center'
  },
  today: {
    padding: width / 20.83,
    borderRadius: 100,
    color: '#FFFFFF',
    width: width / 7.15,
    textAlign: 'center',
    backgroundColor: '#7875ff'
  },
  dayNameItem: {
    padding: width / 20.83,
    borderRadius: 5,
    color: '#000000',
    width: width / 7.15,
    textAlign: 'center',
    fontWeight: "bold"
  },
  monthName: {
    fontSize: 36,
    color: '#ffffff',
    fontWeight: "bold"
  },
  yearName: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: "bold"
  },
  otherMonth: {
    padding: width / 20.83,
    borderRadius: 5,
    color: '#d9def8',
    width: width / 7.15,
    textAlign: 'center'
  },
  header: {
    backgroundColor: '#7875ff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: height / 4,
    paddingLeft: width / 24
  },
  calendar: {
    backgroundColor: '#FFF',
    height: 3* (height/4),
    paddingTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  }
});
