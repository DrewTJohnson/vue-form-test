<script setup>
import { defineProps } from 'vue'

const model = defineModel()

// props to define field
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
  <div class="flex flex-col justify-start items-start gap-2">
    <label :for="camelize(fieldTitle)" class="font-bold tracking-wider">{{ fieldTitle }}</label>
    <input
        class="w-full rounded border border-sky-100 text-slate-50 bg-transparent py-1 px-2 placeholder-slate-50/25 focus:placeholder-transparent transition-all duration-300"
        type="text"
        :id="camelize(fieldTitle)"
        :name="fieldTitle.toLowerCase()"
        :placeholder="placeholder"
        :required="required"
        v-model="model"
    />
  </div>
</template>