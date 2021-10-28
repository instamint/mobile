#!/bin/bash
      # Helper script for Gradle to call npm on macOS in case it is not found
      export PATH=$PATH:/Users/jose/.nvm/versions/node/v14.16.1/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/jose/Desktop/workspace/myproyects/instamint/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/jose/Desktop/workspace/myproyects/instamint/node_modules/.bin:/Users/jose/.nvm/versions/node/v14.16.1/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin:/Users/jose/Library/Android/sdk/emulator:/Users/jose/Library/Android/sdk/tools:/Users/jose/Library/Android/sdk/tools/bin:/Users/jose/Library/Android/sdk/platform-tools
      npm $@
    