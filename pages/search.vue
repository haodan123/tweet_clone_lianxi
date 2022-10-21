<template>
  <div>

    <MainSection :title="'Search'" :loading="loading">

      <!-- 修改网页页面的名称 -->

      <Head>
        <Title>Search</Title>
      </Head>


      <!-- {{searchTweets}} -->
      <TweetListFeed :tweets="searchTweets" />

    </MainSection>

  </div>
</template>

<script setup>
  const {
    getTweets: getTweetsComposable
  } = useTweets()

  const loading = ref(false) //加载时间
  // listfeed的渲染数组
  const searchTweets = ref([])
  // 获取路由参数
  const searchQuery = useRoute().query.q

  watch(() => useRoute().fullPath, () => getTweets())

  // 刚进页面加载页面 获取评论列表
  onBeforeMount(async () => {
    getTweets()
  })

  const getTweets = async () => {
    loading.value = true
    try {
      const {
        tweets
      } = await getTweetsComposable({
        query: searchQuery
      })
      searchTweets.value = tweets
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false
    }
  }
</script>

<style lang='less' scoped>

</style>