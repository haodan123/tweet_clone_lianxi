<template>
  <div>
    <MainSection :title="'Tweet'" :loading="loading">

      <!-- 修改网页页面的名称 -->

      <Head>
        <Title>Twitter</Title>
      </Head>


      <TweetDetails :user="user" :tweet="tweet" />
    </MainSection>
  </div>
</template>

<script setup>
  const loading = ref(false)
  // 存推文的数据
  const tweet = ref(null)
  const {
    getTweetById
  } = useTweets()
  const {
    useAuthUser
  } = useAuth()
  // 获取用户信息
  const user = useAuthUser()
  const {
    params
  } = useRoute()

  // 每回复一次就重新获取一次数据
  watch(() => useRoute().fullPath, () => {
    console.log(111);
    getTweet()
  })

  // 获取路由id
  const getTweetIdFromRoute = () => {
    return params.id
  }
  // 获取数据
  const getTweet = async () => {
    const id = getTweetIdFromRoute()
    loading.value = true
    try {
      const res = await getTweetById(id)
      console.log(res);
      tweet.value = res.tweet
    } catch (error) {
      console.dir(error);
    } finally {
      loading.value = false
    }
  }
  onBeforeMount(() => {
    getTweet()
  })
</script>

<style lang='less' scoped>

</style>