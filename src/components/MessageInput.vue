<script setup>
import {defineProps} from "vue";

const model = defineModel()

// props for the component
defineProps({
  fieldTitle: String,
  placeholder: String,
  required: Boolean
})

// camelize case so we can componentize the field name while allowing for proper labelling
const camelize = (text) => {
  const getCamelized = text.toLowerCase().replace(/[^?a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
  return getCamelized.replace('?', '')
}
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <label class="font-bold tracking-wider" :for="camelize(fieldTitle)">{{ fieldTitle }}</label>
    <textarea
        class="border border-sky-100 rounded-lg bg-transparent p-2 placeholder-slate-50/25 focus:placeholder-transparent transition-all duration-300"
        :id="camelize(fieldTitle)"
        :name="camelize(fieldTitle)"
        :placeholder="placeholder"
        rows="5"
        cols="50"
        v-model="model"
    ></textarea>
  </div>
</template>