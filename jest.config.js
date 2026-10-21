module.exports = {
  preset: '@react-native/jest-preset',
  watchman: false,
  transformIgnorePatterns: ['node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-screens|react-native-safe-area-context)/)'],
};
