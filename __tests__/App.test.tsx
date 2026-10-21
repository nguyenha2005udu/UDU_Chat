import React from 'react';
import { Alert, TextInput, Switch } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-safe-area-context', () => ({
  ...require('react-native-safe-area-context/jest/mock').default,
  SafeAreaView: require('react-native').View,
}));

let renderer: ReactTestRenderer.ReactTestRenderer;
afterEach(async () => {
  await act(() => renderer?.unmount());
  jest.restoreAllMocks();
});
async function renderApp() {
  await act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });
}
async function input(label: string, value: string) {
  const field = renderer.root
    .findAllByType(TextInput)
    .find(node => node.props.accessibilityLabel === label);
  expect(field).toBeDefined();
  await act(() => field!.props.onChangeText(value));
}
async function press(label: string) {
  const button = renderer.root
    .findAll(node => typeof node.props.onPress === 'function')
    .find(node => node.props.accessibilityLabel === label);
  expect(button).toBeDefined();
  await act(() => button!.props.onPress());
}
function text() {
  return renderer.root
    .findAll(node => String(node.type) === 'Text')
    .map(node =>
      node.children.filter(child => typeof child === 'string').join(''),
    )
    .join('\n');
}

test('requires nonempty credentials and opens Home and all four tabs', async () => {
  await renderApp();
  await press('Đăng nhập');
  expect(text()).toContain('Vui lòng nhập tài khoản và mật khẩu.');
  await input('Tài khoản', '   ');
  await input('Mật khẩu', '123456');
  await press('Đăng nhập');
  expect(text()).toContain('Vui lòng nhập tài khoản và mật khẩu.');
  await input('Tài khoản', 'demo');
  await press('Đăng nhập');
  expect(text()).toContain('Tất cả hội thoại');
  await press('Tab Contact');
  expect(text()).toContain('Danh bạ');
  await press('Tab Noti');
  expect(text()).toContain('Thông báo');
  await press('Tab Setting');
  expect(text()).toContain('Hồ sơ cá nhân');
  expect(text()).toContain('Thông tin cá nhân');
  expect(text()).toContain('Số điện thoại');
  await press('Tab Chat');
  expect(text()).toContain('Tất cả hội thoại');
});

test('searches, opens a chat, sends text and resets session on logout', async () => {
  await renderApp();
  await input('Tài khoản', 'demo');
  await input('Mật khẩu', '123456');
  await press('Đăng nhập');
  await input('Tìm kiếm cuộc trò chuyện', 'không tồn tại');
  expect(text()).toContain('Không tìm thấy cuộc trò chuyện.');
  await input('Tìm kiếm cuộc trò chuyện', '');
  await press('Mở chat Minh Anh');
  const send = () =>
    renderer.root
      .findAll(node => typeof node.props.onPress === 'function')
      .find(n => n.props.accessibilityLabel === 'Gửi tin nhắn')!;
  expect(send().props.disabled).toBe(true);
  await input('Nội dung tin nhắn', '  Tin nhắn kiểm thử  ');
  expect(send().props.disabled).toBe(false);
  await press('Gửi tin nhắn');
  expect(text()).toContain('Tin nhắn kiểm thử');
  expect(
    renderer.root
      .findAllByType(TextInput)
      .find(n => n.props.accessibilityLabel === 'Nội dung tin nhắn')!.props
      .value,
  ).toBe('');
  await press('Quay lại');
  expect(text()).toContain('Tin nhắn kiểm thử');
  const alert = jest.spyOn(Alert, 'alert');
  await press('Tab Setting');
  expect(text()).toContain('demo');
  await press('Đăng xuất từ cài đặt');
  await act(() => alert.mock.calls[0][2]![1].onPress!());
  expect(text()).toContain('Chào mừng trở lại');
  expect(text()).not.toContain('Tin nhắn kiểm thử');
});

test('contact search opens the matching conversation and notifications can be read', async () => {
  await renderApp();
  await input('Tài khoản', 'tester');
  await input('Mật khẩu', 'secret');
  await press('Đăng nhập');
  await press('Tab Contact');
  await input('Tìm kiếm danh bạ', 'không tồn tại');
  expect(text()).toContain('Không tìm thấy liên hệ.');
  await input('Tìm kiếm danh bạ', 'Hoàng Nam');
  await press('Nhắn tin Hoàng Nam');
  expect(text()).toContain('Cảm ơn bạn, hẹn gặp lại!');
  await press('Quay lại');
  await press('Tab Noti');
  expect(text()).toContain('2 thông báo chưa đọc');
  await press('Đánh dấu đã đọc 1');
  expect(text()).toContain('1 thông báo chưa đọc');
  const toggle = renderer.root
    .findAllByType(Switch)
    .find(
      node =>
        node.props.accessibilityLabel === 'Chỉ hiển thị thông báo chưa đọc',
    )!;
  await act(() => toggle.props.onValueChange(true));
  expect(text()).not.toContain('Chào mừng đến UDU Chat');
  await press('Đọc tất cả thông báo');
  expect(text()).toContain('Không có thông báo chưa đọc.');
});
