import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootRoutes, TabRoutes } from '../navigation/types';
import { useChat } from '../ChatContext';
import Avatar from '../components/Avatar';
import { s } from './styles';
type Props = CompositeScreenProps<
  BottomTabScreenProps<TabRoutes, 'Contact'>,
  NativeStackScreenProps<RootRoutes, 'Main'>
>;
export default function ContactScreen({ navigation }: Props) {
  const { chats, openChat } = useChat();
  const [query, setQuery] = useState('');
  const contacts = chats
    .filter(
      chat =>
        ['1', '3', '4'].includes(chat.id) &&
        chat.name
          .toLocaleLowerCase('vi')
          .includes(query.trim().toLocaleLowerCase('vi')),
    )
    .sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  return (
    <SafeAreaView style={s.page} edges={['top', 'left', 'right']}>
      <View style={s.header}>
        <View>
          <Text style={s.brandSmall}>UDU CHAT</Text>
          <Text style={s.heading}>Danh bạ</Text>
        </View>
      </View>
      <View style={s.search}>
        <TextInput
          style={s.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Tìm kiếm danh bạ"
          placeholderTextColor="#9297A7"
          accessibilityLabel="Tìm kiếm danh bạ"
        />
      </View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>Bạn bè</Text>
        <Text style={s.muted}>{contacts.length} liên hệ</Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={s.empty}>Không tìm thấy liên hệ.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={s.chatRow}
            accessibilityRole="button"
            accessibilityLabel={`Nhắn tin ${item.name}`}
            onPress={() => {
              openChat(item.id);
              navigation.navigate('Detail', { chatId: item.id });
            }}
          >
            <Avatar chat={item} />
            <View style={s.flex}>
              <Text style={s.name}>{item.name}</Text>
              <Text style={s.status}>
                {item.online ? '● Đang hoạt động' : '○ Ngoại tuyến'}
              </Text>
            </View>
            <Text style={s.link}>Nhắn tin</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
