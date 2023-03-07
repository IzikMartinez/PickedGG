import {card} from "composables/types/card";
import { Record } from "pocketbase";


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

    makeCard(data: Record, cardPackID: number): card {
        return {
            record_id: data.id,
            card_id: data.card_id,
            card_in_pack: cardPackID,
            card_name: data.card_name,
            card_type: data.card_type,
            pitch: data.pitch,
            cost: data.cost,
            power: data.power,
            defense: data.defense,
            rarity: data.rarity,
            card_art: data.card_art
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

    pushCard(pack: card[], data: Record, cardPackID: number) {
        pack.push(this.makeCard(data, cardPackID))
    }

    filterByType(type: string, data: Record[]): Record[] {
        return data.filter( x => x.card_type?.includes(type))
    }

    filterByRarity(rarity: string, data: Record[]): Record[] {
        return data.filter( x => x.rarity === rarity )
    }

    ////////////////////////////////////////////////////////////////////////////
    // LAYER 2 METHODS
    ////////////////////////////////////////////////////////////////////////////
    filterByTypeAndRarity(type: string, rarity: string, data: Record[]): Record[] {
        const cards_by_type = this.filterByType(type, data)
        return this.filterByRarity(rarity, cards_by_type)
    }

    randomCardNumber(cards: Record[]): number {
        //return cards[this.getRandomInt(cards.length, cardPackID)]
        return this.getRandomInt(cards.length, 0)
    }

    getRandomCard(card_index: number, cards: Record[]): Record {
        let card = cards.at(card_index) as Record
        return card
    }

    ////////////////////////////////////////////////////////////////////////////
    // LAYER 3 METHODS
    ////////////////////////////////////////////////////////////////////////////
    getCardTR(type: string, rarity: string, cards: Record[]): Record{
        let cards_by_type_rarity = this.filterByTypeAndRarity(type, rarity, cards)
        //function that gets a random number based on length of cards_by_type_rarity
        let card_index = this.randomCardNumber(cards_by_type_rarity)
        //function that uses random number to get the corresponding card from the list
        let card = this.getRandomCard(card_index, cards_by_type_rarity)
        return card
        //return the card
    }

    getCardR(rarity: string, cards: Record[]): Record{
        let cards_by_rarity = this.filterByRarity(rarity, cards)
        //function that gets a random number based on length of cards_by_type_rarity
        let card_index = this.randomCardNumber(cards_by_rarity)
        //function that uses random number to get the corresponding card from the list
        let card = this.getRandomCard(card_index, cards_by_rarity)
        return card
        //return the card
    }

    RecordToCard(cards: Record[], card_in_pack: number, rarity: string, type?: string): card {
        let RecordCard = ref<Record>()
        if(type) RecordCard.value = this.getCardTR(type, rarity, cards) as Record 
        else RecordCard.value = this.getCardR(rarity, cards) as Record 
        return {
            record_id: RecordCard.value.id,
            card_in_pack: card_in_pack,
            card_id: RecordCard.value.card_id,
            card_name: RecordCard.value.card_name,
            card_type: RecordCard.value.card_type,
            pitch: RecordCard.value.pitch,
            cost: RecordCard.value.cost,
            power: RecordCard.value.power,
            defense: RecordCard.value.defense,
            rarity: RecordCard.value.rarity,
            card_art: RecordCard.value.card_art
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
        const cardData = useState('card-data').value as Record[]
        pack.push(this.RecordToCard(cardData,0, "common", "generic"))
        pack.push(this.RecordToCard(cardData,1, "common", "ice"))
        pack.push(this.RecordToCard(cardData,2, "common", "draconic"))
        pack.push(this.RecordToCard(cardData,3, "common", "generic"))
        pack.push(this.RecordToCard(cardData,4, "rare"))
        pack.push(this.RecordToCard(cardData,5, this.randomClass("rare","majestic", 75, 100)))
        pack.push(this.RecordToCard(cardData,6, this.randomClass("common", "rare", 97,100)))
        pack.push(this.RecordToCard(cardData,7, "common", "ninja"))
        pack.push(this.RecordToCard(cardData,8, "common", "ninja"))
        pack.push(this.RecordToCard(cardData,9, "common", "illusionist"))
        pack.push(this.RecordToCard(cardData,10, "common", "illusionist"))
        pack.push(this.RecordToCard(cardData,11, "common", "wizard"))
        pack.push(this.RecordToCard(cardData,12, "common", "wizard"))
        pack.push(this.RecordToCard(cardData,13, "common", "wizard"))
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