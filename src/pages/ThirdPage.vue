<script setup>
import {computed, ref} from 'vue'
import CheckboxGroupInput from '@/components/CheckboxGroupInput.vue'
import { useAnswerStore } from '@/stores/answers.js'
import TextField from '@/components/TextField.vue'

/*
* This page component is set up in a very similar fashion to first-page and second-page
* skipping redundant comments for this reason.
* */

const answerStore = useAnswerStore()

const invalid = ref(false)

const updateValues = computed(() => {
  answerStore.updateAnswers({
    typeOfPets: answerStore.answers.typeOfPets,
    whatKinds: answerStore.answers.whatKinds
  })
})

const submitForm = () => {
  return window.location.hash = "/results"
}
</script>

<template>
  <div class="container h-full flex flex-col gap-8 justify-center items-center">
    <p class="text-red-500" v-show="invalid"><strong>Please fill out all of the fields on the page.</strong></p>
    <form class="max-w-[400px] w-full mx-auto flex flex-col gap-8 justify-start">
      <CheckboxGroupInput
          field-title="What kind of pets do you have?"
          :options="[
              `Cats`,
              `Dogs`,
              `Ostriches`,
              `Other`
          ]"
          v-model="answerStore.answers.typeOfPets"
          @change="updateValues"
          required
      ></CheckboxGroupInput>
      <TextField
          field-title="What other kind of pets do you have?"
          placeholder="Mouse"
          v-if="answerStore.answers.typeOfPets.includes('Other')"
          v-model="answerStore.answers.whatKinds"
          @input="updateValues"
          required
      ></TextField>
    </form>
    <div class="container-xs flex justify-between items-center w-full">
      <a href="/#/second-page" class="btn">Prev Questions</a>
      <button
          type="submit"
          @click.stop.prevent="submitForm"
          class="btn">See Results</button>
    </div>
  </div>
</template>