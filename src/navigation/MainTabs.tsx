import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import ChatsScreen from '../screens/ChatsScreen';
import ContactScreen from '../screens/ContactScreen';
import NotiScreen from '../screens/NotiScreen';
import SettingScreen from '../screens/SettingScreen';
import type { TabRoutes } from './types';

const Tab = createBottomTabNavigator<TabRoutes>();
const icons = { Chat: '💬', Contact: '👥', Noti: '🔔', Setting: '⚙' };
function TabIcon({ name, color }: { name: keyof TabRoutes; color: string }) {
  return <Text style={[styles.icon, { color }]}>{icons[name]}</Text>;
}
function tabOptions({
  route,
}: {
  route: { name: keyof TabRoutes };
}): BottomTabNavigationOptions {
  return {
    headerShown: false,
    tabBarActiveTintColor: '#6658E8',
    tabBarInactiveTintColor: '#9297A7',
    tabBarStyle: styles.bar,
    tabBarLabelStyle: styles.label,
    tabBarHideOnKeyboard: true,
    tabBarButtonTestID: `tab-${route.name}`,
    tabBarAccessibilityLabel: `Tab ${route.name}`,
    tabBarIcon: ({ color }) => <TabIcon name={route.name} color={color} />,
  };
}
export default function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Chat" screenOptions={tabOptions}>
      <Tab.Screen
        name="Chat"
        component={ChatsScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: 'Danh bạ' }}
      />
      <Tab.Screen
        name="Noti"
        component={NotiScreen}
        options={{ title: 'Thông báo' }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{ title: 'Cài đặt' }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  icon: { fontSize: 24 },
  bar: { backgroundColor: '#FFF', borderTopColor: '#EAEBF2' },
  label: { fontSize: 12, fontWeight: '600' },
});
