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

<div class="h-full overflow-y-auto p-4 space-y-6 text-body">
  <div class="flex flex-col gap-4">
    <div>
      <label class="font-bold">RESOLUTION</label>

      <div class="flex flex-col divide-y divide-body/50">
        <div class="flex flex-row justify-between items-center py-2">
          <label for="width"> Width </label>
          <input
            type="number"
            id="width"
            step={1}
            bind:value={videoConfigs.width}
            class="bg-accent py-2 px-4 rounded-full border boder-body"
          />
        </div>

        <div class="flex flex-row justify-between items-center py-2">
          <label for="height"> Height </label>
          <input
            type="number"
            id="height"
            step={1}
            bind:value={videoConfigs.height}
            class="bg-accent py-2 px-4 rounded-full border boder-body"
          />
        </div>
      </div>
    </div>

    <div>
      <label class="font-bold">FRAME RATE</label>

      <div class="flex flex-col divide-y divide-body/50">
        <div class="flex flex-row justify-between items-center py-2">
          <label for="frameRate"> Frame rate </label>
          <select
            id="frameRate"
            bind:value={videoConfigs.frameRate}
            class="bg-accent py-2 px-4 rounded-full border boder-body"
          >
            <option value={24}>24</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={60}>60</option>
            <option value={120}>120</option>
          </select>
        </div>
      </div>
    </div>

    <div>
      <label class="font-bold">CAMERA</label>

      <div class="flex flex-col divide-y divide-body/50">
        <div class="flex flex-row justify-between items-center py-2">
          <label for="resizeMode"> Resize mode </label>
          <select
            id="resizeMode"
            bind:value={videoConfigs.resizeMode}
            class="bg-accent py-2 px-4 rounded-full border boder-body"
          >
            <option value="none">None</option>
            <option value="crop-and-scale">Crop and scale</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-end items-center gap-4">
    <button
      class="py-2 px-4 bg-secondary text-body rounded-md hover:cursor-pointer"
      on:click={reset}
    >
      RESET
    </button>
    <button class="py-2 px-4 bg-primary text-body rounded-md hover:cursor-pointer" on:click={save}>
      SAVE
    </button>
  </div>
</div>
