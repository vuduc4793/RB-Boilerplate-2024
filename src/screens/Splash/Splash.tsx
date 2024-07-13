
import React, { useEffect } from "react"
import { View } from "react-native"

import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { Indicator } from "@/components"
import Routes from "@/navigators/Routes"

const Splash = () => {
  const navigator = useNavigation()

  useEffect(() => {
    // initSystem

    setTimeout(() => navigator.navigate(Routes.AUTH as never), 2000)
  }, [navigator])

  return <View style={styles.container}>{<Indicator />}</View>
}

export default Splash
