import { LS_Constants } from '../constants/localstorage'
import type { AudioConfigs, DeviceId, MediaStreamConstraint, VideoConfigs } from '../interfaces'

class Configs {
  // Full configuration
  getVideoStreamConfig(): object {
    const videoConfigs = this.getVideoConfigs()
    const audioConfigs = this.getAudioConfigs()
    const currentVideoDevice = this.getCurrentVideoDevice()
    const currentAudioDevice = this.getCurrentAudioDevice()

    const videoDevice: DeviceId | boolean =
      currentVideoDevice !== null ? { exact: currentVideoDevice } : true
    const audioDevice: DeviceId | boolean =
      currentAudioDevice !== null ? { exact: currentAudioDevice } : true

    const [w, h] = videoConfigs.aspectRatio.split('/').map(Number)
    const aspectRatio = w / h

    const config: MediaStreamConstraint = {
      audio: {
        deviceId: audioDevice,
        echoCancellation: audioConfigs.echoCancellation,
        noiseSuppression: audioConfigs.noiseSuppression,
        autoGainControl: audioConfigs.autoGainControl,
        sampleRate: audioConfigs.sampleRate,
        sampleSize: audioConfigs.sampleSize,
        channelCount: audioConfigs.channelCount,
        latency: audioConfigs.latency
      },
      video: {
        deviceId: videoDevice,
        width: {
          ideal: videoConfigs.width
        },
        height: {
          ideal: videoConfigs.height
        },
        aspectRatio: aspectRatio,
        frameRate: videoConfigs.frameRate,
        facingMode: videoConfigs.facingMode,
        resizeMode: videoConfigs.resizeMode
      }
    }

    return config
  }

  // Video Configs
  getVideoConfigs(): VideoConfigs {
    const config: VideoConfigs | null = JSON.parse(
      localStorage.getItem(LS_Constants.MAMIKAME_VIDEO_CONFIG_KEY)
    )

    if (!config) {
      return this.getDefaultVideoConfig()
    }

    return config
  }

  getDefaultVideoConfig(): VideoConfigs {
    return {
      width: 1920,
      height: 1080,
      aspectRatio: '16 / 9',
      frameRate: 60,
      facingMode: 'user',
      resizeMode: 'none'
    }
  }

  getCurrentVideoDevice(): string | null {
    console.log(localStorage.getItem(LS_Constants.MAMIKAME_CURRENT_VIDEO_DEVICE_KEY))
    return localStorage.getItem(LS_Constants.MAMIKAME_CURRENT_VIDEO_DEVICE_KEY)
  }

  setVideoConfigs(configs: VideoConfigs): void {
    localStorage.setItem(LS_Constants.MAMIKAME_VIDEO_CONFIG_KEY, JSON.stringify(configs))
  }

  setCurrentVideoDevice(deviceId: string): void {
    localStorage.setItem(LS_Constants.MAMIKAME_CURRENT_VIDEO_DEVICE_KEY, deviceId)
  }

  // Audio Configs
  getAudioConfigs(): AudioConfigs {
    const config: AudioConfigs | null = JSON.parse(
      localStorage.getItem(LS_Constants.MAMIKAME_AUDIO_CONFIG_KEY)
    )

    if (!config) {
      return this.getDefaultAudioConfig()
    }

    return config
  }

  getDefaultAudioConfig(): AudioConfigs {
    return {
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
      sampleRate: 48000,
      sampleSize: 24,
      channelCount: 2,
      latency: 0.01
    }
  }

  getCurrentAudioDevice(): string | null {
    return localStorage.getItem(LS_Constants.MAMIKAME_CURRENT_AUDIO_DEVICE_KEY)
  }

  setAudioConfigs(configs: AudioConfigs): void {
    localStorage.setItem(LS_Constants.MAMIKAME_AUDIO_CONFIG_KEY, JSON.stringify(configs))
  }

  setCurrentAudioDevice(deviceId: string): void {
    localStorage.setItem(LS_Constants.MAMIKAME_CURRENT_AUDIO_DEVICE_KEY, deviceId)
  }
}

export default new Configs()
