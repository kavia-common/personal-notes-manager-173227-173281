<template>
  <section>
    <header class="mb-4 flex items-center justify-between">
      <NuxtLink to="/" class="ocean-button-ghost">&larr; Back</NuxtLink>
      <div class="flex items-center gap-2">
        <button class="ocean-button bg-red-500 hover:bg-red-600 focus:ring-red-300" @click="confirmDelete = true">
          Delete
        </button>
        <button class="ocean-button" @click="save">Save</button>
      </div>
    </header>

    <NoteEditor
      v-if="model"
      v-model:title="model.title"
      v-model:content="model.content"
      v-model:tags="model.tags"
      :updated-at="model.updatedAt"
      @save="save"
    />

    <ConfirmDialog
      :open="confirmDelete"
      title="Delete Note"
      message="This action cannot be undone. Are you sure you want to delete this note?"
      confirm-text="Delete"
      theme="danger"
      @confirm="doDelete"
      @cancel="confirmDelete = false"
    />
  </section>
</template>

<script setup lang="ts">
import { useNotes, type Note } from '~/composables/useNotes'
import NoteEditor from '~/components/NoteEditor.vue'
import ConfirmDialog from '~/components/ConfirmDialog.vue'

const route = useRoute()
const router = useRouter()
const { getNote, updateNote, deleteNote } = useNotes()

const noteId = computed(() => String(route.params.id || ''))
const original = computed<Note | undefined>(() => getNote(noteId.value))

const model = reactive<{ title: string; content: string; tags: string[]; updatedAt: string } | null>(
  original.value
    ? {
        title: original.value.title,
        content: original.value.content,
        tags: [...original.value.tags],
        updatedAt: original.value.updatedAt,
      }
    : null
)

watch(
  () => original.value,
  (n) => {
    if (!n) return
    model && Object.assign(model, {
      title: n.title,
      content: n.content,
      tags: [...n.tags],
      updatedAt: n.updatedAt,
    })
  },
  { immediate: true }
)

const confirmDelete = ref(false)

function save() {
  if (!original.value || !model) return
  updateNote(original.value.id, {
    title: model.title,
    content: model.content,
    tags: model.tags,
  })
  // Update timestamp in UI
  model.updatedAt = new Date().toISOString()
}

function doDelete() {
  if (!original.value) return
  deleteNote(original.value.id)
  confirmDelete.value = false
  router.push('/')
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
