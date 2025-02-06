<script setup lang="ts">
import type {CardType} from "../../composables/deck.ts";
import BackOfCard from "./components/BackOfCard.vue";
import FrontOfCard from "./components/FrontOfCard.vue";

const props = defineProps<{
  allowClick: boolean,
  faceUp: boolean,
  card: CardType|null|undefined,
}>()

const emits = defineEmits(['click'])

const onClick = () => {
  if (props.allowClick) emits('click', !props.faceUp)
}
</script>

<template>
  <div class="card">
    <FrontOfCard v-if="faceUp && card" @click="onClick" :card="card"/>
    <BackOfCard v-else @click="onClick"/>
  </div>

</template>

<style scoped>
</style>
