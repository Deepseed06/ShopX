import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { ProductType } from '@/types/type'
import ProductItem from './ProductItem'
type Props = {
products:ProductType[];
}
const FlashSale = ({products}: Props) => {
    const saleEndDate = new Date();
    saleEndDate.setDate(saleEndDate.getDate() + 2);
    // saleEndDate.setFullYear(2024, 9, 2) for setting for october
    saleEndDate.setHours(23, 59, 59);
    const [timeUnits, setTimeUnits] = useState({
        days:0,
        hours:0,
        minutes:0,
        seconds:0
    })
    useEffect(() => {
        const calculateTimeUnits = (timeDifference: number) =>{
            const seconds = Math.floor(timeDifference/1000);
            setTimeUnits({
                days: Math.floor((seconds % (365 * 24 * 60 * 60)) / (24*60*60)),
                hours: Math.floor((seconds % (24*60*60)) / (60*60)),
                minutes: Math.floor((seconds % (60*60)) / 60),
                seconds: seconds % 60
            })
        };
        const updateCountDown = () => {
            const currentDate = new Date().getTime();
            const expiryTime = saleEndDate.getTime();
            const timeDifference = expiryTime - currentDate;

            if(timeDifference <= 0) {
                calculateTimeUnits(0);
            }else{
                calculateTimeUnits(timeDifference)
            }
        }

        updateCountDown();
        const interval = setInterval(updateCountDown,1000);
        return () => clearInterval(interval)
    },[])

    const formatTime = (time : number) => {
        return time.toString().padStart(2, "0");
    }
  return (
    <View style={styles.container}>
       <View style={styles.titleWrapper}>
        <View style={styles.timerWrapper}>
            <Text style={styles.title}>Flash Sales</Text>
            <View style={styles.timer}>
            <Ionicons name='time-outline' size={16} color={Colors.black}/>
            <Text style={styles.timerTxt}>
            {`${formatTime(timeUnits.days)}:${formatTime(timeUnits.hours)}:${formatTime(timeUnits.minutes)}:${formatTime(timeUnits.seconds)}`}</Text>
            </View>
        </View>
      <TouchableOpacity>
        <Text style={styles.titleBtn}>See All</Text>
      </TouchableOpacity>
      </View>
      <FlatList 
      data={products} 
      keyExtractor={(item) => item.id.toString()}
      horizontal
      contentContainerStyle={{marginLeft:20,paddingRight:20}}
      showsHorizontalScrollIndicator={false}
      renderItem={({index, item}) => (
        <View style={{marginRight:20}}>
            <ProductItem index={index} item={item}/>
        </View>
      )
    }
      />
    </View>
  )
}

export default FlashSale

const styles = StyleSheet.create({
    container:{
        marginBottom:20
    },
    titleWrapper:{
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom:20,
        marginHorizontal:20,
    
      },
      title:{
        fontSize:18,
        fontWeight:'600',
        letterSpacing:0.6,
        color:Colors.black,
      },
      titleBtn:{
        fontSize:14,
        fontWeight:'500',
        letterSpacing:0.6,
        color:Colors.black,
      },
      itemImg:{
        width: 50,
        height:50,
        borderRadius:30,
        backgroundColor:Colors.lightGray
      },
      item:{
        marginVertical:10,
        gap:5,
        alignItems:'center',
        marginLeft:20
      },
      timerWrapper:{
        flexDirection:'row',
        alignItems:"center"
      },
      timer:{
        flexDirection:'row',
        gap:5,
        backgroundColor:Colors.highlight,
        paddingHorizontal:8,
        paddingVertical:5,
        borderRadius:12
      },
      timerTxt:{
        color:Colors.black,
        fontWeight:'500'
      }
})