<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  interface VideoFeedProps {
    isFullscreen: boolean
  }

  let props: VideoFeedProps = $props()

  let videoElement: HTMLVideoElement | null = null

  const dispatch = createEventDispatcher()

  function handleFullscreenChage(): void {
    dispatch('fullscreenChange')
  }
</script>

<div class="relative flex-[7] min-w-0 flex items-center justify-center h-full">
  <video
    bind:this={videoElement}
    class={!props.isFullscreen &&
      'rounded-xl overflow-hidden border-2 border-body object-cover w-full max-h-full [aspect-ratio:16/9]'}
    autoplay
    playsinline
    onpause={() => videoElement?.play()}
    onfullscreenchange={handleFullscreenChage}
  ></video>
</div>
