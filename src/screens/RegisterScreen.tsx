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
import {WhiteLogo} from '../components/WhiteLogo';
import {loginStyles} from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}:Props) => {

const {removeError, errorMessage, signUp} = useContext(AuthContext);

  const {email,password, name, onChange} = useForm({
    name:'',
    email: '',
    password:'',
  });

  useEffect(() => {
    // eslint-disable-next-line curly
    if (errorMessage.length === 0) return;
    Alert.alert(
      'Registro incorrecto',
      errorMessage,
      [
        {
          text:'ok',
          onPress:removeError,
        },
      ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  const onRegister = ()=> {
    console.log({email, password, name});
    Keyboard.dismiss();
    signUp({
      nombre:name,
      correo:email,
      password,
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex:1, backgroundColor:'#5856D6'
        }}
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={loginStyles.formContainer}>
          {/* Keyboard avoid view */}
          <WhiteLogo />

          <Text style={loginStyles.title}>Registro</Text>
          <Text style={loginStyles.label}>Nombre</Text>
          <TextInput
            placeholder="Ingrese su nombre"
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'white'}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor={'white'}
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
            autoCapitalize="words"
            autoCorrect={false}
          />
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
            onSubmitEditing={onRegister}
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
            onSubmitEditing={onRegister}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* BotonRegister */}
          <View style={loginStyles.bottomContainer}>
            <TouchableOpacity activeOpacity={0.8} style={loginStyles.boton} onPressIn={onRegister}>
              <Text style={loginStyles.botonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={()=> navigation.replace('LoginScreen')}
            activeOpacity={0.8}
            style={loginStyles.buttonReturn}
          >
            <Text style={loginStyles.botonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
