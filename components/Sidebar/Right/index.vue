<template>
  <div class="flex flex-col">
    <!-- 搜索框 -->
    <div class=" relative mt-2">
      <div class="flex absolute items-center h-full pl-4 text-gray-600 cursor-pointer">
        <div class="h-6 w-6">
          <SearchIcon @click="handleSearch" />
        </div>
      </div>
      <input v-model="search" placeholder="搜索写什么？" type="text"
        class="flex items-center w-full pl-12 text-sm font-normal  text-black dark:text-gray-100 bg-gray-200 border border-gray-200 rounded-full shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9">

    </div>

    <!-- Preview Card : 发生了什么 -->
    <SidebarRightPreviewCard title="What's happening">
      <SidebarRightPreviewCardItem v-for="(item,index) in whatsHappeningItems" :key="index">
        <div>
          <h2 class="font-bold text-gray-800  text-sm dark:text-white">{{item.title}}</h2>

          <p class="text-xs text-gray-400">
            {{item.count}}
          </p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <!-- Preview Card : 谁关注了你 -->
    <SidebarRightPreviewCard title="Who to follow">
      <SidebarRightPreviewCardItem v-for="(item, index) in whoToFollowItems" :key="index">
        <div class="flex flex-row items-center justify-between p-2">
          <div class="flex flex-row">

            <img class="w-10 h-10 rounded-full" :src="item.image" :alt="item.name">

            <div class="flex flex-col ml-2">
              <h2 class="text-sm font-bold text-gray-900 dark:text-white">
                {{item.name}}
              </h2>
              <p class="text-xs text-gray-400">{{item.handle}}</p>
            </div>
          </div>

          <div class="flex h-full">
            <button
              class="px-4 py-2  bg-black text-xs text-white rounded-full dark:bg-white dark:text-black">Follow</button>
          </div>
        </div>

      </SidebarRightPreviewCardItem>

    </SidebarRightPreviewCard>

    <footer>
      <ul class="mx-2 my-4 text-xs text-gray-500">
        <li class="inline-block mx-2">
          <a @click.prevent="handleToggleDatkMode" href="#" class="hover:underline">Dark mode</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Privacy Policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Cookie Policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Accessability</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Ads info</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">More</a>
        </li>
        <li class="inline-block mx-2">
          © 2022 Twitter, Inc.
        </li>
      </ul>
    </footer>

  </div>
</template>

<script setup>
  import {
    SearchIcon
  } from '@heroicons/vue/outline';
const emitter= useEmitter()

  const search = ref('')
  // 点击了搜索 跳转到搜索页面
  const handleSearch = async () => {
    const router = useRouter()
    router.push({
      path: '/search',

      query: {
        q: search.value
      }
    })
  }
  // 切换暗黑模式
  const handleToggleDatkMode = ()=>{
    // 用eventbus传事件
    emitter.$emit('toggleDarkMode')
  }
  // 发生了什么的循环数组
  const whatsHappeningItems = ref([{
      title: 'SpaceX',
      count: '18.8k Tweets'
    },
    {
      title: '#CodingIsFun',
      count: '8.8k Tweets'
    },
    {
      title: '#artforall',
      count: '1.8k Tweets'
    }
  ])
  // 关注了谁的循环数组
  const whoToFollowItems = ref([{
      name: 'Joe Biden',
      handle: '@JoeBiden',
      image: 'https://picsum.photos/200/200'
    },
    {
      name: 'Joe Biden',
      handle: '@JoeBiden',
      image: 'https://picsum.photos/200/200'
    },
    {
      name: 'Joe Biden',
      handle: '@JoeBiden',
      image: 'https://picsum.photos/200/200'
    }
  ])
</script>

<style lang='less' scoped>

</style>