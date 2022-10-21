<template>
  <div>
    <!-- 数组为空显示没有推文 -->
    <div v-if="isEmptyArray" class="p-4">
      <p class=" text-center text-gray-500">
        No tweets 😭
      </p>
    </div>

    <div v-else class="pb-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300" v-for="(item) in tweets"
      @click.native="redirect(item)" :key="item.id" :class="[twitterBorderColor,defaultTransition]">
      <TweetItem :compact="true" :tweet="item" />
    </div>


  </div>
</template>

<script setup>
  const {
    twitterBorderColor,
    defaultTransition
  } = useTailwindConfig()
  const props = defineProps({
    tweets: {
      type: Array,
      required: true
    }
  })
  const isEmptyArray = computed(() => props.tweets.length === 0)

  const redirect = (tweet)=>{
    console.log(tweet);
    navigateTo(`/status/${tweet.id}`)
  }
</script>

<style lang='less' scoped>

</style>