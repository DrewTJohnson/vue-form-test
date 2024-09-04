<script setup>
import { defineProps } from 'vue'

defineProps({
  optionTitle: String,
  required: Boolean,
  checked: Boolean,
})

const camelize = (text) => {
  return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}
</script>

<template>
  <div class="flex items-center gap-x-4">
    <input
        type="radio"
        :id="camelize(optionTitle)"
        :name="optionTitle"
        :required="required"
        :checked="checked"
    />
    <label :for="camelize(optionTitle)" class="label">{{ optionTitle }}</label>
  </div>
</template>