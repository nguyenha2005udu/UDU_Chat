import React from 'react';
import { Alert, TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChat } from '../ChatContext';
import { s } from './styles';
export default function SettingScreen() {
  const { logout, account } = useChat();
  return (
    <SafeAreaView style={s.page} edges={['top', 'left', 'right']}>
      <View style={s.header}>
        <View>
          <Text style={s.brandSmall}>UDU CHAT</Text>
          <Text style={s.heading}>Cài đặt</Text>
        </View>
      </View>
      <View style={s.chatRow}>
        <View>
          <Text style={s.name}>{account}</Text>
          <Text style={s.status}>Tài khoản đang đăng nhập · Chế độ demo</Text>
        </View>
      </View>
      <View style={s.chatRow}>
        <View>
          <Text style={s.name}>UDU Chat</Text>
          <Text style={s.status}>Phiên bản 1.0 · Giao diện tiếng Việt</Text>
        </View>
      </View>
      <View style={s.header}>
        <TouchableOpacity
          style={s.button}
          accessibilityRole="button"
          accessibilityLabel="Đăng xuất từ cài đặt"
          onPress={() =>
            Alert.alert('Đăng xuất?', 'Dữ liệu demo sẽ được đặt lại.', [
              { text: 'Hủy', style: 'cancel' },
              { text: 'Đăng xuất', style: 'destructive', onPress: logout },
            ])
          }
        >
          <Text style={s.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
