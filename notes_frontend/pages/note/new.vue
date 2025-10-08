<template>
  <section>
    <header class="mb-4 flex items-center justify-between">
      <NuxtLink to="/" class="ocean-button-ghost">&larr; Back</NuxtLink>
      <div class="flex items-center gap-2">
        <button class="ocean-button" @click="save">Create</button>
      </div>
    </header>

    <NoteEditor
      v-model:title="title"
      v-model:content="content"
      v-model:tags="tags"
      :updated-at="''"
      @save="save"
    />
  </section>
</template>

<script setup lang="ts">
import { useNotes } from '~/composables/useNotes'
import NoteEditor from '~/components/NoteEditor.vue'

const router = useRouter()
const { createNote } = useNotes()

const title = ref<string>('')
const content = ref<string>('')
const tags = ref<string[]>([])

function save() {
  const note = createNote({
    title: title.value.trim() || 'Untitled',
    content: content.value,
    tags: tags.value,
  })
  router.push(`/note/${note.id}`)
}

// Keyboard shortcut Cmd/Ctrl+S
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault()
      save()
    }
  }
  window.addEventListener('keydown', handler)
  onBeforeUnmount(() => window.removeEventListener('keydown', handler))
})
</script>
