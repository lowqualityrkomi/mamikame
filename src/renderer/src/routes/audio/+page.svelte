<script lang="ts">
  import type { AudioConfigs } from '../../interfaces'
  import Configs from '../../lib/configs'

  let audioConfigs: AudioConfigs = Configs.getAudioConfigs()

  console.log(audioConfigs)

  function save(): void {
    Configs.setAudioConfigs(audioConfigs)
  }

  function reset(): void {
    audioConfigs = Configs.getDefaultAudioConfig()
  }
</script>

<div class="h-full overflow-y-auto p-4 space-y-6 text-body">
  <div class="flex flex-col gap-4">
    <div>
      <label class="font-bold">PROCESSING</label>

      <div class="flex flex-col divide-y divide-body/50">
        <div class="flex flex-row justify-between items-center py-2">
          <label for="echoCancellation"> Echo cancellation </label>
          <select
            id="echoCancellation"
            bind:value={audioConfigs.echoCancellation}
            class="bg-accent py-2 px-4 rounded-full border boder-body"
          >
            <option value={true}>Enabled</option>
            <option value={false}>Disabled</option>
          </select>
        </div>

        <div class="flex flex-row justify-between items-center py-2">
          <label for="noiseSuppression"> Noise suppression </label>
          <select
            id="noiseSuppression"
            bind:value={audioConfigs.noiseSuppression}
            class="bg-accent py-2 px-4 rounded-full border boder-body"
          >
            <option value={true}>Enabled</option>
            <option value={false}>Disabled</option>
          </select>
        </div>

        <div class="flex flex-row justify-between items-center py-2">
          <label for="autoGainControl"> Auto gain control </label>
          <select
            id="autoGainControl"
            bind:value={audioConfigs.autoGainControl}
            class="bg-accent py-2 px-4 rounded-full border boder-body"
          >
            <option value={true}>Enabled</option>
            <option value={false}>Disabled</option>
          </select>
        </div>
      </div>
    </div>

    <div>
      <label class="font-bold">SIGNAL</label>

      <div class="flex flex-col divide-y divide-body/50">
        <div class="flex flex-row justify-between items-center py-2">
          <label for="sampleRate"> Sample rate </label>
          <select
            id="sampleRate"
            bind:value={audioConfigs.sampleRate}
            class="bg-accent py-2 px-4 rounded-full border boder-body"
          >
            <option value="8000">8000 Hz</option>
            <option value="16000">16000 Hz</option>
            <option value="22050">22050 Hz</option>
            <option value="44100">44100 Hz</option>
            <option value="48000">48000 Hz</option>
            <option value="96000">96000 Hz</option>
          </select>
        </div>

        <div class="flex flex-row justify-between items-center py-2">
          <label for="sampleSize"> Sample size </label>
          <select
            id="sampleSize"
            bind:value={audioConfigs.sampleSize}
            class="bg-accent py-2 px-4 rounded-full border boder-body"
          >
            <option value="8">8 bits</option>
            <option value="16">16 bits</option>
            <option value="24">24 bits</option>
            <option value="32">32 bits</option>
          </select>
        </div>

        <div class="flex flex-row justify-between items-center py-2">
          <label for="channelCount"> Channels </label>
          <select
            id="channelCount"
            bind:value={audioConfigs.channelCount}
            class="bg-accent py-2 px-4 rounded-full border boder-body"
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>

        <div class="flex flex-row justify-between items-center py-2">
          <label for="latency"> Latency </label>
          <input
            type="number"
            id="latency"
            step={0.01}
            bind:value={audioConfigs.latency}
            class="bg-accent py-2 px-4 rounded-full border boder-body"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-end items-center gap-4">
    <button
      class="py-2 px-4 bg-secondary text-body rounded-md hover:cursor-pointer"
      on:click={reset}>RESET</button
    >
    <button class="py-2 px-4 bg-primary text-body rounded-md hover:cursor-pointer" on:click={save}
      >SAVE</button
    >
  </div>
</div>
