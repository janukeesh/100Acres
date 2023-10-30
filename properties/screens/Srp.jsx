import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchSearchedProperties} from '../store/services';

const Srp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSearchedProperties());
  }, []);
  console.log('SRPPP');
  return (
    <View>
      <Text style={{color: 'red'}}>Srp</Text>
      <Text>Srp</Text>
      <Text>Srp</Text>
      <Text>Srp</Text>
    </View>
  );
};

export default Srp;

const styles = StyleSheet.create({});
