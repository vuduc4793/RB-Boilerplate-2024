import React, { useEffect, useState } from "react"
import { SafeAreaView, Text } from "react-native"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { Indicator } from "../../components"

const Home = () => {
  const navigator = useNavigation()
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading && <Text>Home</Text>}
      {isLoading && <Indicator />}
    </SafeAreaView>
  )
}

export default Home
