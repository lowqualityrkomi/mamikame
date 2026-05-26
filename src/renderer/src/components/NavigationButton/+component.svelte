<script lang="ts">
  import type { Snippet } from 'svelte'
  import { currentRoute, navigate, type Route } from '../../lib/router'

  interface NavigationButtonProps {
    path: Route
    color: 'text-primary' | 'text-secondary' | 'text-tertiary'
    children: Snippet<[]>
  }

  let props: NavigationButtonProps = $props()

  let isCurrentPath = $derived(props.path === $currentRoute)
</script>

<button
  class="p-2 rounded-full transition-all hover:cursor-pointer hover:scale-105 {props.color} {isCurrentPath
    ? 'bg-white/10'
    : ''}"
  aria-label="Navigation to {props.path}"
  onclick={() => navigate(props.path)}
>
  <div class="h-full w-full flex flex-col justify-center items-center">
    {@render props.children()}
  </div>
</button>
