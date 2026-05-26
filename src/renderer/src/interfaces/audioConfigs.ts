export interface AudioConfigs {
  echoCancellation: true | false
  noiseSuppression: true | false
  autoGainControl: true | false
  sampleRate: 8000 | 16000 | 22050 | 44100 | 48000 | 96000
  sampleSize: 8 | 16 | 24 | 32
  channelCount: 1 | 2
  latency: number
}
