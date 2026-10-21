import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { initialNotifications } from '../data/notifications';
import { s } from './styles';
export default function NotiScreen() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const unread = notifications.filter(item => !item.read).length;
  const filtered = notifications.filter(item => !unreadOnly || !item.read);
  return (
    <SafeAreaView style={s.page} edges={['top', 'left', 'right']}>
      <View style={s.header}>
        <View>
          <Text style={s.brandSmall}>UDU CHAT</Text>
          <Text style={s.heading}>Thông báo</Text>
        </View>
      </View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>{unread} thông báo chưa đọc</Text>
        <TouchableOpacity
          disabled={unread === 0}
          accessibilityRole="button"
          accessibilityLabel="Đọc tất cả thông báo"
          onPress={() =>
            setNotifications(items =>
              items.map(item => ({ ...item, read: true })),
            )
          }
        >
          <Text style={[s.link, unread === 0 && s.disabled]}>Đọc tất cả</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filter}>
        <Text style={s.muted}>Chỉ hiển thị chưa đọc</Text>
        <Switch
          accessibilityLabel="Chỉ hiển thị thông báo chưa đọc"
          value={unreadOnly}
          onValueChange={setUnreadOnly}
          trackColor={{ false: '#D9DCE8', true: '#6658E8' }}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={s.empty}>Không có thông báo chưa đọc.</Text>
        }
        renderItem={({ item }) => (
          <View style={[s.chatRow, !item.read && styles.unread]}>
            <View style={s.flex}>
              <Text style={s.name}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
              <View style={s.row}>
                <Text style={s.time}>{item.time}</Text>
                <Text style={[s.muted, !item.read && s.unreadText]}>
                  {item.read ? 'Đã đọc' : '● Chưa đọc'}
                </Text>
              </View>
              {!item.read && (
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={`Đánh dấu đã đọc ${item.id}`}
                  onPress={() =>
                    setNotifications(items =>
                      items.map(notification =>
                        notification.id === item.id
                          ? { ...notification, read: true }
                          : notification,
                      ),
                    )
                  }
                >
                  <Text style={s.link}>Đánh dấu đã đọc</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  unread: {
    backgroundColor: '#EFEDFF',
    borderLeftWidth: 3,
    borderLeftColor: '#6658E8',
  },
  body: { color: '#60647B', lineHeight: 21, marginVertical: 10 },
  filter: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
