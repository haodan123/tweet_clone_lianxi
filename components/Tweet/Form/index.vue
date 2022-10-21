<template>
  <div>

    <div v-if="loading" class="flex justify-center items-center py6">
      <UISpinner />
    </div>

    <div v-else>
      <!-- 如果是点击评论区弹出来的显示上面的详情 并且隐藏下方的四个图标 -->
      <TweetItem hideActions :tweet="replyTo" v-if="showReply&&replyTo"/>
      <TweetFormInput :placeholder="placeholder" :user="user" @onSubmit="handleFormSubmit" />
    </div>


  </div>
</template>

<script setup>
const emits = defineEmits(['onSuccess'])
  const {
    postTweet,
  } = useTweets()
  const props = defineProps({
    user: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      default: '你想说点什么？'
    },
    replyTo: {
      type: Object,
      default: null
    },
    showReply: {
        type: Boolean,
        default: false
    }
  })
  const loading = ref(false)

  const handleFormSubmit = async (data) => {
    // console.log(data.mediaFiles);
    loading.value = true
    try {
      // 表单的图片处理在useTweet组件里面 的postTweet做过了
      console.log(props.replyTo);
      const res = await postTweet({
        text: data.text,
        mediaFiles: data.mediaFiles,
        // 如果是回复框 传入id
        replyTo:props.replyTo?.id
      })
      console.log(res);
      // 发送或回复成功，把数据返回到父页面
      emits('onSuccess',res.tweet)
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false
    }
  }
</script>

<style lang='less' scoped>

</style>