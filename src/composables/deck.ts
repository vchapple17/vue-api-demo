import {ref, computed} from 'vue';
import type {Ref} from 'vue';
import {useDeckApi} from "./deckApi.ts";

export interface DeckType {
    success: boolean;
    deck_id: string;
    shuffled: boolean;
    remaining: number;
}
export interface CardType {
    code: string;
    image: string;
    value: number|string;
    suit: "HEARTS"|"SPADES"|"DIAMONDS"|"CLUBS";
}

export function useDeck() {

    const {
        getNewDeck,
        getCard,
        getFromPile,
        postToPile,
        cardBackSrc
    } = useDeckApi()

    const deck: Ref<DeckType|null> = ref(null)
    const drawnCards: Ref<CardType[]> = ref([])

    const deckId = computed(() => !!deck.value?.deck_id ? deck.value?.deck_id : null)
    const remaining = computed(() => !!deck.value?.remaining ? deck.value?.remaining : 0)

    const initDeck = async () => {
        try {
            deck.value = await getNewDeck()
            drawnCards.value = []
        } catch(e) {
            console.error(e)
        }
    }

    const drawCard = async (count: number = 1): Promise<Array<CardType>> => {
        try {
            let response = await getCard(deckId.value, count)
            if (deck.value) deck.value.remaining = response.remaining
            drawnCards.value.concat(response.cards)
            return response.cards
        } catch(e) {
            console.error(e)
        }
        return []
    }

    const addToPile = async (pileName: string, cardCodes: Array<string|CardType> = []): Promise<void> => {
        try {
            let response = await postToPile(deckId.value, pileName, cardCodes)
            if (deck.value) deck.value.remaining = response.remaining
        } catch(e) {
            console.error(e)
        }
    }
    const drawCardFromPile = async (pileName: string, count: number = 1): Promise<Array<CardType>> => {
        try {
            let response = await getFromPile(deckId.value, pileName, count)
            if (deck.value) deck.value.remaining = response.remaining
            return response.cards
        } catch(e) {
            console.error(e)
        }
        return []
    }

    return {
        initDeck,
        deckId,
        deck,
        drawCard,
        drawCardFromPile,
        remaining,
        cardBackSrc,
        addToPile,
    }
}