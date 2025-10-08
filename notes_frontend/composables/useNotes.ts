/* PUBLIC_INTERFACE
Composable to manage notes with localStorage persistence, search, and tag filtering.
*/
import { v4 as uuidv4 } from '~/composables/uuid-shim'

type Note = {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'notes.v1'

let initialized = false

const _notes = ref<Note[]>([])
const searchQuery = ref<string>('')
const activeTag = ref<string>('')

function loadFromStorage(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      _notes.value = JSON.parse(raw)
    } else {
      seedNotes()
    }
  } catch {
    _notes.value = []
  }
}

function saveToStorage(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_notes.value))
  } catch {
    // swallow
  }
}

function seedNotes(): void {
  const now = new Date().toISOString()
  _notes.value = [
    {
      id: uuidv4(),
      title: 'Welcome to Ocean Notes',
      content:
        'This is a sample note. Use the sidebar to search or filter by tags.\n\n- Create, edit, and delete notes\n- Add tags to organize\n- Use Cmd/Ctrl+S to save',
      tags: ['ideas', 'work'],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuidv4(),
      title: 'Project Thoughts',
      content: 'Collect thoughts for your projects here. Add #ideas and #todos.',
      tags: ['ideas'],
      createdAt: now,
      updatedAt: now,
    },
  ]
  saveToStorage()
}

const filteredNotes = computed<Note[]>(() => {
  let list = _notes.value
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      n =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    )
  }
  if (activeTag.value) {
    list = list.filter(n => n.tags.includes(activeTag.value))
  }
  // sort by updatedAt desc
  return [...list].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
})

const allTags = computed<string[]>(() => {
  const s = new Set<string>()
  for (const n of _notes.value) {
    for (const t of n.tags) s.add(t)
  }
  return Array.from(s).sort((a, b) => a.localeCompare(b))
})

// PUBLIC_INTERFACE
export function useNotes() {
  /** Initialize once on client to load notes from localStorage */
  function init() {
    if (initialized) return
    if (process.client) {
      loadFromStorage()
      initialized = true
    }
  }

  /** Create a new note */
  // PUBLIC_INTERFACE
  function createNote(payload: { title: string; content: string; tags: string[] }): Note {
    const now = new Date().toISOString()
    const note: Note = {
      id: uuidv4(),
      title: payload.title || 'Untitled',
      content: payload.content || '',
      tags: payload.tags || [],
      createdAt: now,
      updatedAt: now,
    }
    _notes.value.unshift(note)
    saveToStorage()
    return note
  }

  /** Update an existing note */
  // PUBLIC_INTERFACE
  function updateNote(id: string, payload: Partial<Omit<Note, 'id' | 'createdAt'>>): Note | null {
    const idx = _notes.value.findIndex(n => n.id === id)
    if (idx === -1) return null
    const updated: Note = {
      ..._notes.value[idx],
      ...payload,
      updatedAt: new Date().toISOString(),
    }
    _notes.value[idx] = updated
    saveToStorage()
    return updated
  }

  /** Delete a note by id */
  // PUBLIC_INTERFACE
  function deleteNote(id: string): boolean {
    const before = _notes.value.length
    _notes.value = _notes.value.filter(n => n.id !== id)
    saveToStorage()
    return _notes.value.length < before
  }

  /** Get a note by id */
  // PUBLIC_INTERFACE
  function getNote(id: string): Note | undefined {
    return _notes.value.find(n => n.id === id)
  }

  /** Search & filter state setters */
  function setSearchQuery(q: string) {
    searchQuery.value = q
  }
  function setActiveTag(tag: string) {
    activeTag.value = tag
  }

  onMounted(init)

  return {
    notes: _notes,
    filteredNotes,
    allTags,
    createNote,
    updateNote,
    deleteNote,
    getNote,
    searchQuery,
    setSearchQuery,
    activeTag,
    setActiveTag,
  }
}

export type { Note }
