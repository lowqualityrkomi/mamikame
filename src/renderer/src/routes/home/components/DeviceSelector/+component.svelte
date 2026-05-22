<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  interface DeviceSelectorProps {
    devices: MediaDeviceInfo[]
    selectedDeviceId: string
  }

  let props: DeviceSelectorProps = $props()

  const dispatch = createEventDispatcher()

  function handleChangeVideoInputDevice(event: Event): void {
    dispatch('change', event)
  }
</script>

<div class="flex flex-col gap-2.5">
  <label for="videoInputDevices">Video input device</label>
  <select
    onchange={handleChangeVideoInputDevice}
    id="videoInputDevices"
    class="bg-accent border border-body rounded-full px-3 py-1 w-full"
  >
    {#each props.devices as device (device.deviceId)}
      <option value={device.deviceId} selected={device.deviceId === props.selectedDeviceId}>
        {device.label}
      </option>
    {/each}
  </select>
</div>
