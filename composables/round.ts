import {query} from "composables/types/query";
import Pack from "./pack";

export default class Round {
    round_id: number = 0
    packs: Pack[] = []
    cardData: query[] = []

    constructor(round_id: number) {
        this.round_id = round_id
        this.packs = this.buildRound()
    }


    buildRound(): Pack[] {
        /*const newround = new newRound(cardData)
        const list = newround.buildCards()
        console.log(list)
         */
       let packs: Pack[] = []
        for (let i = 0; i < 8; i++) {
            packs.push(new Pack(i))
        }
        return packs
    }

    getPack(pack_id: number): Pack {
        const pack = this.packs.at(pack_id)
        if(pack) return pack
        else return new Pack(0)
    }

    removeCardFromPacks(current_pack: number) {
       this.packs.forEach(pack => {
        if(pack.pack_id != current_pack)
            pack.removeRandomCard()
       })
        //this.packs.filter(pack => pack.pack_id = pack_id)
    }

    removeCardFromPack(pack_id: number, card_id: number) {

    }

    getCardInPack(pack_id: number, card_pack_id: number): number | undefined{
        return this.packs.at(pack_id)?.getCard(card_pack_id)
    }


}

class newRound {
    round_id: number = 0
    cardData: query[] = []
    constructor(cardData: query[]) {
        this.cardData = cardData
    }

    lcgLoop(mod: number, multiplier: number, increment: number, seed: number, len: number): number[] {
        const nums = [] as number[]
        for (let i = 1; i < len; i++) {
            seed = ((multiplier * seed) + increment) % mod
            nums.push(seed)
        }
        return nums
    }

    lcg(mod: number, multiplier: number, increment: number, seed: number, len: number): number[] {
        return this.lcgLoop(mod,multiplier,increment,seed,len)
    }

    getCardsByType(type: string, cards: query[]) {
        return cards.filter(x => x.card_type?.find(y => y === type))
    }

    getCardsByRarity(rarity: string, cards: query[]) {
        return cards.filter(x => x.rarity === rarity)
    }

    getNumCards(cards: query[]) {
        return cards.length
    }

    getRandom(amount: number, min: number, max: number) {
        let cards=[]
        for (let i = 0; i < amount; i++) {
            const card = Math.floor(Math.random() * (max - min)); // start at 1
            cards.push(card)
        }
        return cards
    }

    getRandomCardNumbers(amount: number, cards: query[]) {
        const cardLen = ref(this.getNumCards(cards))
        console.log(cardLen.value)
        return this.getRandom(amount*8, 0, cardLen.value)
    }

    buildCards() {
        let cards = ref(this.getCardsByType("draconic", this.cardData))
        let selectedCards = [] as query[]
        const cardNumbers = this.getRandomCardNumbers(1, cards.value)
        cardNumbers.forEach(num => {
            selectedCards.push(cards.value.at(num) as query)
        })
        return selectedCards
    }
}
