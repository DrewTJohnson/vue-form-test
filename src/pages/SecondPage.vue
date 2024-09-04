<script setup>
import { ref } from 'vue'
import TextField from '@/components/TextField.vue'
import MessageInput from '@/components/MessageInput.vue'
import { useAnswerStore } from '@/stores/answers.js'

/*
*
*
* This page component is setup in a very similar fashion to first-page, skipping redundant comments for this reason
*
* */

const answerStore = useAnswerStore()

const invalid = ref(false)

// simple nested if statements for validation because we have a field that isn't 100% of the time required.
function submitForm() {
  if( answerStore.answers.liveInNewYork === 'No') {
    if( answerStore.answers.whereDoYouLive !== '' && answerStore.answers.whyDoYouLikeIt !== '') {
      invalid.value = false
      return window.location.hash = "/results"
    } else {
      invalid.value = true
    }
  } else {
    if (answerStore.answers.whyDoYouLikeIt !== '') {
      invalid.value = false
      return window.location.hash = "/results"
    } else {
      invalid.value = true
    }
  }
}
</script>

<template>
  <div class="container h-full flex flex-col gap-8 justify-center items-center">
    <p class="text-red-500" v-show="invalid"><strong>Please fill out all of the fields on the page.</strong></p>
    <form class="max-w-[400px] mx-auto flex flex-col gap-8 justify-start">
    <!--   This field only shows if the previous "Do you live in new york" answer is set to 'no'   -->
    <TextField field-title="Where do you live?" placeholder="York, Pennsylvania" v-if="answerStore.answers.liveInNewYork === 'No'" required v-model="answerStore.answers.whereDoYouLive"></TextField>
    <MessageInput
        field-title="Why do you like where you live?"
        placeholder="Because there's so much to do!"
        v-model="answerStore.answers.whyDoYouLikeIt"
    ></MessageInput>
  </form>
  <div class="container-xs flex justify-end items-center w-full">
    <button type="submit" @click.stop.prevent="submitForm" class="btn">Check My Results</button>
  </div>
  </div>
</template>