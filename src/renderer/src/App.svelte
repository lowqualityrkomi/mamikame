<script lang="ts">
  import Layout from './+layout.svelte'

  import HomeScreen from './routes/home/+page.svelte'
  import AudioScreen from './routes/audio/+page.svelte'
  import VideoScreen from './routes/video/+page.svelte'

  let path: string = window.location.pathname

  $: {
    if (path !== window.location.pathname) {
      path = window.location.pathname
    }
  }
</script>

<Layout currentPath={path}>
  {#if path === '/'}
    <HomeScreen />
  {:else if path === '/audio'}
    <AudioScreen />
  {:else if path === '/video'}
    <VideoScreen />
  {/if}
</Layout>
