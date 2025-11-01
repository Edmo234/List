#!/usr/bin/env bash
set -e
echo ">>> Build Cordova Android (release)"
# Ajuste paths se necessário
cordova platform add android || true
cordova plugin add cordova-plugin-file || true
cordova plugin add cordova-plugin-file-opener2 || true
cordova build android --release
echo ">>> Build finalizado. Procure o .apk/.aab em platforms/android/"
