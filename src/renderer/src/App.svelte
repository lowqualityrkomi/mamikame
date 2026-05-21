<script lang="ts">
  import { onMount } from 'svelte'

  let audioInputDevices = $state<MediaDeviceInfo[]>([])
  let videoInputDevices = $state<MediaDeviceInfo[]>([])
  let videoElement: HTMLVideoElement | null = null
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

  const getDevices = async (): Promise<MediaDeviceInfo[]> => {
    return await navigator.mediaDevices.enumerateDevices()
  }

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

<div class="flex flex-col h-screen bg-neutral">
  <!-- Header -->
  <div class="w-full px-5 border-b border-body shrink-0">
    <div class="flex items-center justify-center gap-2.5 py-2">
      <div class="size-[30px] shrink-0">
        <img src="./assets/icon.png" class="h-full w-full object-contain" />
      </div>
      <span class="text-3xl text-primary">mamikame</span>
    </div>
  </div>

  <!-- Main content -->
  <div class="flex-1 min-h-0 flex items-center justify-center px-[5%] py-[3%]">
    <div class="flex gap-6 h-full w-full items-center justify-center">
      <!-- Video: 70% -->
      <div class="relative flex-[7] min-w-0 flex items-center justify-center h-full">
        <video
          bind:this={videoElement}
          class={!isFullscreen &&
            'rounded-xl overflow-hidden border-2 border-body object-cover w-full max-h-full [aspect-ratio:16/9]'}
          autoplay
          playsinline
          onpause={() => videoElement?.play()}
          onfullscreenchange={() => (isFullscreen = !isFullscreen)}
        ></video>
      </div>

      <!-- Settings panel: 30% -->
      <div
        class="flex-[3] min-w-0 bg-accent rounded-xl p-5 flex flex-col gap-4 text-body overflow-hidden"
        style="height: var(--video-height, 100%)"
      >
        <div class="flex flex-col gap-2.5">
          <label for="videoInputDevices">Video input device</label>
          <select
            onchange={handleChangeVideoInputDevice}
            id="videoInputDevices"
            class="bg-accent border border-body rounded-full px-3 py-1 w-full"
          >
            {#each videoInputDevices as device (device.deviceId)}
              <option
                value={device.deviceId}
                selected={device.deviceId === selectedVideoInputDeviceId}
              >
                {device.label}
              </option>
            {/each}
          </select>
        </div>

        <div class="flex flex-col gap-2.5">
          <label for="audioInputDevices">Audio input device</label>
          <select
            onchange={handleChangeAudioInputDevice}
            id="audioInputDevices"
            class="bg-accent border border-body rounded-full px-3 py-1 w-full"
          >
            {#each audioInputDevices as device (device.deviceId)}
              <option
                value={device.deviceId}
                selected={device.deviceId === selectedAudioInputDeviceId}
              >
                {device.label}
              </option>
            {/each}
          </select>
        </div>

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

  <!-- Bottom navigation -->
  <div class="shrink-0 flex justify-center items-center py-5">
    <div class="bg-accent rounded-full py-3.5 px-12 flex items-center gap-5">
      <button
        class="size-[50px] rounded-full bg-body transition-all hover:cursor-pointer hover:scale-105"
      ></button>
      <button
        class="size-[50px] rounded-full bg-body transition-all hover:cursor-pointer hover:scale-105"
      ></button>
      <button
        class="size-[50px] rounded-full bg-body transition-all hover:cursor-pointer hover:scale-105"
      ></button>
    </div>
  </div>
</div>
