export interface MediaStreamConstraint {
  audio: AudioConstraint
  video: VideoConstraint
}

interface AudioConstraint {
  deviceId: DeviceId | boolean
  echoCancellation: boolean
  noiseSuppression: boolean
  autoGainControl: boolean
  channelCount: 1 | 2
}

interface VideoConstraint {
  deviceId: DeviceId | boolean
  width: Size
  height: Size
  frameRate: FrameRate
  resizeMode: 'none' | 'crop-and-scale'
}

export interface DeviceId {
  exact: string
}

interface Size {
  ideal: number
}

interface FrameRate {
  ideal: 24 | 25 | 30 | 50 | 60 | 120
}
