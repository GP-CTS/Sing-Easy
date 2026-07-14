import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "@/theme/colors";

import { DashboardScreen } from "@/screens/DashboardScreen";
import { CourseScreen } from "@/screens/CourseScreen";
import { WarmupsScreen } from "@/screens/WarmupsScreen";
import { ShrutiScreen } from "@/screens/ShrutiScreen";
import { PlannerScreen } from "@/screens/PlannerScreen";
import { LibraryScreen } from "@/screens/LibraryScreen";

export type RootTabParamList = {
  Dashboard: undefined;
  Course: undefined;
  Warmups: undefined;
  Shruti: undefined;
  Planner: undefined;
  Library: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.bg,
    border: colors.line,
    primary: colors.gold,
    text: colors.ivory,
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.gold,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            backgroundColor: colors.bg,
            borderTopColor: colors.line,
          },
        }}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Course" component={CourseScreen} options={{ title: "30-Day Course" }} />
        <Tab.Screen name="Warmups" component={WarmupsScreen} options={{ title: "Warm-ups" }} />
        <Tab.Screen name="Shruti" component={ShrutiScreen} options={{ title: "Shruti" }} />
        <Tab.Screen name="Planner" component={PlannerScreen} options={{ title: "Planner" }} />
        <Tab.Screen name="Library" component={LibraryScreen} options={{ title: "My Content" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
