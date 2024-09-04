<script setup>
import { ref, computed } from 'vue'
// Importing field components to build subsequent form on the fly
import TextField from '@/components/TextField.vue'
import RadioGroupInput from '@/components/RadioGroupInput.vue'
import { useAnswerStore } from '@/stores/answers.js'

const answerStore = useAnswerStore()

const invalid = ref(false)

// update store values when input changes so if a user refreshes it still stores the data until resetting at end of form.
const updateValues = computed(() => {
  answerStore.updateAnswers({
    name: answerStore.answers.name,
    email: answerStore.answers.email,
    liveInNewYork: answerStore.answers.liveInNewYork
  })
})

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
      <TextField
          field-title="Name"
          placeholder="Troy Barnes"
          v-model="answerStore.answers.name"
          @input="updateValues"
          required
      ></TextField>
      <TextField
          field-title="Email"
          placeholder="tbarnes@getoveralls.com"
          v-model="answerStore.answers.email"
          @input="updateValues"
          required
      ></TextField>
      <RadioGroupInput
          field-title="Do you live in New York?"
          :options="['Yes', 'No']"
          v-model="answerStore.answers.liveInNewYork"
          required
      ></RadioGroupInput>
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