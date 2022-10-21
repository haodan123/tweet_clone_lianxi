<template>
  <div>

    <TweetItem :tweet="tweet" />

    <TweetForm @on-success="handleFormSuccess" :reply-to="props.tweet" placeholder="想回复什么" :user="user" />

    <TweetListFeed :tweets="replies" />

  </div>
</template>

<script setup>
  const props = defineProps({
    user: {
      type: Object,
      required: true
    },
    tweet: {
      type: Object,
      required: true
    }
  })
  // 传过来的数据如果有就赋值，没有就空
  const replies = computed(() => {
    return props.tweet?.replies || []
  })
  // 发送或回复成功就重新跳转到详情页面
  const handleFormSuccess = (tweet) => {
    console.log(111);
    navigateTo({
      path: `/status/${tweet.id}`
    })
  }
</script>

<style lang='less' scoped>

</style>