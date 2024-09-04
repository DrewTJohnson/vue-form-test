<script setup>
import { useAnswerStore } from '@/stores/answers.js'

const answerStore = useAnswerStore()

function clearStore() {
  // clear local storage
  localStorage.clear()
  // clear pinia store
  answerStore.$reset()
  return window.location.hash = '/'
}
</script>

<template>
  <div class="max-w-[500px] mx-auto w-full h-full flex flex-col gap-2 justify-center items-start">
    <!--  Render the fields!  -->
    <h2 class="text-2xl font-bold tracking-wider mb-8">Congrats! Here's your results.</h2>
    <p>Your name is <strong class="tracking-wide">{{ answerStore.answers.name }}</strong>, you have a pet named <strong class="tracking-wide">{{ answerStore.answers.petsName }}</strong> and your email is <strong class="tracking-wide">{{ answerStore.answers.email }}</strong>.</p>
    <p v-if="answerStore.answers.liveInNewYork === 'Yes'">You live in New York and you like it because <strong class="tracking-wide">{{ answerStore.answers.whyDoYouLikeIt.toLowerCase() }}</strong>.</p>
    <p v-else>You live in <strong class="tracking-wide">{{ answerStore.answers.whereDoYouLive }}</strong> and you like it because <strong class="tracking-wide">{{ answerStore.answers.whyDoYouLikeIt.toLowerCase() }}</strong>.</p>
    <button class="btn mt-8" @click.prevent="clearStore">Start Over</button>
  </div>
</template>