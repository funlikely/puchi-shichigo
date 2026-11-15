#!/usr/bin/env bash
# Build a standalone, offline release APK for arm64 Android phones (e.g. Galaxy S24).
# Needs JDK 17 + Android SDK; see ~/Android/env.sh. Output: dist/puchi-shichigo.apk
set -euo pipefail
cd "$(dirname "$0")/.."
. "$HOME/Android/env.sh"
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh" >/dev/null
[ -d android ] || CI=1 npx expo prebuild -p android --no-install
(cd android && ./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a --no-daemon \
  --max-workers=2 -Dorg.gradle.jvmargs="-Xmx2g -XX:MaxMetaspaceSize=512m" \
  -Pkotlin.compiler.execution.strategy=in-process)
mkdir -p dist
cp android/app/build/outputs/apk/release/app-release.apk dist/puchi-shichigo.apk
ls -lh dist/puchi-shichigo.apk
