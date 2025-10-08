<template>
  <transition name="fade">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative ocean-card w-[90vw] max-w-md p-6">
        <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
        <p class="text-sm text-gray-600 mb-6">{{ message }}</p>
        <div class="flex justify-end gap-2">
          <button class="ocean-button-ghost" @click="$emit('cancel')">Cancel</button>
          <button
            class="ocean-button"
            :class="theme === 'danger' ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300' : ''"
            @click="$emit('confirm')"
          >
            {{ confirmText || 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  message: string
  confirmText?: string
  theme?: 'default' | 'danger'
}>()

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>
