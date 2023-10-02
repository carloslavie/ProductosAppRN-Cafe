/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  Text,
  TextInput,
  Platform,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import {Background} from '../components/Background';
import {WhiteLogo} from '../components/WhiteLogo';
import {loginStyles} from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}:Props) => {

  const { signIn, errorMessage, removeError } = useContext(AuthContext);
  const {email,password, onChange} = useForm({
    email: '',
    password:'',
  });

  useEffect(() => {
    // eslint-disable-next-line curly
    if (errorMessage.length === 0) return;
    Alert.alert(
      'Login incorrecto',
      errorMessage,
      [
        {
          text:'ok',
          onPress:removeError,
        },
      ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  const onLogin = ()=> {
    console.log({email, password});
    Keyboard.dismiss();
    signIn({correo: email, password});
  };

  return (
    <>
      {/* background */}
      <Background />

      <KeyboardAvoidingView
        style={{
          flex:1,
        }}
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={loginStyles.formContainer}>
          {/* Keyboard avoid view */}
          <WhiteLogo />

          <Text style={loginStyles.title}>Login</Text>
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType="email-address"
            underlineColorAndroid={'white'}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor={'white'}
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={loginStyles.label}>Contraseña</Text>
          <TextInput
            placeholder="********"
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            // keyboardType="visible-password"
            underlineColorAndroid={'white'}
            secureTextEntry={true}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor={'white'}
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* BotonLogin */}
          <View style={loginStyles.bottomContainer}>
            <TouchableOpacity activeOpacity={0.8} style={loginStyles.boton} onPressIn={onLogin}>
              <Text style={loginStyles.botonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Crear Nueva Cuenta */}
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}
            >
              <Text style={loginStyles.botonText}>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
