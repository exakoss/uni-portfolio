import 'dotenv/config'

export default {
    "name": "uniportfolio-client",
    "slug": "uniportfolio-client",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "packagerOpts": {
      "sourceExts": [
        "ts",
        "tsx"
      ]
    },
    extra: {
      mainnetKey: process.env.ALCHEMY_MAINNET_KEY,
      kovanKey: process.env.ALCHEMY_KOVAN_KEY,
      rinkebyKey: process.env.ALCHEMY_RINKEBY_KEY
    }
  }
