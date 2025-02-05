<script setup lang="ts">

import FrontOfCard from "../card/components/FrontOfCard.vue";
import type {CardType} from "../deck/composables/deckOfCards.ts";

const props = defineProps<{ card: CardType|undefined|null }>()

</script>

<template>
  <div class="pile-of-cards" v-if="card">
    <div class="card-pil">
      <FrontOfCard :card="card"></FrontOfCard>
    </div>
  </div>
</template>

<style scoped>
.pile-of-cards {
  background: black;
  margin-top: 10px;
  .card-pile {
  }
}

</style>
