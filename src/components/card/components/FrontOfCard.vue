<script setup lang="ts">

import type {CardType} from "../../deck/composables/deckOfCards.ts";

defineProps<{
  card: CardType,
}>()
</script>

<template>
  <div style="align-content: center;">
    <div style="position: relative;">
      <div class="front-card-container">
  <!--    <img style="border: 1px solid black; border-radius: 12px;"-->
  <!--         src="../../../assets/blank.png" class="front-blank" alt="Card Front Blank" />-->
  <!--    <h1 class="top">{{card.code}}</h1>-->
      <img :src="card.image">
    </div>
    </div>
  </div>
</template>

<style scoped>
.front-card-container {
  img {
    position: absolute;
    top: 0;
    left: 0
  }

  h1.top {
    margin-top: 0;
    margin-bottom: 0;
    position: absolute;
    top: 20px;
    left: 20px;
    color: black !important;
  }
}
</style>