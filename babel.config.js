module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
        },
      ],
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
            '.json',
          ],
          root: ['./src'],
          alias: {
            '@atoms': './src/components/atoms',
            '@molecules': './src/components/molecules',
            '@organisms': './src/components/organisms',
            '@templates': './src/components/templates',
            '@screens': './src/screens',
            '@styles': './src/styles',
            '@utils': './src/utils',
            '@dto': './src/dto',
            '@services': './src/services',
            '@assets': './src/assets',
            '@hooks': './src/hooks',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
