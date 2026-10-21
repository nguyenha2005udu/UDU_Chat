import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { Chat } from '../data/chats';
import { s } from '../screens/styles';
const images: Record<string, number> = {
  '1': require('../assets/avatar-1.png'),
  '2': require('../assets/avatar-2.png'),
  '3': require('../assets/avatar-3.png'),
  '4': require('../assets/avatar-4.png'),
  '5': require('../assets/avatar-5.png'),
};
export default function Avatar({ chat }: { chat: Chat }) {
  return (
    <View style={[s.avatar, { backgroundColor: chat.color }]}>
      <Image
        source={images[chat.id] ?? images['1']}
        style={styles.image}
        accessibilityLabel={`Ảnh đại diện ${chat.name}`}
      />
      {chat.online && <View style={s.dot} />}
    </View>
  );
}
const styles = StyleSheet.create({
  image: { width: 52, height: 52, borderRadius: 19 },
});
