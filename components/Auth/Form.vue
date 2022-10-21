<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter/>
      </div>
    </div>

    <div class="pt-5 space-y-6">

      <UIInput placeholder="@username" v-model="data.username" label="username"></UIInput>
      <UIInput placeholder="****" v-model="data.password" type="password" label="password"></UIInput>

      <UIButton @click="handleLogin" liquid :disabled="isButtonDisabled">
        登录
      </UIButton>
      <!-- <div>
        <button @click="handleLogin"></button>
      </div> -->
    </div>

  </div>
</template>

<script setup>
  const {
    login
  } = useAuth()
  const data = reactive({
    username: '',
    password: '',
    loading: false
  })

  const handleLogin = async () => {
    data.loading = true
    console.log(111);
    try {
      // 注册号完成的账号：
      // username：haodan
      // password：123456 字符串的
      // email:2509461368@qq.com
      // const data = 
      await login({
        username: data.username,
        password: data.password
      })
      // console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      data.loading = false
    }

    const res = await login(data)
    console.log(res);
  }
  // const submit = async () => {
  //   console.log(11);
  //   const res = await useAuth(data)
  //   console.log(res);
  // }
  // 如果没有输入账号密码则不能登陆
  const isButtonDisabled = computed(() => {
    return (!data.username || !data.password) || data.loading
})
</script>

<style lang='less' scoped>

</style>