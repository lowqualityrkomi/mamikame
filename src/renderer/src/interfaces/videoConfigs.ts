export interface VideoConfigs {
  width: number
  height: number
  aspectRatio: '16 / 9' | '4 / 3' | '21 / 9' | '1 : 1'
  frameRate: 24 | 25 | 30 | 50 | 60 | 120
  facingMode: 'user' | 'environment' | 'left' | 'right'
  resizeMode: 'none' | 'crop-and-scale'
}
