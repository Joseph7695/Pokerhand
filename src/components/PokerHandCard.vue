<script setup lang="ts">
defineProps({
  hand: Object,
})
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
    <h2 class="text-xl font-bold">{{ hand?.name }}</h2>
    <p class="text-gray-600">
      Odds: {{ ((hand?.count / hand?.totalHands) * 100).toFixed(4) + '%' }}
    </p>
    <p class="text-gray-600">Count: {{ hand?.count }}</p>
    <p class="text-gray-600">Calc odds: {{ hand?.totalHands / hand?.count }}</p>
  </div>
</template>

<style scoped></style>
