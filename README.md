# socialdj
Build a playlist socially wherever you are! 

1 Download this Vagrant Box: https://github.com/driftyco/ionic-box

2 git clone this repo

3.1 (Linux) ionic setup sass

3.2 (Windows) 
    
    -delete bower from package.json and gulp.js 
    
    -sudo npm install.
    
    -gulp watch
  
4 ionic serve --address 0.0.0.0 

5.1 Follow this to build APK: https://forum.ionicframework.com/t/ionic-toturial-for-building-a-release-apk/15758

  -Create Key

  -Create file ../platforms/android/release-signign.properties 

    key.store=YourApp.keystore
    key.store.password=
    key.alias=YourApp
    key.alias.password=

5.2 ionic build --release

6 Copy APK to phone/tablet located in: .../platforms/android/build/outputs/apk

7 Enjoy =)
