module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: ["BASE_URL","URL_PREFIX","STORAGE_PATH","INSTAGRAM_API","INSTAGRAM_API_VERSION","INSTAGRAM_APP_ID","INSTAGRAM_SECRET_KEY","WEBSITE"],
        safe: false,
        allowUndefined: false,
      },
    ],
  ],
};
