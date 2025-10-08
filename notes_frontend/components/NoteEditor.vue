<template>
  <div class="ocean-card p-4 sm:p-6">
    <div class="flex flex-col gap-4">
      <input
        v-model="localTitle"
        type="text"
        placeholder="Title"
        class="ocean-input text-xl font-semibold"
      />

      <div>
        <label class="text-sm text-gray-600">Tags</label>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="(t, i) in localTags"
            :key="t + i"
            class="ocean-chip cursor-default group"
          >
            #{{ t }}
            <button
              class="ml-1 rounded-full w-5 h-5 bg-white/60 text-gray-600 hover:bg-white"
              @click="removeTag(t)"
              aria-label="Remove tag"
            >×</button>
          </span>

          <input
            v-model="tagInput"
            @keydown.enter.prevent="addTag"
            placeholder="Add tag and press Enter"
            class="ocean-input w-48"
          />
        </div>
      </div>

      <div>
        <label class="text-sm text-gray-600">Content</label>
        <textarea
          v-model="localContent"
          rows="14"
          placeholder="Write your note here... (Markdown-friendly)"
          class="ocean-input font-mono"
        />
        <p v-if="updatedAt" class="text-xs text-gray-400 mt-2">
          Last updated: {{ formatDate(updatedAt) }}
        </p>
      </div>

      <div class="flex gap-2 justify-end">
        <button class="ocean-button" @click="$emit('save')">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  content: string
  tags: string[]
  updatedAt?: string
}>()

const emit = defineEmits<{
  (e: 'update:title', v: string): void
  (e: 'update:content', v: string): void
  (e: 'update:tags', v: string[]): void
  (e: 'save'): void
}>()

const localTitle = computed({
  get: () => props.title,
  set: (v: string) => emit('update:title', v),
})
const localContent = computed({
  get: () => props.content,
  set: (v: string) => emit('update:content', v),
})
const localTags = computed({
  get: () => props.tags,
  set: (v: string[]) => emit('update:tags', v),
})

const tagInput = ref('')

function addTag() {
  const t = tagInput.value.trim()
  if (!t) return
  if (!localTags.value.includes(t)) {
    localTags.value = [...localTags.value, t]
  }
  tagInput.value = ''
}

function removeTag(tag: string) {
  localTags.value = localTags.value.filter(t => t !== tag)
}

function formatDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString()
}
</script>
