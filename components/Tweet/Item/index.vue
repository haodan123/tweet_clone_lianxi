<template>
  <div>
    <!-- 推文标头 -->
    <TweetItemHeader :tweet="tweet" />
    <!-- 渲染推文内容 -->
    <div :class="tweetBodyWrapper">

      <p :class="textSize" class="flex-shrink w-auto font-medium text-gray-800 dark:text-white">
        {{tweet.text}}
      </p>
      <div :key="item.id" v-for="(item) in tweet.mediaFiles" class="flex my-3 mr-2 border-2 rounded-2xl"
        :class="twitterBorderColor">
        <img class="w-full rounded-2xl" :src="item.url" alt="">
      </div>

      <!-- 下方的评论和转发 -->
      <!-- 如果你是点击评论区的回复进来的话，隐藏图标 -->
      <div class="mt-2" v-if="!hideActions">
        <TweetItemActions @on-comment-click="handleCommentClick" :compact="props.compact" :tweet="tweet" color="blue">
        </TweetItemActions>
      </div>

    </div>



  </div>
</template>

<script setup>
  const {
    twitterBorderColor
  } = useTailwindConfig()
  // 引入eventbus
  const emitter = useEmitter()
  const props = defineProps({
    tweet: {
      type: Object,
      required: true
    },
    compact: {
      type: Boolean,
      default: false
    },
    hideActions: {
      type: Boolean,
      default: false
    },
  })
  // 如果你是被回复的列表 
  const tweetBodyWrapper = computed(() => props.compact ? 'ml-16' : 'ml2')

  const textSize = computed(() => props.compact ? 'text-base' : 'text-2xl')

  // 点击评论
  const handleCommentClick = () => {

    emitter.$emit('replyTweet', props.tweet)
  }
</script>

<style lang='less' scoped>

</style>