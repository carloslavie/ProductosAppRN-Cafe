/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { ProductsContext } from '../context/ProductosContext';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { Logout } from '../components/Logout';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'>{}

export const ProductsScreen = ({navigation}:Props) => {
    const {products, loadProducts} = useContext(ProductsContext);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
            // <TouchableOpacity
            //     activeOpacity={0.8}
            //     style={{marginRight:10}}
            //     onPress={()=> navigation.navigate('ProductScreen', {})}
            // >
            //     <Text>Agregar</Text>
            // </TouchableOpacity>
            <Logout navigation={navigation}/>
        ),
      });
    }, []);

    const loadProductsFromBackend = async() => {
        setRefresh(true);
        await loadProducts();
        setRefresh(false);
    };
  return (
    <View
        style={{flex:1, marginHorizontal: 10}}
    >
        <FlatList
            data={products}
            keyExtractor={(p) => p._id}
            renderItem={({item})=>(
                <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=> navigation.navigate('ProductScreen', {
                    id: item._id,
                    name: item.nombre,
                })}
                >
                    <Text style={styles.productName}>{item.nombre}</Text>
                </TouchableOpacity>
            )}
            ItemSeparatorComponent={ () => (
                <View style={styles.itemsSeparator}/>
                )}
            refreshControl={
                <RefreshControl
                    refreshing = {refresh}
                    onRefresh={loadProductsFromBackend}
                />
            }
        />
    </View>
  );
};

const styles = StyleSheet.create({
    productName:{
        fontSize: 20,
    },
    itemsSeparator:{
        borderBottomWidth: 2,
        marginVertical: 5,
        borderBottomColor:'rgba(0,0,0,0.1)',
    },
});

