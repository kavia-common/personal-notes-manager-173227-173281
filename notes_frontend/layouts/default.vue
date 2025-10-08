<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-72 bg-white border-r border-gray-100 p-4 flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <div class="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500/80 to-amber-400/80 shadow-soft flex items-center justify-center">
          <span class="text-white font-bold">N</span>
        </div>
        <div>
          <h1 class="text-lg font-semibold text-gray-900">Ocean Notes</h1>
          <p class="text-xs text-gray-500">Personal notes manager</p>
        </div>
      </div>

      <div>
        <input
          v-model="search"
          type="text"
          placeholder="Search notes..."
          class="ocean-input"
        />
      </div>

      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">Tags</span>
        <button class="ocean-button-ghost text-sm" @click="clearTagFilter" v-if="activeTag">
          Clear
        </button>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="toggleTag(tag)"
          :class="[
            'px-3 py-1 rounded-full text-xs border transition-colors',
            activeTag === tag
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100'
          ]"
        >
          #{{ tag }}
        </button>
        <p v-if="allTags.length === 0" class="text-xs text-gray-400">No tags yet</p>
      </div>

      <div class="mt-auto">
        <NuxtLink to="/note/new" class="ocean-button w-full justify-center">
          <span class="i">＋</span>
          New Note
        </NuxtLink>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-6">
      <div class="mx-auto max-w-5xl">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useNotes } from '~/composables/useNotes'

const { setSearchQuery, setActiveTag, activeTag, allTags, searchQuery } = useNotes()

const search = computed({
  get: () => searchQuery.value,
  set: (v: string) => setSearchQuery(v),
})

function toggleTag(tag: string) {
  setActiveTag(activeTag.value === tag ? '' : tag)
}
function clearTagFilter() {
  setActiveTag('')
}
</script>
