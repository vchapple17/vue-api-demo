import {ref, computed} from 'vue';
import type {Ref} from 'vue';
import {useHttp} from "../../../composables/http.ts";

interface Deck {
    success: boolean;
    deck_id: string;
    shuffled: boolean;
    remaining: number;
}
export interface CardType {
    code: string;
    image: string;
    value: number|string;
    // suit: string;
    suit: "HEARTS"|"SPADES"|"DIAMONDS"|"CLUBS";
}

export function useDeckOfCards() {

    const {get} = useHttp();

    const imageSrc = 'https://deckofcardsapi.com/static/img/back.png'
    const deck: Ref<Deck|null> = ref(null)

    const drawnPile: Ref<CardType[]> = ref([])

    const deckId = computed(() => !!deck.value?.deck_id ? deck.value?.deck_id : null)
    const remaining = computed(() => !!deck.value?.remaining ? deck.value?.remaining : 0)

    const initDeck = async () => {
        try {
            deck.value = await getNewDeck()
        } catch(e) {
            console.error(e)
        }

    }

    const drawCard = async () => {
        let card = null
        try {
            let response = await getCard()
            deck.value.remaining = response.remaining
            card = response.cards[0]
            drawnPile.value.push(card)
        } catch(e) {
            console.error(e)
        }
        return card
    }

    /**
     * Client Api
     */
    const getNewDeck = () => {
        return get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    }
    const getCard = (drawCount = 1) => {
        return get(`https://deckofcardsapi.com/api/deck/${deckId.value}/draw/?count=${drawCount}`)
    }
    return {
        initDeck,
        deckId,
        drawCard,
        remaining,
        imageSrc,
    }
}