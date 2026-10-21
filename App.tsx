import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import DetailScreen from './src/screens/DetailScreen';
import MainTabs from './src/navigation/MainTabs';
import type { RootRoutes } from './src/navigation/types';
import { initialChats } from './src/data/chats';
import { ChatContext, type Session } from './src/ChatContext';
const Stack = createNativeStackNavigator<RootRoutes>();
export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [account, setAccount] = useState('');
  const [chats, setChats] = useState(initialChats);
  const value: Session = {
    chats,
    account,
    login: name => {
      setAccount(name.trim());
      setSignedIn(true);
    },
    logout: () => {
      setSignedIn(false);
      setAccount('');
      setChats(initialChats);
    },
    openChat: id =>
      setChats(items =>
        items.map(chat => (chat.id === id ? { ...chat, unread: 0 } : chat)),
      ),
    send: (id, text) =>
      setChats(items => {
        const chat = items.find(item => item.id === id);
        if (!chat || !text.trim()) {
          return items;
        }
        const message = {
          id: `${Date.now()}-${Math.random()}`,
          text: text.trim(),
          mine: true,
          time: new Date().toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        return [
          { ...chat, messages: [...chat.messages, message] },
          ...items.filter(item => item.id !== id),
        ];
      }),
  };
  return (
    <SafeAreaProvider>
      <ChatContext.Provider value={value}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {signedIn ? (
              <>
                <Stack.Screen name="Main" component={MainTabs} />
                <Stack.Screen name="Detail" component={DetailScreen} />
              </>
            ) : (
              <Stack.Screen name="Login" component={LoginScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ChatContext.Provider>
    </SafeAreaProvider>
  );
}
