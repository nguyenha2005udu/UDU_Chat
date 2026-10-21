import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootRoutes } from '../navigation/types';
import type { Message } from '../data/chats';
import { useChat } from '../ChatContext';
import Avatar from '../components/Avatar';
import { s } from './styles';
export default function DetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootRoutes, 'Detail'>) {
  const { chats, send } = useChat();
  const chat = chats.find(c => c.id === route.params.chatId);
  const [draft, setDraft] = useState('');
  const list = useRef<FlatList<Message>>(null);
  if (!chat) {
    return (
      <SafeAreaView>
        <Text>Không tìm thấy hội thoại.</Text>
      </SafeAreaView>
    );
  }
  const submit = () => {
    if (draft.trim()) {
      send(chat.id, draft);
      setDraft('');
    }
  };
  return (
    <SafeAreaView style={s.page}>
      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={s.detailHeader}>
          <Pressable
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Quay lại"
          >
            <Text style={s.back}>‹</Text>
          </Pressable>
          <Avatar chat={chat} />
          <View style={s.flex}>
            <Text style={s.name}>{chat.name}</Text>
            <Text style={s.status}>
              {chat.online ? '● Đang hoạt động' : 'Ngoại tuyến'}
            </Text>
          </View>
        </View>
        <FlatList
          ref={list}
          data={chat.messages}
          keyExtractor={item => item.id}
          contentContainerStyle={s.messages}
          onContentSizeChange={() =>
            list.current?.scrollToEnd({ animated: true })
          }
          ListHeaderComponent={<Text style={s.date}>HỘI THOẠI DEMO</Text>}
          renderItem={({ item }) => (
            <View style={[s.message, item.mine ? s.mine : s.theirs]}>
              <Text style={[s.messageText, item.mine && s.white]}>
                {item.text}
              </Text>
              <Text style={[s.messageTime, item.mine && s.mineTime]}>
                {item.time}
                {item.mine ? '  ✓' : ''}
              </Text>
            </View>
          )}
        />
        <View style={s.composer}>
          <TextInput
            style={s.composeInput}
            multiline
            maxLength={2000}
            placeholder="Nhập tin nhắn…"
            placeholderTextColor="#9297A7"
            value={draft}
            onChangeText={setDraft}
            accessibilityLabel="Nội dung tin nhắn"
          />
          <Pressable
            style={[s.send, !draft.trim() && s.disabled]}
            disabled={!draft.trim()}
            onPress={submit}
            accessibilityRole="button"
            accessibilityLabel="Gửi tin nhắn"
          >
            <Text style={s.buttonText}>↑</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
