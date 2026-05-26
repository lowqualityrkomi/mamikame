<script lang="ts">
  import type { VideoConfigs } from '../../interfaces'
  import Configs from '../../lib/configs'

  let videoConfigs: VideoConfigs = Configs.getVideoConfigs()

  function save(): void {
    Configs.setVideoConfigs(videoConfigs)
  }

  function reset(): void {
    videoConfigs = Configs.getDefaultVideoConfig()
  }
</script>

<div class="h-full overflow-y-auto p-4 space-y-6">
  <div class="flex justify-end items-center gap-4">
    <button class="py-2 px-4 bg-secondary text-body rounded-md" on:click={reset}>RESET</button>
    <button class="py-2 px-4 bg-primary text-body rounded-md" on:click={save}>SAVE</button>
  </div>
</div>
