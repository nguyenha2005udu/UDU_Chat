# UDU Chat

Ứng dụng chat React Native CLI + TypeScript, dùng React Navigation native stack và bottom tabs. Dữ liệu mẫu cục bộ, không cần máy chủ.

## Màn hình và chức năng

1. **Đăng nhập**: tên ứng dụng, tài khoản, mật khẩu, hiện/ẩn mật khẩu. Từ chối trường trống hoặc chỉ có khoảng trắng. Nhập hai giá trị bất kỳ để vào Home (xác thực demo).
2. **Home**: danh sách chat có ảnh đại diện cục bộ, tên, tin gần nhất, giờ và số chưa đọc; tìm theo tên; mở chi tiết và xóa số chưa đọc khi mở.
3. **Danh bạ**: ảnh, tên, trạng thái trực tuyến; tìm kiếm và mở hội thoại tương ứng.
4. **Thông báo**: nội dung, giờ, trạng thái đọc; màu phân biệt chưa đọc; đánh dấu từng thông báo hoặc đọc tất cả; Switch lọc thông báo chưa đọc.
5. **Cài đặt**: tài khoản vừa đăng nhập, thông tin ứng dụng; đăng xuất quay về Login.

Màn phụ **Detail** mở từ Home hoặc Danh bạ: xem lịch sử, gửi tin cục bộ, tự cuộn cuối và quay lại. Không gửi tin chỉ có khoảng trắng.

Các trạng thái chỉ lưu trong bộ nhớ. Đăng xuất hoặc khởi động lại sẽ đặt lại dữ liệu demo. Giờ tin và trạng thái trực tuyến là dữ liệu minh họa, không có đồng bộ hoặc thông báo đẩy.

## Cấu trúc

- `App.tsx`: phiên đăng nhập, state chat, root stack.
- `src/ChatContext.ts`: context chung.
- `src/navigation/MainTabs.tsx`: Home, Danh bạ, Thông báo, Cài đặt.
- `src/screens/`: mỗi màn hình một file; `styles.ts` chứa style chung.
- `src/components/Avatar.tsx`, `src/assets/`: ảnh đại diện dùng Image.
- `src/data/`: dữ liệu chat và thông báo mẫu.
- `__tests__/App.test.tsx`: kiểm tra đăng nhập, tab, tìm kiếm, gửi tin, danh bạ, đọc thông báo và đăng xuất.

## Chạy

Node >= 22.11; Android Studio/SDK và JDK, hoặc macOS với Xcode/CocoaPods cho iOS.

```sh
npm install
npm start
```

Terminal khác cùng thư mục:

```sh
npm run android
```

Android: đặt ANDROID_HOME hoặc sdk.dir trong android/local.properties theo máy. File này không đưa vào Git. MainActivity đã cấu hình RNScreensFragmentFactory.

iOS lần đầu:

```sh
bundle install
cd ios
bundle exec pod install
cd ..
npm run ios
```

## Kiểm tra

```sh
npx tsc --noEmit
npm run lint
npm test -- --runInBand
```
