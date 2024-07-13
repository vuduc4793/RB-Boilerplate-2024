import React from "react"
import { SafeAreaView, Text } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

const Connect = () => {
  const navigator = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Text>Connect</Text>
    </SafeAreaView>
  )
}

export default Connect
