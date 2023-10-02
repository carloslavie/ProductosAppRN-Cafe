/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {AuthContext} from '../context/AuthContext';

interface Props {
  navigation: any;
}
export const Logout = ({navigation}: Props) => {
  const {logOut} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Protected Screen</Text> */}
      <View style={{marginRight:15}}>
        <Button title="Logout" color={'#5856D6'} onPress={logOut} />
      </View>

      {/* <Text>{JSON.stringify(user, null, 5)}</Text>
      <Text>{token}</Text> */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={{marginRight: 10}}
        onPress={()=> navigation.navigate('ProductScreen', {})}>
        <Text>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
