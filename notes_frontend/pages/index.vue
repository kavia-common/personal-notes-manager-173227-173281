<template>
  <section>
    <header class="mb-4 flex items-center justify-between">
      <h2 class="text-xl font-semibold">Your Notes</h2>
      <NuxtLink to="/note/new" class="ocean-button">New Note</NuxtLink>
    </header>

    <div v-if="notes.length === 0" class="ocean-card p-8 text-center text-gray-500">
      <p>No notes yet. Click "New Note" to create your first note.</p>
    </div>

    <ul v-else class="grid gap-3">
      <li v-for="n in filteredNotes" :key="n.id">
        <NoteListItem :note="n" @click="go(n.id)" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useNotes } from '~/composables/useNotes'
import NoteListItem from '~/components/NoteListItem.vue'

const router = useRouter()
const { filteredNotes, notes } = useNotes()

function go(id: string) {
  router.push(`/note/${id}`)
}
</script>
