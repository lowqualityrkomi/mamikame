export const getDevices = async (): Promise<MediaDeviceInfo[]> => {
  return await navigator.mediaDevices.enumerateDevices()
}
