<template>
  <button
    class="w-full text-left ocean-card p-4 hover:shadow transition-shadow duration-200 ease-soft-out"
    @click="$emit('click')"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <h3 class="text-base font-semibold text-gray-900 truncate">{{ note.title || 'Untitled' }}</h3>
        <p class="text-sm text-gray-600 line-clamp-2 mt-1">
          {{ snippet }}
        </p>
        <div class="flex flex-wrap gap-2 mt-2">
          <span v-for="t in note.tags" :key="t" class="tag-chip">#{{ t }}</span>
        </div>
      </div>
      <time class="text-xs text-gray-400 whitespace-nowrap">
        {{ timeAgo }}
      </time>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Note } from '~/composables/useNotes'

const props = defineProps<{ note: Note }>()
const snippet = computed(() => {
  const c = props.note.content || ''
  return c.length > 140 ? c.slice(0, 140) + '…' : c
})

function formatRelative(d: Date) {
  const diff = Date.now() - d.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString()
}

const timeAgo = computed(() => {
  return formatRelative(new Date(props.note.updatedAt))
})
</script>
