<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold text-center mb-8">Poker Hand Odds</h1>
    <div class="text-center text-lg font-medium mb-4">
      Total Counted Hands: {{ totalCount.toLocaleString() }}
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <PokerHandCard v-for="hand in pokerHands(13, 4, 1)" :key="hand.name" :hand="hand" />
    </div>
  </div>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold text-center mb-8">Poker Hand (2 deck) Odds</h1>
    <div class="text-center text-lg font-medium mb-4">
      Total Counted Hands:
      {{ totalCount2.toLocaleString() + ' / ' + pokerHands(13, 4, 2)[0].totalHands }}
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <PokerHandCard v-for="hand in pokerHands(13, 4, 2)" :key="hand.name" :hand="hand" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PokerHandCard from './components/PokerHandCard.vue'
import pokerHands from './data/pokerHands'
const totalCount = pokerHands(13, 4, 1).reduce((sum, hand) => sum + hand.count, 0)
const totalCount2 = pokerHands(13, 4, 2).reduce((sum, hand) => sum + hand.count, 0)
</script>
