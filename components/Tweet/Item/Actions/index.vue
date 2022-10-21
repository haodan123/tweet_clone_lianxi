<template>
  <div class="flex items-center justify-around w-full">

    <TweetItemActionsIcon color="blue" :size="size" 
    @on-click="emits('onCommentClick')">
      <template v-slot:icon="{ classes }">
        <ChatIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{tweet.repliesCount }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green" :size="size">
      <template v-slot:icon="{ classes }">
        <RefreshIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red" :size="size">
      <template v-slot:icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="blue" :size="size">
      <template v-slot:icon="{ classes }">
        <UploadIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

  </div>
</template>

<script setup>
  import {
    ChatIcon,
    RefreshIcon,
    HeartIcon,
    UploadIcon
  } from '@heroicons/vue/outline'

  const emits = defineEmits(['onCommentClick'])

  const props = defineProps({
    tweet: {
      type: Object,
      required: true
    },
    compact: {
      type: Boolean,
      default: false
    }
  })
  // 生成100以内的随机数
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100)
  }
  // 如果是被回复的列表，则不显示数量
  const showStats = computed(() => props.compact)
  const size = computed(() => props.compact ? 5 : 8)
  // console.log(props.tweet.repliesCount);
</script>

<style lang='less' scoped>

</style>