import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { ProductType } from '@/types/type'
import ImageSlider from '@/components/ImageSlider'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
type Props = {

}
const ProductDetails = (props: Props) => {
    const {id} = useLocalSearchParams();
    const [products, setProducts] = useState<ProductType>()
    useEffect(() => {
        getProductDetails();
    },[])
    const getProductDetails = async() =>{
    const URL = `http://192.168.119.229:8000/saleProducts/${id}`
    const response = await axios.get(URL);
    setProducts(response.data);
    }
  return (
    <ScrollView >
    {products && (<ImageSlider imageList={products.images}/>)}
    {products && (
        <View style={styles.container}>
            <View style={styles.ratingWrapper}>
                <View>
                    <Ionicons name='star' size={20} color={"#D4AF37"}/>
                    <Text style={styles.rating}>4.7<Text>(123)</Text></Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name='heart-outline' size={20} color={Colors.black}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{products.title}</Text>
            <View style={styles.priceWrapper}>
                <Text style={styles.price}>${products.price}</Text>
                <View style={styles.priceDiscount}>
                    <Text style={styles.priceDiscountTxt}>6% Off</Text>
                </View>
                    <Text style={styles.oldPrice}>${products.price + 2}</Text>
            </View>
            <Text style={styles.description}>{products.description}</Text>
            <View style={styles.productVariationWrapper}>
                <View style={styles.productVariationType}>
                    <Text style={styles.productVariationTitle}>Color</Text>
                </View>
                <View style={styles.productVariationType}>
                    <Text style={styles.productVariationTitle}>Size</Text>
                </View>
            </View>
        </View>
        )}

    </ScrollView>
  )
}

export default ProductDetails;


const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
    },
    ratingWrapper:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:5
    },
    rating:{
        marginLeft:5,
        fontSize:14,
        fontWeight:'400',
        color:Colors.gray
    },
    title:{
        fontSize:20,
        fontWeight:'400',
        color:Colors.black,
        letterSpacing:0.6,
        lineHeight:32
    },
    priceWrapper:{
        flexDirection:'row',
        alignItems:"center",
        marginTop:10,
        gap:5,
    },
    price:{
        fontSize:18,
        fontWeight:"600",
        color:Colors.black
    },
    priceDiscount:{
        backgroundColor:Colors.extraLightGray,
        padding:5,
        borderRadius:5
    },
    priceDiscountTxt:{
        fontSize:14,
        fontWeight:"400",
        color: Colors.primary
    },
    oldPrice:{
        fontSize:14,
        fontWeight:"400",
        textDecorationLine:"line-through",
        color: Colors.gray
    },
    description:{
        marginTop:20,
        fontSize:14,
        fontWeight:"400",
        color: Colors.black,
        letterSpacing:0.6,
        lineHeight:24,
    },
    productVariationWrapper:{
        flexDirection: 'row',
        marginTop:20,
        flexWrap:'wrap',
    },
    productVariationType:{
        width:'50%',
        gap:5,
        marginBottom:10
    },
    productVariationTitle:{
        fontSize:16,
        fontWeight:'500',
        color:Colors.black
    }
})