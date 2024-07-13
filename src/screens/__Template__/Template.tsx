import React from "react"
import { SafeAreaView, Text } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

const Template = () => {
  const navigator = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Text>Template</Text>
    </SafeAreaView>
  )
}

export default Template
