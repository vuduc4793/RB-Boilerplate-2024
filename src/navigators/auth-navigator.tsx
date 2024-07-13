import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Routes from "./Routes"
import * as Screens from "../screens"


const Stack = createNativeStackNavigator()

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ gestureEnabled: false, headerShown: false }}>
    <Stack.Screen name={Routes.LOGIN} component={Screens.Login} />
  </Stack.Navigator>
)

export default AuthStack
