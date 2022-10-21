<template>
  <div>

    <MainSection :title="'home'" :loading="loading">

      <!-- 修改网页页面的名称 -->

      <Head>
        <Title>Home/Twitter</Title>
      </Head>

      <div class="border-b" :class="twitterBorderColor">
        <TweetForm @on-success="handleFormSuccess" :user="user" />
      </div>

      <TweetListFeed :tweets="homeTweets"/>

    </MainSection>

  </div>
</template>

<script setup>
  const {
    getTweets
  } = useTweets()
  const {
    twitterBorderColor
  } = useTailwindConfig()
  const loading = ref(false) //加载时间
  // listfeed的渲染数组
  const homeTweets = ref([])
  const {
    useAuthUser
  } = useAuth()
  const user = useAuthUser()
   // 发送或回复成功就重新跳转到详情页面
   const handleFormSuccess = (tweet) => {
    console.log(111);
    navigateTo({
      path: `/status/${tweet.id}`
    })
  }

  // 刚进页面加载页面 获取评论列表
  onBeforeMount(async () => {
    loading.value = true
    try {
      const res = await getTweets()
      console.log(res);
      homeTweets.value = res.tweets
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false
    }
  })
</script>

<style lang='less' scoped>

</style>