<script setup>
import { ref } from 'vue'
// Importing field components to build subsequent form on the fly
import TextField from '@/components/TextField.vue'
import RadioGroupInput from '@/components/RadioGroupInput.vue'
import { useAnswerStore } from '@/stores/answers.js'

const answerStore = useAnswerStore()

const invalid = ref(false)

const submitForm = () => {
  // extremely simple validation to prevent submitting without data pushed to pinia & localstorage (this is not production level code. Do this serverside plz).
  if( answerStore.answers.name !== '' && answerStore.answers.email !== '' && answerStore.answers.liveInNewYork !== '') {
    invalid.value = false
    return window.location.hash = "/second-page"
  } else {
    invalid.value = true
  }
}
</script>

<template>
  <div class="container h-full flex flex-col gap-8 justify-center items-center">
    <p class="text-red-500" v-show="invalid"><strong>Please fill out all of the fields on the page.</strong></p>
    <form class="max-w-[400px] w-full mx-auto flex flex-col gap-8 justify-start">
      <!--   use imported components to build out the form that we then submit to store data in pinia. View components to see available props.   -->
      <!--   by v-modeling to update Pinia, we can actually update the answers store object on the fly with new data not included in the initial defaults.   -->
      <TextField field-title="Name" placeholder="Drew Johnson" required v-model="answerStore.answers.name"></TextField>
      <TextField field-title="Email" placeholder="drew@getoveralls.com" required v-model="answerStore.answers.email"></TextField>
      <!--   Because we are v-modeling directly to the pinia store, you can actually add an existing component field on the fly like below.
             for example purposes, this question is not included in the pinia store defaults but is hardcoded to render at the results page
      -->
      <TextField field-title="Pet's Name" placeholder="Ripley" required v-model="answerStore.answers.petsName"></TextField>
      <RadioGroupInput field-title="Do you live in New York?" :options="['Yes', 'No']" required v-model="answerStore.answers.liveInNewYork"></RadioGroupInput>
    </form>
    <div class="container-xs flex justify-end items-center w-full">
      <!--   Using button prevent to stop default refresh on form submission to keep pinia data.   -->
      <button
          type="submit"
          @click.stop.prevent="submitForm"
          class="btn">Next questions</button>
    </div>
  </div>
</template>