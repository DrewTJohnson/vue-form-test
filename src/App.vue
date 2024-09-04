<script setup>
import { ref, computed } from 'vue'
import Home from '@/pages/Home.vue'
import FirstPage from '@/pages/FirstPage.vue'
import SecondPage from '@/pages/SecondPage.vue'
import NotFound from '@/pages/NotFound.vue'
import Results from '@/pages/Results.vue'

const routes = {
  '/': Home,
  '/first-page': FirstPage,
  '/second-page': SecondPage,
  '/results': Results,
  '/404': NotFound
  // to add additional pages, add a new file to the /pages directory and follow the above format.
  // make sure to import the correct vue files to properly render the page(s).
}

// use hash instead of pathname so we get fancy between component transitions. Because we are using local storage for pinia data
// we don't technically have to do this, but it looks nice :)
const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', (e) => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>

<template>
  <main class="h-screen bg-slate-800 text-white">
    <section class="h-full">
      <!--   transition to allow for the smooth transition between "pages" (which are really just components in this instance).   -->
      <transition>
        <component :is="currentView" />
      </transition>
    </section>
  </main>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>