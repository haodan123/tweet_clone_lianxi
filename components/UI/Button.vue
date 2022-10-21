<template>
  <!-- 封装按钮组件 -->
  <button
  @click="handleClick"
    class="flex justify-center text-white bg-blue-400 rounded-full hover:bg-blue-500 font-semibold disabled:bg-blue-300 disabled:cursor-not-allowed"
    :disabled="disabled" :class="classes">

    <span :class="textFontSize">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>

const emits = defineEmits(['onClick'])

  const props = defineProps({
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md'
    },
    liquid: {
      type: Boolean,
      default: false
    }
  })

  const paddingClasses = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'px-2 py-2'
        case 'lg':
          return 'px-4 py-4'
        
          default:
        return 'px-3 py-3'
    }
  })
  const textFontSize = computed(() => {
    switch (props.size) {
      case 'lg':
        return 'text-md'
      default:
        return 'text-sm'
    }
  })

  const defaultWidth = computed(()=>{
    switch (props.size) {
   
      default:
        return 'w-min'
    }
  })

  const classes = computed(() => `${paddingClasses.value} ${props.liquid?'w-full':defaultWidth.value}`)

  const handleClick = (e)=>{
    emits('onClick',e)
  }
</script>

<style lang='less' scoped>

</style>