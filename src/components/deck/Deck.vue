<script setup lang="ts">
import {ref, onMounted} from 'vue';
import type {Ref} from 'vue';
import Card from "../card/Card.vue";
import type {CardType} from "../deck/composables/deckOfCards.ts";
import Button from 'primevue/button';
import {useDeckOfCards} from "./composables/deckOfCards.ts";

const props = defineProps<{ showFlip: boolean }>()
const emit = defineEmits(['cardDraw', 'reset'])

const {initDeck, deckId, drawCard, remaining} = useDeckOfCards()

const cardShow = ref(false)

const currentCard: Ref<CardType|null|undefined> = ref(null)

const resetDeck = async () => {
  await initDeck()
  emit('reset')
}

onMounted(async () => {
  await initDeck()
})

const flipCard = (v: boolean) => {
  if (props.showFlip) {
    cardShow.value = v
  }
  if (remaining.value > 0) {
    drawCard().then(c => {
      currentCard.value = c
      emit('cardDraw', c)
      console.log(currentCard.value)
    })
  }
}
</script>

<template>
  <div style="align-content: center;">
    <div style="position: relative;">
      <div v-if="deckId" class="deck-of-cards" :key="deckId">
        <div class="card-deck" v-if="remaining > 1">
          <Card :show-card="false" :allow-toggle="false" :card="null"/>
        </div>
        <div class="top-card card-up" v-show="remaining > 0" title="Click to draw">
          <Card :show-card="cardShow" :allow-toggle="true" :card="currentCard" @update:show-card="flipCard"/>
        </div>
      </div>
    </div>
    <div>{{remaining}} cards remaining </div>
    <Button style="height: 30px;" @click="resetDeck">Reset Deck</Button>
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
    cursor: pointer;
    position: absolute;
    left: 15px;
    top: 5px;
  }
}
</style>
