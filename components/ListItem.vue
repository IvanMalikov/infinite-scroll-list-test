<template>
    <div class="grid grid-rows-3 md:grid-cols-[1fr,1.5fr,0.5fr] md:grid-rows-none items-center md:gap-4 gap-2 md:p-4 p-2">
        <div class="flex gap-4 items-center">
            <img
                class="md:w-20 md:h-20 w-10 h-10"
                :src="item.avatar"
                alt="avatar"
            >
            <span>{{ item.name }}</span>
        </div>
        <div>
            {{ item.website }}
        </div>
        <div class="justify-self-end">
            {{ formatNumber(item.views) }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    item: {
        type: Object,
        default: () => {}
    }
})

const formatNumber = (num: number): string => num.toLocaleString()
</script>