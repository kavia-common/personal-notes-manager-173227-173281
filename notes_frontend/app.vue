<template>
  <div class="min-h-screen bg-[var(--color-background)]">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// No global logic needed here; layout handles chrome
</script>
