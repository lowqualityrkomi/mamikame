export interface MediaStreamConstraint {
  audio: AudioConstraint
  video: VideoConstraint
}

interface AudioConstraint {
  deviceId: DeviceId | boolean
  echoCancellation: boolean
  noiseSuppression: boolean
  autoGainControl: boolean
  sampleRate: 8000 | 16000 | 22050 | 44100 | 48000 | 96000
  sampleSize: 8 | 16 | 24 | 32
  channelCount: 1 | 2
  latency: number
}

interface VideoConstraint {
  deviceId: DeviceId | boolean
  width: Size
  height: Size
  aspectRatio: number
  frameRate: 24 | 25 | 30 | 50 | 60 | 120
  facingMode: 'user' | 'environment' | 'left' | 'right'
  resizeMode: 'none' | 'crop-and-scale'
}

export interface DeviceId {
  exact: string
}

interface Size {
  ideal: number
}
