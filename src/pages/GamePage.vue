<script setup lang="ts">
import Select from "primevue/select";

interface Game {
  name: string;
  value: string;
}

const GAMES: Array<Game> = [
  {name: 'Draw', value: 'DRAW'},
  // {name: 'War', value: 'WAR'}
];

// defineProps<{ }>()

const selectedGame = ref<string>('')

import {ref} from "vue";
import Deck from "../components/card-deck/Deck.vue";
</script>

<template>

  <div class="heading">
    <h1>Select a card game:</h1>
    <Select
        v-model="selectedGame"
        class="game-select"
        :options="GAMES"
        placeholder="Select a Game"
        option-label="name"
        option-value="value">
    </Select>
  </div>
  <Deck></Deck>

</template>

<style scoped>
.heading {
  position: relative;
}
.game-select {
  width: 200px;
}
</style>
