const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [
    path.resolve(__dirname),
    'C:\\Users\\PMLS\\Downloads\\Banowabil Hackathon\\MeezanBankMobile',
    'M:\\'
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
