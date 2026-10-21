import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChat } from '../ChatContext';
import { s } from './styles';
export default function LoginScreen() {
  const { login } = useChat();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  function submit() {
    if (!email.trim() || !password.trim()) {
      setError('Vui lòng nhập tài khoản và mật khẩu.');
      return;
    }
    setError('');
    login(email);
  }
  return (
    <SafeAreaView style={s.page}>
      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={s.login}
          keyboardShouldPersistTaps="handled"
        >
          <View style={s.logo}>
            <Text style={s.logoText}>u.</Text>
          </View>
          <Text style={s.brand}>UDU CHAT</Text>
          <View style={s.card}>
            <Text style={s.title}>Chào mừng trở lại</Text>
            <Text style={s.muted}>
              Demo: nhập tài khoản và mật khẩu bất kỳ.
            </Text>
            <Text style={s.label}>Tài khoản</Text>
            <TextInput
              style={s.input}
              placeholder="Nhập tài khoản"
              placeholderTextColor="#9297A7"
              autoCapitalize="none"
              autoComplete="username"
              value={email}
              onChangeText={setEmail}
              accessibilityLabel="Tài khoản"
            />
            <Text style={s.label}>Mật khẩu</Text>
            <View style={s.password}>
              <TextInput
                style={s.passwordInput}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#9297A7"
                secureTextEntry={!visible}
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={submit}
                accessibilityLabel="Mật khẩu"
              />
              <Pressable
                onPress={() => setVisible(!visible)}
                accessibilityRole="button"
              >
                <Text style={s.link}>{visible ? 'Ẩn' : 'Hiện'}</Text>
              </Pressable>
            </View>
            {!!error && (
              <Text accessibilityRole="alert" style={s.error}>
                {error}
              </Text>
            )}
            <Pressable
              style={s.button}
              accessibilityLabel="Đăng nhập"
              onPress={submit}
              accessibilityRole="button"
            >
              <Text style={s.buttonText}>Đăng nhập →</Text>
            </Pressable>
          </View>
          <Text style={s.footer}>
            Những cuộc trò chuyện hay bắt đầu từ đây.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
