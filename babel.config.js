module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: { '@': './src' },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    ],
    [
      'inline-dotenv',
      {
        path: '.env',
        systemVars: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
