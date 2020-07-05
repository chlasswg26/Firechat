<p align="center">
  <img alt="react-native-paper" src="https://i.imgur.com/uaslBWW.png" width="300">
</p>
<p align="center">
  Firechat name inspired from <strong>Enen no Shouboutai</strong>.<br/>
  <a href="https://myanimelist.net/anime/38671/Enen_no_Shouboutai">Fire Force</a>
</p>

[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://github.com/chlasswg26/)
![GitHub](https://img.shields.io/github/license/chlasswg26/Firechat?style=for-the-badge)
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/chlasswg26/Firechat/)
![GitHub last commit](https://img.shields.io/github/last-commit/chlasswg26/Firechat?style=for-the-badge)
![GitHub followers](https://img.shields.io/github/followers/chlasswg26?style=for-the-badge)

---

## Features

- Works on Android
- Maps (Show your location & contact location)
- Contact (Show contact)
- Realtime Chat

Currently supported React Native version: `>= 0.60.0`

## Requirements

* [`yarn`](https://yarnpkg.com/getting-started/install) or [`npm`](https://www.npmjs.com/)
* [`react-native`](https://facebook.github.io/react-native/docs/getting-started)
* `Google maps API Key` you can get it [here](https://developers.google.com/maps/documentation/javascript/get-api-key)
* `Config realtime database firebase for WEB` you can get it [here](https://firebase.google.com/)

## Initial setup

Open `.ENV` and replace with your config
```shell
SITE_TITLE='Firechat'

FIREBASE_APIKEY=''
FIREBASE_AUTHDOMAIN=''
FIREBASE_DATABASEURL=''
FIREBASE_PROJECTID=''
FIREBASE_STORAGEBUCKET=''
FIREBASE_MESSAGINGSENDERID=''
FIREBASE_APPID=''
FIREBASE_MEASUREMENTID=''
```

## Usage for development

1. Open your terminal or command prompt
2. Type `git clone https://github.com/chlasswg26/Firechat.git`
3. Open the folder and type `yarn install or npm install` for install dependencies
4. Add your goole maps API Key on `AndroidManifest.xml`
##### Example
  ```
  <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="YOUR_API_KEY"/>
  ```
6. Type `react-native run-android` for run this app. ***Make sure your device is connected with debugging mode***.
7. Well done..

## Screenshot

<kbd>
<img src="./screenshot/Screenshot_20200705_111524.jpg" width="200">
</kbd>

<kbd>
<img src="./screenshot/Screenshot_20200705_110239.jpg" width="200">
</kbd>

<kbd>
<img src="./screenshot/Screenshot_20200705_110235.jpg" width="200">
</kbd>

<kbd>
<img src="./screenshot/Screenshot_20200705_110214.jpg" width="200">
</kbd>

<kbd>
<img src="./screenshot/Screenshot_20200705_105537.jpg" width="200">
</kbd>
