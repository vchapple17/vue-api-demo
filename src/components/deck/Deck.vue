<script setup lang="ts">
import {ref, onMounted} from 'vue';
import type {Ref} from 'vue';
import Card from "../card/Card.vue";
import type {CardType} from "../deck/composables/deckOfCards.ts";
import Button from 'primevue/button';
import {useDeckOfCards} from "./composables/deckOfCards.ts";

const props = defineProps<{ showFlip: boolean }>()

const {initDeck, deckId, drawCard, remaining} = useDeckOfCards()

const cardShow = ref(false)

const currentCard: Ref<CardType|null> = ref()

onMounted(async () => {
  await initDeck()
})

const flipCard = (v: boolean) => {
  if (props.showFlip) {
    cardShow.value = v
  }
  drawCard().then(c => {
    currentCard.value = c
    emit('cardDraw', c)
  })
  console.log(currentCard.value)
}
</script>

<template>
  <div style="align-content: center;">
    <div style="position: relative;">
      <div v-if="deckId" class="deck-of-cards" :key="deckId">
        <div class="card-deck">
          <Card :show-card="false" :allow-toggle="false" :card="null"/>
        </div>
        <div class="top-card card-up">
          <Card :show-card="cardShow" :allow-toggle="true" :card="currentCard" @update:show-card="flipCard"/>
        </div>
      </div>
    </div>
    <div>{{remaining}} cards remaining </div>
    <Button style="height: 30px;" @click="initDeck">Reset Deck</Button>
  </div>
</template>

<style scoped>
.deck-of-cards {
  height: 325px;
  width: 280px;
  .card-deck {
    position: absolute;
  }
  .top-card {
    position: absolute;
    left: 15px;
    top: 5px;
  }
}
</style>
