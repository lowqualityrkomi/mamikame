<script lang="ts">
  import Layout from './+layout.svelte'
  import { currentRoute } from './lib/router'

  import HomeScreen from './routes/home/+page.svelte'
  import AudioScreen from './routes/audio/+page.svelte'
  import VideoScreen from './routes/video/+page.svelte'

  const routes = {
    '/': HomeScreen,
    '/audio': AudioScreen,
    '/video': VideoScreen
  }
</script>

<Layout>
  <svelte:component this={routes[$currentRoute]} />
</Layout>
