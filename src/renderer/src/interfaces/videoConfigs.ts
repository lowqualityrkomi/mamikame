export interface VideoConfigs {
  width: number
  height: number
  frameRate: 24 | 25 | 30 | 50 | 60 | 120
  resizeMode: 'none' | 'crop-and-scale'
}
