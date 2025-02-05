<script setup lang="ts">
import {useDeckOfCards} from "../../deck/composables/deckOfCards.ts";

const {imageSrc} = useDeckOfCards()

</script>

<template>
  <img :src="imageSrc"/>
</template>

<style scoped>

</style>