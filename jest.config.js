module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-linear-gradient|react-native-vector-icons|@react-native-async-storage)',
  ],
};
