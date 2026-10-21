import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
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
const icons = {
  Chat: require('../assets/menu/chat.png'),
  Contact: require('../assets/menu/contact.png'),
  Noti: require('../assets/menu/notification.png'),
  Setting: require('../assets/menu/setting.png'),
};
function TabIcon({
  name,
  color,
  focused,
}: {
  name: keyof TabRoutes;
  color: string;
  focused: boolean;
}) {
  return (
    <View style={[styles.iconContainer, focused && styles.activeIcon]}>
      <Image
        source={icons[name]}
        style={[styles.icon, { tintColor: color }]}
        accessible={false}
      />
    </View>
  );
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
    tabBarIcon: ({ color, focused }) => (
      <TabIcon name={route.name} color={color} focused={focused} />
    ),
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
  icon: { width: 24, height: 24 },
  iconContainer: {
    width: 48,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: { backgroundColor: '#EFEDFF' },
  bar: { backgroundColor: '#FFF', borderTopColor: '#EAEBF2' },
  label: { fontSize: 12, fontWeight: '600' },
});
