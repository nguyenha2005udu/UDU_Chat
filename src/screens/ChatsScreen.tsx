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
  BottomTabScreenProps<TabRoutes, 'Chat'>,
  NativeStackScreenProps<RootRoutes, 'Main'>
>;
export default function ChatsScreen({ navigation }: Props) {
  const { chats, openChat } = useChat();
  const [query, setQuery] = useState('');
  const filtered = chats.filter(chat =>
    chat.name
      .toLocaleLowerCase('vi')
      .includes(query.trim().toLocaleLowerCase('vi')),
  );
  return (
    <SafeAreaView style={s.page} edges={['top', 'left', 'right']}>
      <View style={s.header}>
        <View>
          <Text style={s.brandSmall}>UDU CHAT</Text>
          <Text style={s.heading}>Home</Text>
        </View>
      </View>
      <View style={s.search}>
        <TextInput
          style={s.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Tìm kiếm cuộc trò chuyện"
          placeholderTextColor="#9297A7"
          accessibilityLabel="Tìm kiếm cuộc trò chuyện"
        />
      </View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>Tất cả hội thoại</Text>
        <Text style={s.muted}>{filtered.length} cuộc trò chuyện</Text>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={s.empty}>Không tìm thấy cuộc trò chuyện.</Text>
        }
        renderItem={({ item }) => {
          const last = item.messages[item.messages.length - 1];
          return (
            <TouchableOpacity
              style={s.chatRow}
              accessibilityRole="button"
              accessibilityLabel={`Mở chat ${item.name}`}
              onPress={() => {
                openChat(item.id);
                navigation.navigate('Detail', { chatId: item.id });
              }}
            >
              <Avatar chat={item} />
              <View style={s.flex}>
                <View style={s.row}>
                  <Text style={s.name}>{item.name}</Text>
                  <Text style={s.time}>{last?.time}</Text>
                </View>
                <View style={s.row}>
                  <Text
                    numberOfLines={1}
                    style={[s.preview, item.unread > 0 && s.unreadText]}
                  >
                    {last?.mine ? 'Bạn: ' : ''}
                    {last?.text}
                  </Text>
                  {item.unread > 0 && (
                    <View style={s.badge}>
                      <Text
                        accessibilityLabel={`${item.unread} tin nhắn chưa đọc`}
                        style={s.badgeText}
                      >
                        {item.unread}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
