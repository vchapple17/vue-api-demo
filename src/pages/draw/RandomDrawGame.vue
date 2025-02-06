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
  lastApiResponse,
  lastApiCall,
} = useDeck()

const movingCard = ref(false)

const addToDrawPile = async (cards: Array<CardType>) => {
  await addToPile(gameState.drawPileName, cards)
  cards?.every(c => gameState.drawPile.push(c))
}
const addToDiscardPile = async (cards: Array<CardType>) => {
  await addToPile(gameState.discardPileName, cards)
  cards?.every(c => gameState.discardPile.push(c))
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
    try {
      await initDeck() // new deck

      // Setup Draw Pile with all 52 cards
      gameState.deck = deck
      let cards = await drawCard(52)
      await addToDrawPile(cards)
      await addToDiscardPile([])
      movingCard.value = false
    } catch(e) {
      console.error(e)
    }
  }
}

onBeforeMount(async () => {
  await initializeGame()
})

</script>

<template>
  <div class="random-draw-container">

    <div style="display: flex; justify-content: center">
      <div style="display: block; width: 520px; text-align: start">
        <h3 style="margin-bottom: 0">Directions</h3>
        <ul>
          <li>Click on the draw pile to move the top card to a discard pile.</li>
          <li>Click on the discard pile to move the top card back to a draw pile.</li>
          <li>Click the "New Deal" button to get a new shuffled deck.</li>
        </ul>

        <h3 style="margin-bottom: 0">API Interactions</h3>
        <p>There are 4 API calls utilized in this mini-app to create the draw and discard piles</p>
        <ul>
          <li><strong>New Deck</strong>: Fetches a new deck from the API.</li>
          <li><strong>Draw Card From Deck</strong>: Fetches card(s) from this deck. This app draws all 52 cards, and places into the Draw Pile.</li>
          <li><strong>Draw Card From Pile</strong>: Moves a drawn card to a named pile ('draw' or 'discard')</li>
          <li><strong>Remove Card From Pile</strong>: Removes a drawn card from a named pile ('draw' or 'discard')</li>
        </ul>
      </div>

      <div style="display: block; justify-content: center;">
        <div style="display: flex; justify-content: center;">
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
      </div>
    </div>
  </div>
  <div class="game-explanation">
    <h3>Last Call and Parameters</h3>
    {{lastApiCall}}
    <h4>Last Response</h4>
    {{ lastApiResponse }}
  </div>
</template>

<style scoped>
.random-draw-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.game-explanation {
  padding: 20px;
  display: block;
  text-align: start;
  width: 100%;
  background-color: gray; color: black;
}
</style>
