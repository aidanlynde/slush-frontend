// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add txt files to asset patterns
config.resolver.assetExts.push('txt');

module.exports = config;