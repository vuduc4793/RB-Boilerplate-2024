
import { colors } from "@/theme"
import { width } from "@/utils"
import { StyleSheet } from "react-native"

export default StyleSheet.create({
  wrapDialog: {
    backgroundColor: colors.transparent,
    width: width * 0.9,
    alignItems: "center",
    borderRadius: 20,
  },
  dialog: {
    backgroundColor: colors.palette.overlay20,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 99,
  },
  wrapLoading: {
    backgroundColor: colors.palette.overlay20,
    padding: 30,
    borderRadius: 20,
  },
})
