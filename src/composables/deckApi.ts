import type {CardType} from "./deck.ts";
import {useHttp} from "./http.ts";

/**
 * Deck Client Api
 */
export function useDeckApi() {

    const {get} = useHttp();
    const cardBackSrc = 'https://deckofcardsapi.com/static/img/back.png'

    const getNewDeck = () => {
        return get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    }
    const getCard = (deckId: string|null, drawCount: number = 1) => {
        return get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${drawCount}`)
    }
    const postToPile = (deckId: string|null, pileName: string, cardCodes: Array<string|CardType> = [] ) => {
        let codes = cardCodes.map(c => typeof c === 'string' ? c : c.code)
        return get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/add/?cards=${codes.join(',')}`)
    }
    const getFromPile = (deckId: string|null, pileName: string, drawCount: number = 1 ) => {
        return get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/draw/?count=${drawCount}`)
    }
    return {
        getNewDeck,
        cardBackSrc,
        getFromPile,
        postToPile,
        getCard,
    }
}