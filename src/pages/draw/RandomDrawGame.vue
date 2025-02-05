<script setup lang="ts">
import type {CardType} from "../../components/deck/composables/deckOfCards.ts";
import Deck from "../../components/deck/Deck.vue";
import Pile from "../../components/pile/Pile.vue";

// interface RandomDrawGameState {
//   // deckId: string|null,
// }
//
// const gameState = <RandomDrawGameState>reactive({
//   // deckId: null,
// })
const currentCard: Ref<CardType|null> = ref()

</script>

<template>
  <div class="random-draw-container">
    <div style="display: flex;">
      <Deck :show-flip="false" @cardDraw="currentCard =$event"></Deck>
      <Pile :card="currentCard"/>
    </div>
  </div>
</template>

<style scoped>
.random-draw-container {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 2px solid black;
  box-shadow: 2px 2px 2px black;
}
.random-draw-container {
  @media (max-width: 320px) {
    width: 100vw;
  }
  @media (min-width: 321px) and (max-width: 800px) {
    width: 90vw;
  }
  @media (min-width: 801px) and (max-width: 1200px) {
    width: 900px;
  }
  @media (min-width: 1201px) {
    width: 1200px;
  }
}
</style>
