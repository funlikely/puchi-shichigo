/// <reference types="expo/types" />
import type { ImageSourcePropType } from 'react-native';

// Bundles every image in content/win-images/ (a private, gitignored folder).
// Expo's Metro config enables require.context by default.
const ctx = require.context('../content/win-images', false, /\.(png|jpe?g|webp|gif)$/i);

const WIN_IMAGES: ImageSourcePropType[] = ctx.keys().map(key => ctx(key));

export function randomWinImage(): ImageSourcePropType | null {
  if (WIN_IMAGES.length === 0) return null;
  return WIN_IMAGES[Math.floor(Math.random() * WIN_IMAGES.length)];
}
