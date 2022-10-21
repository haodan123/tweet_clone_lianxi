<template>
  <div>
    <label v-if="label" for="" class="block pl-3 ml-px text-sm font-medium text-gray-700">{{label}}</label>
    <div class="mt-1">
      <input 
      @input="e=>emits('update:modelValue',e.target.value)"
      :type="type" :value="modelValue" :placeholder="placeholder"
        class="block w-full px-4 border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
    </div>
  </div>
</template>

<script setup>
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: null
    },
    modelValue: {
      type: String,
      required: true
    }
  })
</script>

<style lang='less' scoped>

</style>