import {card} from "composables/types/card";
import { Record } from "pocketbase";
import { useRecords } from "./usePocketbase";


export default class Pack {
    picked = 0;
    picked_id =0;

    pack_id: number = 0
    cards: Record[] = []

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

    filterByType(type: string, cardData: Record[]): Record[] {
        const filtered = cardData.filter( x => x.card_type.includes(type))
        console.log(filtered);
        return filtered
    }

    filterByRarity(rarity: string, cardData: Record[]): Record[] {
        
        return cardData.filter( x => x.rarity === rarity )
    }

    ////////////////////////////////////////////////////////////////////////////
    // LAYER 2 METHODS
    ////////////////////////////////////////////////////////////////////////////
    filterByTypeAndRarity(type: string, rarity: string, cardData: Record[]): Record[] {
        const cards_by_type = this.filterByType(type, cardData)
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
    getCardT(type: string, cardData: Record[]): Record{
        let cards_by_type = this.filterByType(type, cardData)
        //function that gets a random number based on length of cards_by_type_rarity
        let card_index = this.randomCardNumber(cards_by_type)
        //function that uses random number to get the corresponding card from the list
        let card = this.getRandomCard(card_index, cards_by_type)
        return card
        //return the card
    }

    getCardR(rarity: string, cardData: Record[]): Record{
        let cards_by_rarity = this.filterByRarity(rarity, cardData)
        //function that gets a random number based on length of cards_by_type_rarity
        let card_index = this.randomCardNumber(cards_by_rarity)
        //function that uses random number to get the corresponding card from the list
        let card = this.getRandomCard(card_index, cards_by_rarity)
        return card
        //return the card
    }
    getCardTR(type: string, rarity: string, cardData: Record[]): Record{
        let cards_by_type_rarity = this.filterByTypeAndRarity(type, rarity, cardData)
        //function that gets a random number based on length of cards_by_type_rarity
        let card_index = this.randomCardNumber(cards_by_type_rarity)
        //function that uses random number to get the corresponding card from the list
        let card = this.getRandomCard(card_index, cards_by_type_rarity)
        return card
        //return the card
    }
    BuildCard(cardData: Record[], card_in_pack: number, rarity?: string, type?: string): Record {

        if(type && !rarity) return this.getCardT(type, cardData) as Record 
        else if(!type && rarity) return this.getCardR(rarity, cardData) as Record 
        else if(type && rarity) return this.getCardTR(type, rarity, cardData) as Record 
        else { console.log(card_in_pack); return new Record }
        /*
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
        */
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
    buildPack(): Record[] {
        let pack: Record[] = []
        const cardData = useRecords
        pack.push(this.BuildCard(cardData,0, "common", "Assassin"))
        pack.push(this.BuildCard(cardData,1, "common", "Assassin"))
        pack.push(this.BuildCard(cardData,2, "common", "Ninja"))
        pack.push(this.BuildCard(cardData,3, "common", "Ninja"))
        pack.push(this.BuildCard(cardData,4, "common", "Ranger"))
        pack.push(this.BuildCard(cardData,5, "common", "Ranger"))
        pack.push(this.BuildCard(cardData,6, "common", "Generic"))
        pack.push(this.BuildCard(cardData,7, "common", "Generic"))
        pack.push(this.BuildCard(cardData,8, "common", "Generic"))
        pack.push(this.BuildCard(cardData,9, "common", "Equipment"))
        pack.push(this.BuildCard(cardData,10, this.randomClass("rare","majestic", 75, 100)))
        pack.push(this.BuildCard(cardData,11, this.randomClass("common", "rare", 97,100)))

        /*
        pack.push(this.BuildCard(cardData,0, "common", "generic"))
        pack.push(this.BuildCard(cardData,1, "common", "ice"))
        pack.push(this.BuildCard(cardData,2, "common", "draconic"))
        pack.push(this.BuildCard(cardData,3, "common", "generic"))
        pack.push(this.BuildCard(cardData,4, "rare"))
        pack.push(this.BuildCard(cardData,5, this.randomClass("rare","majestic", 75, 100)))
        pack.push(this.BuildCard(cardData,6, this.randomClass("common", "rare", 97,100)))
        pack.push(this.BuildCard(cardData,7, "common", "ninja"))
        pack.push(this.BuildCard(cardData,8, "common", "ninja"))
        pack.push(this.BuildCard(cardData,9, "common", "illusionist"))
        pack.push(this.BuildCard(cardData,10, "common", "illusionist"))
        pack.push(this.BuildCard(cardData,11, "common", "wizard"))
        pack.push(this.BuildCard(cardData,12, "common", "wizard"))
        pack.push(this.BuildCard(cardData,13, "common", "wizard"))
        */
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