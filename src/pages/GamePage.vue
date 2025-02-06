<script setup lang="ts">
import {computed, ref} from "vue";
import RandomDrawGame from "./draw/RandomDrawGame.vue";
import Select from "primevue/select";

interface Game {
  name: string;
  value: string;
}

const GAMES: Array<Game> = [
  {name: 'Random Draw', value: 'RandomDrawGame'},
];

const selectedGame = ref<string>('RandomDrawGame')

const selectedComponent = computed(() => {
  switch (selectedGame.value) {
    case 'RandomDrawGame': return RandomDrawGame
  }
  return null
})
</script>

<template>
  <div class="game-container">
    <div class="heading">
      <h3>Select a card game:</h3>
      <Select
          v-model="selectedGame"
          class="game-select"
          :options="GAMES"
          placeholder="Select a Game"
          option-label="name"
          option-value="value"
      >
      </Select>
    </div>
    <div class="playing-surface">
      <component v-if="selectedComponent" :is="selectedComponent"/>
    </div>
  </div>
</template>

<style scoped>
.heading {
  position: relative;
  height: 100px;
}
h2 {
  margin-top: 0;
}
.game-select {
  width: 200px;
}
.game-container {
  height: calc(100% - 20vh);
}
.playing-surface {
  display: block;
  height: calc(100vh - 110px);
  justify-content: center;
}
</style>
