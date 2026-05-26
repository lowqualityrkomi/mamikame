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

    const config: MediaStreamConstraint = {
      audio: {
        deviceId: audioDevice,
        echoCancellation: audioConfigs.echoCancellation,
        noiseSuppression: audioConfigs.noiseSuppression,
        autoGainControl: audioConfigs.autoGainControl,
        channelCount: audioConfigs.channelCount
      },
      video: {
        deviceId: videoDevice,
        width: {
          ideal: videoConfigs.width
        },
        height: {
          ideal: videoConfigs.height
        },
        frameRate: { ideal: videoConfigs.frameRate },
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
      frameRate: 60,
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
      channelCount: 2
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
