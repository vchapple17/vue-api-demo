<script setup lang="ts">
import Card from "../card/Card.vue";
import type {CardType} from "../../composables/deck.ts";
import type {MODE_DRAW, MODE_FACE_UP, MODE_HAND} from "./constants.ts";
import {DRAW, FACE_UP, HAND} from "./constants.ts";
import {computed} from 'vue';

const props = defineProps<{
  pile: Array<CardType>,
  mode: MODE_DRAW|MODE_FACE_UP|MODE_HAND
}>()

const lastCard = computed(() => props.pile.length > 0 ? props.pile[props.pile.length - 1] : null)

const emit = defineEmits(['click'])
const onClick = (idx: number) => {
  emit('click', idx)
}

</script>

<template>

  <div style="align-content: center;">
    <div style="position: relative;">

      <div class="pile-of-cards">
        <div class="card-pile">
          <template v-if="mode === DRAW">
            <Card v-if="lastCard && pile.length > 1" :allow-click="false" :face-up="false" :card="null" class="hidden-cards"/>
            <Card v-if="lastCard" :allow-click="true" :face-up="false" :card="lastCard" @click="onClick(pile.length - 1)" class="top-card"></Card>
          </template>
          <template v-else-if="mode === FACE_UP">
            <Card v-if="lastCard" :allow-click="true" :face-up="true" :card="lastCard" @click="onClick(pile.length - 1)" class="top-card"></Card>
          </template>
          <template v-else-if="mode === HAND">
            <template v-for="(card, idx) in pile.reverse">
              <Card :allow-click="true" :face-up="true" :card="card" @click="onClick(idx)"></Card>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pile-of-cards {
  height: 355px;
  width: 310px;

  margin-bottom: 20px;
  margin-top: 0;

  .hidden-cards {
    position: absolute;
    left: 0;
  }
  .top-card {
    cursor: pointer;
    position: absolute;
    left: 15px;
    top: 5px;
  }
}
</style>