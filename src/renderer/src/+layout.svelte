<script lang="ts">
  import type { Snippet } from 'svelte'
  import NavigationButton from './components/NavigationButton/+component.svelte'
  import logo from './assets/icon.png'

  interface LayoutProps {
    children: Snippet<[]>
  }

  let props: LayoutProps = $props()
</script>

<div class="flex flex-col h-screen bg-neutral">
  <!-- Header -->
  <div class="w-full px-5 border-b border-body shrink-0">
    <div class="flex items-center justify-center gap-2.5 py-2">
      <div class="size-[30px] shrink-0">
        <img src={logo} class="h-full w-full object-contain" />
      </div>
      <span class="text-3xl text-primary">mamikame</span>
    </div>
  </div>

  <!-- Main content  -->
  {@render props.children()}

  <!-- Bottom navigation -->
  <div class="shrink-0 flex justify-center items-center py-5">
    <div class="bg-accent rounded-full py-2.5 px-12 flex items-center gap-5">
      <NavigationButton path="/" color="text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M7.238 3.044C5.652 2.182 3.75 3.32 3.75 5.033v13.934c0 1.714 1.902 2.851 3.488 1.989l12.812-6.967c1.6-.87 1.6-3.108 0-3.977zM2.25 5.033c0-2.905 3.167-4.687 5.705-3.306l12.812 6.967c2.644 1.438 2.644 5.174 0 6.612L7.955 22.273c-2.538 1.38-5.705-.4-5.705-3.306z"
            clip-rule="evenodd"
          />
        </svg>
      </NavigationButton>

      <NavigationButton path="/audio" color="text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 18a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm0 0V6" />
            <path
              stroke-linecap="round"
              d="m16.117 10.059l-2.634-1.317c-.365-.182-.547-.274-.698-.389a2 2 0 0 1-.75-1.213C12 6.954 12 6.75 12 6.342c0-.971 0-1.457.12-1.787a2 2 0 0 1 2.112-1.305c.348.04.783.258 1.651.692l2.634 1.317c.365.182.547.273.698.389a2 2 0 0 1 .75 1.212c.035.187.035.39.035.799c0 .97 0 1.456-.12 1.786a2 2 0 0 1-2.112 1.306c-.348-.04-.783-.258-1.651-.692Z"
            />
          </g>
        </svg>
      </NavigationButton>

      <NavigationButton path="/video" color="text-tertiary">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M9.451 3.25h.098c1.602 0 2.872 0 3.876.119c1.03.122 1.88.377 2.588.96q.361.296.659.658c.582.709.837 1.557.96 2.588q.04.348.064.739c.786-.392 1.452-.714 2.007-.896c.652-.213 1.343-.299 1.98.095s.87 1.05.97 1.728c.097.655.097 1.516.097 2.551v.416c0 1.035 0 1.896-.097 2.55c-.1.679-.333 1.335-.97 1.729s-1.328.308-1.98.095c-.555-.182-1.221-.504-2.007-.896q-.023.391-.065.739c-.122 1.03-.377 1.88-.96 2.588q-.296.361-.658.659c-.709.582-1.557.837-2.588.96c-1.005.118-2.274.118-3.876.118H9.45c-1.602 0-2.872 0-3.876-.119c-1.03-.122-1.88-.377-2.588-.96a5 5 0 0 1-.659-.658c-.582-.709-.837-1.557-.96-2.588c-.118-1.005-.118-2.274-.118-3.876V11.45c0-1.602 0-2.872.119-3.876c.122-1.03.377-1.88.96-2.588a5 5 0 0 1 .658-.659c.709-.582 1.557-.837 2.588-.96C6.58 3.25 7.85 3.25 9.451 3.25m6.799 9.25v-1c0-1.662-.001-2.843-.108-3.749c-.105-.889-.304-1.415-.63-1.813a3.3 3.3 0 0 0-.45-.45c-.398-.326-.924-.525-1.813-.63c-.906-.107-2.087-.108-3.749-.108s-2.843.001-3.749.108c-.889.105-1.415.304-1.813.63a3.3 3.3 0 0 0-.45.45c-.326.398-.525.924-.63 1.813c-.107.906-.108 2.087-.108 3.749v1c0 1.662.001 2.843.108 3.749c.105.889.304 1.415.63 1.813q.203.247.45.45c.398.326.924.525 1.813.63c.906.107 2.087.108 3.749.108s2.843-.001 3.749-.108c.889-.105 1.415-.304 1.813-.63q.247-.203.45-.45c.326-.398.525-.924.63-1.813c.107-.906.108-2.087.108-3.749m1.5 1.537l.244.121c.995.498 1.666.831 2.176.998c.499.163.65.1.724.055s.198-.153.275-.673c.079-.53.081-1.28.081-2.392v-.292c0-1.113-.002-1.862-.08-2.392c-.078-.52-.202-.627-.276-.673s-.225-.108-.724.055c-.51.167-1.18.5-2.176.998l-.244.122v4.072"
            clip-rule="evenodd"
          />
        </svg>
      </NavigationButton>
    </div>
  </div>
</div>
