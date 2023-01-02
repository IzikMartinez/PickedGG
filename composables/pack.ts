import {query} from "composables/types/query";
import {card} from "composables/types/card";


export default class Pack {
    picked = 0;
    picked_id =0;

    pack_id: number = 0
    cards: card[] = []

    constructor(pack_id: number) {
        this.pack_id = pack_id
        this.cards = this.buildPack()
    }

    get Cards() {
        return this.cards
    }

    makeCard(data: query, cardPackID: number): card {
        return {
            card_id: data.card_id,
            card_in_pack: cardPackID,
            card_name: data.card_name,
            card_type: data.card_type,
            pitch: data.pitch,
            cost: data.cost,
            power: data.power,
            defense: data.defense,
            rarity: data.rarity
        }
    }

    packHash(seed: number): number {
        const time = new Date().getTime()
        return time * seed
    }

    lcgLoop(mod: number, multiplier: number, increment: number, seed: number, len: number, nums: number[]): number[] {
        for (let i = 1; i < len; i++) {
            seed = (multiplier * this.packHash(seed) + increment) % mod
            nums.push(seed)
        }
        return nums
    }

    lcg(mod: number, multiplier: number, increment: number, seed: number, len: number): number[] {
        let nums = [] as number[]
        return this.lcgLoop(mod,this.packHash(multiplier),increment,seed,len,nums)
    }
    ////////////////////////////////////////////////////////////////////////////
    // LAYER 1 METHODS
    ////////////////////////////////////////////////////////////////////////////
    getRandomInt(max: number, min: number): number {
        let num = Math.floor(Math.random() * max)// start at 1
        return num
        //return this.lcg(21, 3, 7, seed, 3)[1] % max
    }

    pushCard(pack: card[], data: query, cardPackID: number) {
        pack.push(this.makeCard(data, cardPackID))
    }

    filterByType(type: string, data: query[]): query[] {
        return data.filter( x => x.card_type?.find(y => y === type))
    }

    filterByRarity(rarity: string, data: query[]): query[] {
        return data.filter( x => x.rarity === rarity )
    }

    ////////////////////////////////////////////////////////////////////////////
    // LAYER 2 METHODS
    ////////////////////////////////////////////////////////////////////////////
    filterByTypeAndRarity(type: string, rarity: string, data: query[]): query[] {
        const cards_by_type = this.filterByType(type, data)
        return this.filterByRarity(rarity, cards_by_type)
    }

    randomCardNumber(cards: query[]): number {
        //return cards[this.getRandomInt(cards.length, cardPackID)]
        return this.getRandomInt(cards.length, 0)
    }

    getRandomCard(card_index: number, cards: query[]): query {
        let card = cards.at(card_index) as query
        return card
    }

    ////////////////////////////////////////////////////////////////////////////
    // LAYER 3 METHODS
    ////////////////////////////////////////////////////////////////////////////
    getCardTR(type: string, rarity: string, cards: query[]): query {
        let cards_by_type_rarity = this.filterByTypeAndRarity(type, rarity, cards)
        //function that gets a random number based on length of cards_by_type_rarity
        let card_index = this.randomCardNumber(cards_by_type_rarity)
        //function that uses random number to get the corresponding card from the list
        let card = this.getRandomCard(card_index, cards_by_type_rarity)
        return card
        //return the card
    }

    getCardR(rarity: string, cards: query[]): query {
        let cards_by_rarity = this.filterByRarity(rarity, cards)
        //function that gets a random number based on length of cards_by_type_rarity
        let card_index = this.randomCardNumber(cards_by_rarity)
        //function that uses random number to get the corresponding card from the list
        let card = this.getRandomCard(card_index, cards_by_rarity)
        return card
        //return the card
    }

    queryToCard(cards: query[], card_in_pack: number, rarity: string, type?: string): card {
        let queryCard = ref<query>()
        if(type) queryCard.value = this.getCardTR(type, rarity, cards) as query
        else queryCard.value = this.getCardR(rarity, cards) as query
        return {
            card_in_pack: card_in_pack,
            card_id: queryCard.value.card_id,
            card_name: queryCard.value.card_name,
            card_type: queryCard.value.card_type,
            pitch: queryCard.value.pitch,
            cost: queryCard.value.cost,
            power: queryCard.value.power,
            defense: queryCard.value.defense,
            rarity: queryCard.value.rarity,
        }
    }

    randomClass(class1: string, class2: string, odds1: number, odds2: number): string {
        const number = this.getRandomInt(100,1)
        if(number <= odds1) return class1
        else if(number > odds1 && number <= odds2) return class2
        else return ""
    }

    ////////////////////////////////////////////////////////////////////////////
    // LAYER 4 METHODS
    ////////////////////////////////////////////////////////////////////////////
    buildPack(): card[] {
        let pack: card[] = []
        const cardData = useState('card-data').value as query[]
        pack.push(this.queryToCard(cardData,0, "common", "generic"))
        pack.push(this.queryToCard(cardData,1, "common", "ice"))
        pack.push(this.queryToCard(cardData,2, "common", "draconic"))
        pack.push(this.queryToCard(cardData,3, "common", "generic"))
        pack.push(this.queryToCard(cardData,4, "rare"))
        pack.push(this.queryToCard(cardData,5, this.randomClass("rare","majestic", 75, 100)))
        pack.push(this.queryToCard(cardData,6, this.randomClass("common", "rare", 97,100)))
        pack.push(this.queryToCard(cardData,7, "common", "ninja"))
        pack.push(this.queryToCard(cardData,8, "common", "ninja"))
        pack.push(this.queryToCard(cardData,9, "common", "illusionist"))
        pack.push(this.queryToCard(cardData,10, "common", "illusionist"))
        pack.push(this.queryToCard(cardData,11, "common", "wizard"))
        pack.push(this.queryToCard(cardData,12, "common", "wizard"))
        pack.push(this.queryToCard(cardData,13, "common", "wizard"))
        return pack;
    }

    removeCard(cardPackId: number): void {
        this.cards = this.cards.filter(card => card.card_in_pack != cardPackId)
        this.picked++
    }

    getRandomCardID(): number {
        const index=this.getRandomInt(this.cards.length,0)
        const card = this.cards.at(index)?.card_in_pack
        if(card) return card
        else return 0
    }

    removeRandomCard() {
        this.removeCard(this.getRandomCardID())
    }

    getCard(card_pack_id:number): number | undefined {
        return this.cards.at(card_pack_id)?.card_id
    }
}