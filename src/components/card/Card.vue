<script setup lang="ts">
import type {CardType} from "../deck/composables/deckOfCards.ts";
import BackOfCard from "./components/BackOfCard.vue";
import FrontOfCard from "./components/FrontOfCard.vue";

const props = defineProps<{
  allowToggle: boolean,
  showCard: boolean,
  card: CardType|null|undefined,
}>()

const emits = defineEmits(['update:showCard'])

const toggleCard = () => {
  emits('update:showCard', !props.showCard)
}
</script>

<template>
  <div class="top-card">
    <FrontOfCard v-if="showCard && card" @click="toggleCard" :card="card"/>
    <BackOfCard v-else @click="toggleCard"/>
  </div>

</template>

<style scoped>
</style>
