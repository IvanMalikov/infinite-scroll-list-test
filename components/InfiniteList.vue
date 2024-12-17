<template>
  <div class="h-screen flex flex-col justify-center items-center gap-6">
      <div class="fixed top-0 flex gap-8 items-center justify-center p-4">
          <h2 class="font-bold md:text-3xl text-base text-center text-green-700">Medialister Home Assignment</h2>
          <button
              class="border-2 border-black rounded-lg p-2"
              @click="toggleSort"
          >
              Sort by views: {{ sortDirection }}
          </button>
      </div>
      <div
          v-if="isPending"
          class="animate-bounce"
      >
          Loading...
      </div>
      <div
          v-if="isSuccess"
          ref="scrollableContainer"
          class="w-4/5 h-[calc(100%-200px)] overflow-y-scroll smooth-scroll shadow-2xl rounded-lg"
      >
          <ListItem
              v-for="(item, idx) in sortedItems"
              :key="item.id"
              :item="item"
              :class="idx % 2 === 0 ? 'bg-slate-200' : 'bg-white'"
          />
          <div
              v-if="isFetchingNextPage"
              class="animate-pulse flex justify-center md:p-4 p-2"
          >
              Loading more data...
          </div>
          <div
              v-if="!hasNextPage"
              class="flex justify-center md:p-4 p-2"
          >
              No more data to load.
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ListItem } from '#components'
import { useInfiniteScroll } from '@vueuse/core'
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { Item, ApiResponse } from '~/types/items'
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

type SortOrder = 'asc' | 'desc'
const sortOrder = ref<SortOrder>('asc')
const scrollableContainer = ref<HTMLElement | null>(null)

const allItems = computed<Item[]>(() => {
    return data.value?.pages.flatMap((page) => page.items) || []
})

const sortedItems = computed<Item[]>(() => {
    return [...allItems.value].sort((a, b) => {
        return sortOrder.value === 'asc' ? a.views - b.views : b.views - a.views
    })
})

const sortDirection = computed<string>(() => sortOrder.value === 'asc' ? 'Ascending' : 'Descending')

const toggleSort = (): void => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const request = async({ pageParam = 1 }): Promise<ApiResponse> => {
    const { data } =  await axios.get('api/items', {
        params: { page: pageParam },
    })

    // artificial delay
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 2000)
    })

    return data
}

const {
    data,
    isSuccess,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
} = useInfiniteQuery<ApiResponse>({
    queryKey: ['items'],
    queryFn: request,
    getNextPageParam: (lastPage, allPages) => lastPage.hasNextPage ? allPages.length + 1 : undefined,
    initialPageParam: 1
})

useInfiniteScroll(scrollableContainer, async(): Promise<void> => {
    if (hasNextPage.value && !isFetchingNextPage.value) {
        await fetchNextPage()
    }
})

const saveScrollPosition = (): void => {
    if (scrollableContainer.value) {
        localStorage.setItem('scroll_position', scrollableContainer.value.scrollTop.toString())
    }
}

const restoreScrollPosition = async (): Promise<void> => {
    const savedPosition = localStorage.getItem('scroll_position')
    if (savedPosition && scrollableContainer.value) {
        await nextTick()
        scrollableContainer.value.scrollTop = parseInt(savedPosition, 10)
    }
}

onMounted((): void => {
    restoreScrollPosition()
    window.addEventListener('beforeunload', saveScrollPosition)
})

onBeforeUnmount((): void => {
    saveScrollPosition()
    window.removeEventListener('beforeunload', saveScrollPosition)
})
</script>