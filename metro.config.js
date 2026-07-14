// Learn more: https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Allow the tanpura widget's local HTML file to be bundled as an asset
// and loaded via require() inside a WebView.
config.resolver.assetExts.push("html");

module.exports = config;
