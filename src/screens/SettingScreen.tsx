import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChat } from '../ChatContext';
import { s } from './styles';

function ProfileField({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.field, !last && styles.fieldBorder]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text selectable style={styles.fieldValue}>
        {value}
      </Text>
    </View>
  );
}

export default function SettingScreen() {
  const { logout, account } = useChat();
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account)
    ? account
    : 'Chưa cập nhật';
  return (
    <SafeAreaView style={s.page} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={s.brandSmall}>UDU CHAT</Text>
          <Text style={s.heading}>Hồ sơ cá nhân</Text>
          <Text style={styles.subtitle}>Thông tin của bạn trên UDU Chat</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.cover} />
          <View style={styles.profileBody}>
            <View style={styles.avatarRing}>
              <Image
                source={require('../assets/avatar-1.png')}
                style={styles.avatar}
                accessibilityLabel="Ảnh đại diện cá nhân"
              />
              <View style={styles.onlineDot} />
            </View>
            <Text style={styles.displayName}>{account}</Text>
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Đang hoạt động</Text>
            </View>
            <Text style={styles.bio}>Một lời chào, mở ra ngàn câu chuyện.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        <View style={styles.infoCard}>
          <ProfileField label="Tài khoản" value={account} />
          <ProfileField label="Email" value={email} />
          <ProfileField label="Số điện thoại" value="Chưa cập nhật" />
          <ProfileField label="Ngày sinh" value="Chưa cập nhật" last />
        </View>

        <Text style={styles.sectionTitle}>Giới thiệu</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            Chào mừng bạn đến với UDU Chat. Kết nối với bạn bè và chia sẻ những
            câu chuyện mỗi ngày.
          </Text>
          <Text style={styles.demoNote}>
            Ảnh đại diện và giới thiệu là nội dung mẫu.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          accessibilityRole="button"
          accessibilityLabel="Đăng xuất từ cài đặt"
          onPress={() =>
            Alert.alert('Đăng xuất?', 'Dữ liệu demo sẽ được đặt lại.', [
              { text: 'Hủy', style: 'cancel' },
              { text: 'Đăng xuất', style: 'destructive', onPress: logout },
            ])
          }
        >
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
        <Text style={styles.version}>UDU Chat · Phiên bản 1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24, paddingBottom: 32 },
  header: { marginBottom: 24 },
  subtitle: { fontSize: 14, color: '#7E8297', marginTop: 8 },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EAEBF2',
  },
  cover: { height: 84, backgroundColor: '#E8E3FC' },
  profileBody: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  avatarRing: {
    marginTop: -44,
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 52,
  },
  avatar: { width: 86, height: 86, borderRadius: 43 },
  onlineDot: {
    position: 'absolute',
    bottom: 7,
    right: 7,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#39AE82',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  displayName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#242439',
    marginTop: 14,
    textAlign: 'center',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EAF7F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#25845F',
  },
  statusText: { color: '#25845F', fontSize: 12, fontWeight: '600' },
  bio: {
    color: '#7E8297',
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#242439',
    marginTop: 26,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#EAEBF2',
  },
  field: { paddingVertical: 16 },
  fieldBorder: { borderBottomWidth: 1, borderBottomColor: '#F0F1F6' },
  fieldLabel: { fontSize: 12, color: '#7E8297', marginBottom: 7 },
  fieldValue: {
    fontSize: 15,
    color: '#34364F',
    fontWeight: '500',
    lineHeight: 22,
  },
  aboutCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EAEBF2',
  },
  aboutText: { color: '#60647B', fontSize: 14, lineHeight: 23 },
  demoNote: { fontSize: 11, color: '#9297A7', lineHeight: 18, marginTop: 12 },
  logoutButton: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1D6DD',
    backgroundColor: '#FFF5F7',
    marginTop: 28,
  },
  logoutText: { color: '#BD425D', fontSize: 15, fontWeight: '700' },
  version: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9297A7',
    marginTop: 20,
  },
});
