<script lang="ts">
  import { onMount } from 'svelte'
  import { getDevices } from './helpers'
  import DeviceSelector from './components/DeviceSelector/+component.svelte'
  import VideoFeed from './components/VideoFeed/+component.svelte'

  let audioInputDevices = $state<MediaDeviceInfo[]>([])
  let videoInputDevices = $state<MediaDeviceInfo[]>([])
  let isFullscreen: boolean = $state(false)

  let selectedAudioInputDeviceId = $state<string>(
    window.localStorage.getItem('selectedAudioInputDeviceId') || ''
  )
  let selectedVideoInputDeviceId = $state<string>(
    window.localStorage.getItem('selectedVideoInputDeviceId') || ''
  )

  onMount(async () => {
    await initDevices()
    await initPreview()
  })

  const initDevices = async (): Promise<void> => {
    const devices = await getDevices()
    audioInputDevices = devices.filter((device) => device.kind === 'audioinput')
    videoInputDevices = devices.filter((device) => device.kind === 'videoinput')

    if (selectedAudioInputDeviceId == '') {
      selectedAudioInputDeviceId = audioInputDevices[0]?.deviceId
    }
    if (selectedVideoInputDeviceId == '') {
      selectedVideoInputDeviceId = videoInputDevices[0]?.deviceId
    }
  }

  const handleChangeAudioInputDevice = (event: Event): void => {
    const selectElement = event.target as HTMLSelectElement
    selectedAudioInputDeviceId = selectElement.value
    window.localStorage.setItem('selectedAudioInputDeviceId', selectedAudioInputDeviceId)

    initPreview()
  }

  const handleChangeVideoInputDevice = (event: Event): void => {
    const selectElement = event.target as HTMLSelectElement
    selectedVideoInputDeviceId = selectElement.value
    window.localStorage.setItem('selectedVideoInputDeviceId', selectedVideoInputDeviceId)

    initPreview()
  }

  const initPreview = async (): Promise<void> => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: { exact: selectedAudioInputDeviceId },
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      },
      video: {
        deviceId: { exact: selectedVideoInputDeviceId },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    })
    const videoElement = document.querySelector('video')
    if (videoElement) {
      videoElement.srcObject = stream
    }
  }

  const toggleFullScreen = (): void => {
    const container = document.querySelector('video')

    const fullscreenApi = container.requestFullscreen

    fullscreenApi.call(container)
  }
</script>

<!-- Main content -->
<div class="flex-1 min-h-0 flex items-center justify-center px-[5%] py-[3%]">
  <div class="flex gap-6 h-full w-full items-center justify-center">
    <!-- Video: 70% -->
    <VideoFeed {isFullscreen} on:fullscreenChange={() => (isFullscreen = !isFullscreen)}
    ></VideoFeed>/>

    <!-- Settings panel: 30% -->
    <div
      class="flex-[3] min-w-0 bg-accent rounded-xl p-5 flex flex-col gap-4 text-body overflow-hidden"
      style="height: var(--video-height, 100%)"
    >
      <DeviceSelector
        devices={videoInputDevices}
        selectedDeviceId={selectedAudioInputDeviceId}
        on:change={handleChangeVideoInputDevice}
      />

      <DeviceSelector
        devices={audioInputDevices}
        selectedDeviceId={selectedAudioInputDeviceId}
        on:change={handleChangeAudioInputDevice}
      />

      <div class="flex-1"></div>

      <button
        class="w-full bg-gradient-to-br from-primary to-secondary text-white py-2 px-4 rounded-full transition-transform hover:cursor-pointer hover:scale-105"
        onclick={toggleFullScreen}
      >
        Enter Fullscreen
      </button>
    </div>
  </div>
</div>
