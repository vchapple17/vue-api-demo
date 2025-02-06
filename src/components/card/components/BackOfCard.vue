<script setup lang="ts">

import {useDeckApi} from "../../../composables/deckApi.ts";

const {cardBackSrc} = useDeckApi()

</script>

<template>
  <img :src="cardBackSrc" alt="back-of-card"/>
</template>

<style scoped>

</style>