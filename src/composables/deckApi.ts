import type {CardType} from "./deck.ts";
import {useHttp} from "./http.ts";
import {type Ref, ref} from "vue";

/**
 * Deck Client Api
 */
export function useDeckApi() {

    const {get} = useHttp();
    const lastApiCall: Ref<string> = ref('')
    const lastApiResponse: Ref<any> = ref(null)
    const cardBackSrc = 'https://deckofcardsapi.com/static/img/back.png'

    const getNewDeck = async () => {
        lastApiResponse.value = await get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        lastApiCall.value = `'getNewDeck parameters: none'`
        return lastApiResponse.value
    }
    const getCard = async (deckId: string|null, drawCount: number = 1) => {
        lastApiResponse.value = await get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${drawCount}`)
        lastApiCall.value = `'getCard' parameters: ${JSON.stringify({deckId, drawCount})}`
        return lastApiResponse.value
    }
    const postToPile = async (deckId: string|null, pileName: string, cardCodes: Array<string|CardType> = [] ) => {
        let codes = cardCodes.map(c => typeof c === 'string' ? c : c.code)
        lastApiResponse.value = await get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/add/?cards=${codes.join(',')}`)
        lastApiCall.value = `'postToPile' parameters: ${JSON.stringify({deckId, pileName, cardCodes})}`
        return lastApiResponse.value
    }
    const getFromPile = async (deckId: string|null, pileName: string, drawCount: number = 1 ) => {
        lastApiResponse.value = await get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/draw/?count=${drawCount}`)
        lastApiCall.value = `'getFromPile' parameters: ${JSON.stringify({deckId, pileName, drawCount})}`
        return lastApiResponse.value
    }
    return {
        getNewDeck,
        cardBackSrc,
        getFromPile,
        postToPile,
        getCard,
        lastApiCall,
        lastApiResponse,
    }
}