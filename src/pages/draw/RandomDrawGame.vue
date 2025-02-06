<script setup lang="ts">
import {type CardType, type DeckType, useDeck} from "../../composables/deck.ts";
import {type Ref, ref} from 'vue';
import Button from 'primevue/button'
import {onBeforeMount, reactive} from 'vue';
import {MODE_DRAW, MODE_FACE_UP} from "../../components/pile/constants.ts";
import Pile from "../../components/pile/Pile.vue";

interface RandomDrawGameState {
  deck: Ref<DeckType|null>|null,
  drawPile: Array<CardType>,
  drawPileName: string,
  discardPile: Array<CardType>,
  discardPileName: string,
}

const gameState = <RandomDrawGameState> reactive({
  deck: null,
  drawPile: [],
  drawPileName: 'draw',
  discardPile: [],
  discardPileName: 'discard',
})

const {
  deck,
  initDeck,
  drawCard,
  drawCardFromPile,
  addToPile,
} = useDeck()

const movingCard = ref(false)

const addToDrawPile = async (cards: Array<CardType>) => {
  await addToPile(gameState.drawPileName, cards)
  cards.every(c => gameState.drawPile.push(c))
}
const addToDiscardPile = async (cards: Array<CardType>) => {
  await addToPile(gameState.discardPileName, cards)
  cards.every(c => gameState.discardPile.push(c))
}
const removeCardFromDrawPile = async () => {
  let cards = await drawCardFromPile(gameState.drawPileName, 1)
  gameState.drawPile.splice(-1, 1)
  return cards
}
const removeCardFromDiscardPile = async () => {
  let cards = await drawCardFromPile(gameState.discardPileName, 1)
  gameState.discardPile.splice(-1, 1)
  return cards
}

const drawNext = async () => {
  if (movingCard.value !== true) {
    movingCard.value = true
    let cards = await removeCardFromDrawPile()
    await addToDiscardPile(cards)
    movingCard.value = false
  }
}

const undoDraw = async () => {
  if (movingCard.value !== true) {
    movingCard.value = true
    let cards = await removeCardFromDiscardPile()
    await addToDrawPile(cards)
    movingCard.value = false
  }
}

const resetDeck = async () => {
  // debounce in the future
  await initializeGame()
}

const initializeGame = async () => {
  if (movingCard.value !== true) {
    movingCard.value = true
    gameState.drawPile.splice(0)
    gameState.drawPile = []
    gameState.discardPile = []
    await initDeck() // new deck

    // Setup Draw Pile with all 52 cards
    gameState.deck = deck
    let cards = await drawCard(52)
    await addToDrawPile(cards)
    await addToDiscardPile([])
    movingCard.value = false
  }
}

onBeforeMount(async () => {
  await initializeGame()
})

</script>

<template>
  <div class="random-draw-container">
    <div style="display: flex; justify-content: center">
      <div style="display: block">
        <h3 style="margin-bottom: 0">Draw Pile</h3>
        <Pile :mode="MODE_DRAW" :pile="gameState.drawPile" @click="drawNext"/>
      </div>
      <div style="display: block">
        <h3 style="margin-bottom: 0">Discard Pile</h3>
        <Pile :mode="MODE_FACE_UP" :pile="gameState.discardPile" @click="undoDraw"/>
      </div>
    </div>
    <div>{{gameState.drawPile.length}} cards remaining </div>
    <Button style="height: 30px;" @click="resetDeck" :disabled="movingCard">New Deal</Button>
    <h3></h3>
  </div>
</template>

<style scoped>
.random-draw-container {
  margin-top: 20px;
  margin-bottom: 20px;
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
