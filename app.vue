<template>
  <div :class="{'dark':darkMode}">
    <div class=" bg-white dark:bg-dim-900">

      <LoadingPage v-if="isAuthLoading"></LoadingPage>

      <div v-else-if="user" class='min-h-full'>

        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">

          <!-- 左边的sidebar -->
          <div class=" hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft :user="user" @onTweet="handleOpenTweetModal"
              @onLogout="handleLogout"></SidebarLeft>
            </div>
          </div>

          <!-- 中间的内容 -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view></router-view>
          </main>

          <!-- 右边的sidebar -->
          <div class=" hidden col-span-12  md:block xl:col-span-4 md:col-span-3 ">
            <div class="sticky top-0">
              <SidebarRight></SidebarRight>
            </div>
          </div>

        </div>

      </div>

      <AuthPage v-else> </AuthPage>

    </div>
    <!-- 发布推文或回复的弹出框 -->
    <UIModal :isOpen="postTweetModal" @onClose="handleModalClose">
      <TweetForm :replyTo="replyTweet" showReply @onSuccess="handleFormSuccess" :user="user" />
    </UIModal>
  </div>
</template>

<script setup>
  // 切换暗黑模式
  const darkMode = ref(false)
  // 引入eventbus
  const emitter = useEmitter()
  const {
    usePostTweetModal,
    closePostTweetModal,
    openPostTweetModal,
    useReplyTweet
  } = useTweets()
  // 弹窗状态
  const postTweetModal = usePostTweetModal()

  const {
    useAuthUser,
    initAuth,
    useAuthLoading,
    logout
  } = useAuth()
  // 获取用户信息
  const user = useAuthUser()
  // 退出登录
  const handleLogout = async()=>{
// alert(11)
logout()
  }

  // 刷新时的加载状态
  const isAuthLoading = useAuthLoading()
  // 如果你点击了评论区的回复 传回来的数据
  const replyTweet = useReplyTweet()
  // 切换暗黑模式
  emitter.$on('toggleDarkMode', () => {
    darkMode.value = !darkMode.value
  })

  // 评论区点击回复时
  emitter.$on('replyTweet', (tweet) => {
    openPostTweetModal(tweet)
  })

  // 每次刷新都重新获取token 和用户信息 
  onBeforeMount(() => {
    initAuth()
  })

  // 发送或回复成功就重新跳转到详情页面
  const handleFormSuccess = (tweet) => {
    closePostTweetModal()
    navigateTo({
      path: `/status/${tweet.id}`
    })
  }
  // 关闭弹窗
  const handleModalClose = () => {
    closePostTweetModal()
  }
  // 点击左侧的打开发送推文的弹窗
  const handleOpenTweetModal = () => {
    openPostTweetModal(null)
  }
</script>

<style scoped>

</style>