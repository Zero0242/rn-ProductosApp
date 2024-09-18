module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      // Configuraciones de entorno
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
    // Esta seccion habilita el plugin de native wind
    ['nativewind/babel'],
  ]
};
