import { useNavigation } from "@react-navigation/native"
import React, { useEffect } from "react"
import Routes from "@/navigators/Routes"
import { Keyboard, Pressable, SafeAreaView, Text } from "react-native"

import styles from "./styles"

const Login = () => {
  const navigator = useNavigation()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      //
    })
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      //
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          navigator.navigate(Routes.MAIN as never)
        }}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "lightskyblue" : "white",
        })}
      >
        <Text>LOGIN</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default Login
