import jwt_decode from 'jwt-decode'

export default () => {
  const useAuthToken = () => useState('auth_token')
  const useAuthUser = () => useState('auth_user')
  const useAuthLoading = () => useState('auth_loading', () => true)

  const setToken = (newToken) => {
    const authToken = useAuthToken()
    authToken.value = newToken
  }

  const setUser = (newUser) => {
    const authUser = useAuthUser()
    authUser.value = newUser
  }
  // 刷新页面时的加载动画
  const setIsAuthLoading = (value) => {
    const authLoading = useAuthLoading()
    authLoading.value = value
  }


  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {

        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: {
            username,
            password
          }
        })
        // console.log(data);
        setToken(data.access_token)
        setUser(data.user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
  // 刷新token
  const refreshToken = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/auth/refresh')
        setToken(data.access_token)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })

  }

  // 重新获取user信息
  const getUser = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi('/api/auth/user')
        setUser(data.user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })

  }

  // 
  const reRefreshAccessToken = () => {
    const authToken = useAuthToken()

    if (!authToken) return

    const jwt = jwt_decode(authToken.value)
    const newRefeshTime = jwt.exp - 60000
    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
      console.log(newRefeshTime);

    }, newRefeshTime);

  }

  //  储存token
  const initAuth = async () => {
    return new Promise(async (resolve, reject) => {
      // 开启加载动画
      setIsAuthLoading(true)
      try {
        // 重新获取token
        await refreshToken()
        // 重新获取user
        await getUser()
        //  刷新token
        reRefreshAccessToken()

        resolve(true)
      } catch (error) {
        reject(error)
      } finally {
        // 请求完成关闭加载动画
        setIsAuthLoading(false)
      }
    })

  }

  // 退出登录
  const logout = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await useFetchApi('/api/auth/logout', {
                method: 'POST'
            })

            setToken(null)
            setUser(null)
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

  return {
    login,
    useAuthToken,
    useAuthUser,
    initAuth,
    useAuthLoading,
    logout
  }
}