<script setup>
import { defineProps } from 'vue'

const model = defineModel()

// define props for the component
defineProps({
  fieldTitle: String,
  options: Array,
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
  <fieldset class="flex justify-start items-center gap-8">
    <legend class="font-bold tracking-wider mb-2">{{ fieldTitle }}</legend>
    <!--  grab the options set in the options prop and render them as potential radio buttons  -->
    <div v-for="(item, index) in options" class="flex items-center gap-x-4">
      <input
          type="radio"
          :id="camelize(item)"
          :name="camelize(fieldTitle)"
          v-model="model"
          :value="item"
      />
      <label :for="camelize(item)" class="label">{{ item }}</label>
    </div>
  </fieldset>
</template>