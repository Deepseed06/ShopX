import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { icon } from '@/constants/icons';
import { Colors } from '@/constants/Colors';

type Props = {
    onPress: Function;
    onLongPress: Function;
    isFocused: boolean;
    label: string;
    routeName: string;
};
const TabBarButton = (props: Props) => {
    const {onPress, onLongPress, isFocused, label, routeName} = props;
  return (
    <Pressable
     onPress={onPress}
     onLongPress={onLongPress}
     style={styles.tabbarBtn}
   >
    {
        routeName == 'cart' && (
            <View style={styles.badgeWrapper}>
                <Text style={styles.badgeText}>3</Text>
            </View>
        )
    }
    {icon[routeName]({
        
        color: isFocused ? Colors.primary: Colors.black,
    })}
     <Text style={{color: isFocused ? '#673ab7' : '#222', fontSize:10}}>
       {label}
     </Text>
   </Pressable>
  )
}

export default TabBarButton

const styles = StyleSheet.create({
    tabbarBtn: {
        flex:1,
        justifyContent: "center",
        alignItems: "center", 
    },
    badgeWrapper:{
        position: 'absolute',
        backgroundColor: Colors.highlight,
        top:-5,
        right:20,
        paddingVertical:2,
        paddingHorizontal:6,
        borderRadius:10,
        zIndex: 10,
    },
    badgeText:{
        color:Colors.black,
        fontSize:8
    }
})