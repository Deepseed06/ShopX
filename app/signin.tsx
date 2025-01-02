import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import InputField from '@/components/InputField'
import { Colors } from '@/constants/Colors'
import SocialLoginButtons from '@/components/SocialLoginButtons'

type Props = {}

const SignInScreen = (props: Props) => {
  return (
    <>
    <Stack.Screen options={{headerTitle:'Sign In', headerLeft: () =>(
      <TouchableOpacity onPress={() => {
        router.back()
      }}>
        <Ionicons name='close'/>
      </TouchableOpacity>
    ) }}/>
    <View style={styles.container}>
      
      <Text style={styles.title}>Login Your Account</Text>
      <InputField 
      placeholder='Email Address'
      placeholderTextColor={Colors.gray}
      autoCapitalize='none'
      keyboardType='email-address'
      />
      <InputField 
      placeholder='Password'
      placeholderTextColor={Colors.gray}
      secureTextEntry={true}
      />
      <InputField 
      placeholder='Confirm Password'
      placeholderTextColor={Colors.gray}
      secureTextEntry={true}
      />
      <TouchableOpacity style={styles.btn} onPress={() => {
        router.dismissAll();
        router.push('/(tabs)');
      }}>
        <Text style={styles.btnText}>
          Login
        </Text>
      </TouchableOpacity>
      <Text style={styles.loginTxt}>
            Don't have an account? {" "}
        <Link href={"/signup"} asChild>
        <TouchableOpacity>
          <Text style={styles.loginTxtSpan}>Sign Up</Text>
        </TouchableOpacity>
        </Link>
      </Text>
    <View style={styles.divider}/>
    
      <SocialLoginButtons emailHref={'/signin'}/>
    </View>
    </>
  )
}

export default SignInScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    backgroundColor:Colors.background
  },
  title:{
    fontSize:24,
    fontWeight:'600',
    letterSpacing:1.2,
    color:Colors.black,
    marginBottom:50
  },
  btn:{
    backgroundColor: Colors.primary,
    paddingVertical:14,
    paddingHorizontal:18,
    alignSelf:'stretch',
    alignItems:'center',
    borderRadius:5,
    marginBottom:20
  },
  btnText:{
    color:Colors.white,
    fontSize:16,
    fontWeight:'600'
  },
  loginTxt:{
    marginBottom:30,
    fontSize:14,
    color:Colors.black,
    lineHeight:22,
    
  },
  loginTxtSpan:{
    color:Colors.primary,
    fontWeight:'600',    
  },
  divider:{
    borderTopColor:Colors.gray,
    borderTopWidth:StyleSheet.hairlineWidth,
    width:'30%',
    marginBottom:30
  }
})