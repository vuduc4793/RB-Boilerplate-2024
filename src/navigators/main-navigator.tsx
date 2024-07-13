import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import * as Screens from "../screens"
import Routes from "./Routes"
import { IcHome, IcHomeOutline, IcPlanet, IcPlanetOutline } from "../assets/icons"
import { colors } from "@/theme"
const Tab = createBottomTabNavigator()

export interface PropsTabBottom {
  name: string
  component: React.ComponentType<any>
  iconActive: React.ReactNode
  iconInactive: React.ReactNode
  color: string
  displayName: string
}

export const TAB_BOTTOM = (): PropsTabBottom[] => {
  return [
    {
      displayName: "Trang chủ",
      component: Screens.Home,
      iconActive: <IcHome width={24} height={24} />,
      iconInactive: <IcHomeOutline width={24} height={24} />,
      color: "#FFFFFF",
      name: Routes.HOME,
    },
    {
      displayName: "Kết nối",
      component: Screens.Connect,
      iconActive: <IcPlanet width={24} height={24} />,
      iconInactive: <IcPlanetOutline width={24} height={24} />,
      color: "#FFFFFF",
      name: Routes.CONNECT,
    },
  ]
}

const TabComponent = (props: PropsTabBottom, index: number) => {
  return (
    <Tab.Screen
      key={index.toString()}
      name={props.name}
      component={props.component}
      options={{
        headerShown: false,
        tabBarLabel: props.displayName,
        tabBarIcon: ({ color, focused }) => focused ? props.iconActive : props?.iconInactive,
      }}
      listeners={{
        focus: () => { },
      }}
    />
  )
}

const TabMainStack = () => {
  return <Tab.Navigator detachInactiveScreens={false}>{TAB_BOTTOM().map((item, index) => TabComponent(item, index))}</Tab.Navigator>
}

export default TabMainStack
