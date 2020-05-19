import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button, FlatList, TouchableOpacity} from 'react-native';
import Colors from "../constants/Colors";
import {useSelector} from "react-redux";
import ProductItem from "../components/Items/ProductItem";
import {Ionicons} from '@expo/vector-icons';

const HomeScreen = props => {
    const productsList = useSelector(state => state.products.availableProducts);

    return (
        <View style={styles.screen}>
            <View style={styles.title}>
                <Text style={{fontSize: 20}}>LIST OF PRODUCTS</Text>
            </View>

            <FlatList
                data={productsList}
                keyExtractor={item => item.id}
                style={{width: "95%"}}
                numColumns={2}
                horizontail={false}
                renderItem={
                    ({item}) => (
                        <ProductItem
                            image={item.imageAdd}
                            title={item.title}
                            base_price={item.base_price}
                            onViewDetail={
                                () => props.navigation.navigate('ProductDetails', {product: item})
                            }
                        />
                    )
                }
            />
        </View>
    )
};

HomeScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Home',
        headerRight: () => (
            <TouchableOpacity onPress={() => navData.navigation.navigate('Profile')}>
                <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                    size={30}
                    color={Platform.OS === 'ios' ? Colors.primary : 'white'}
                    style={{marginRight: 15}}
                />
            </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    title: {
        margin: 20,
    }
});

export default HomeScreen;
