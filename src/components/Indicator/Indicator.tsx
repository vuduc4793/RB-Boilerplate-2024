import React from "react"
import { ActivityIndicator, View } from "react-native"

import styles from "./styles"
import { Props } from "./types"
import { colors } from "@/theme"

const Indicator = (props: Props) => {
  return (
    <View style={[styles.dialog, props.containerStyle]}>
      <View style={styles.wrapDialog}>
        <View style={[styles.wrapLoading, props.wrapLoading]}>
          <ActivityIndicator size={props.size || "small"} color={props.color || colors.palette.neutral100} />
        </View>
      </View>
    </View>
  )
}

export default Indicator
