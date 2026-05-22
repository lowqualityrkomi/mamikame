<script lang="ts">
  import type { Snippet } from 'svelte'

  interface NavigationButtonProps {
    path: string
    currentPath: string
    color: string
    children: Snippet<[]>
  }

  let props: NavigationButtonProps = $props()

  let isCurrentPath: boolean = props.path === props.currentPath
</script>

<button
  class="p-2 rounded-full transition-all hover:cursor-pointer hover:scale-105 text-{props.color} {isCurrentPath &&
    'bg-white/10'}"
  aria-label="Home"
  onclick={() => window.location.replace(props.path)}
>
  <div class="h-full w-full flex flex-col justify-center items-center">
    {@render props.children()}
  </div>
</button>
