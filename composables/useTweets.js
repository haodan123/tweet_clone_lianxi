export default () => {
  //控制发送推文的弹窗状态
  const usePostTweetModal = () => useState('post_tweet_modal', () => false)
  // 点击评论区的回复时的数据
  const useReplyTweet = () => useState('reply_tweet', () => null)

  // 关闭推文弹窗
  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModal()
    postTweetModal.value = false
  }

  const setReplyTo = (tweet) => {
    const replyTweet = useReplyTweet()
    replyTweet.value = tweet
  }

  // 打开推文弹窗
  const openPostTweetModal = (tweet = null) => {
    // 如果tweet穿了值，说明是点击评论区的回复时打开的弹窗，如果没穿tweet 默认为null 说明点击了左边的发送推文弹窗
    const postTweetModal = usePostTweetModal()
    postTweetModal.value = true
    setReplyTo(tweet)
  }
  // 发送推文
  const postTweet = (formData) => {
    const form = new FormData()
    form.append('text', formData.text)
    form.append('replyTo', formData.replyTo)
    // 上传图片
    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append('media_file_' + index, mediaFile)
    })

    return useFetchApi('/api/user/tweets', {
      method: 'POST',
      body: form
    })
  }

  const getTweets = (params = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await useFetchApi('/api/tweets', {
          method: 'GET',
          params
        })
        // console.log(res);
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  // 获取个人的推文
  const getTweetById = (tweetId) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(tweetId);
        const response = await useFetchApi(`/api/tweets/${tweetId}`)

        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }


  return { postTweet, getTweets, getTweetById, usePostTweetModal, closePostTweetModal, openPostTweetModal, useReplyTweet }

}