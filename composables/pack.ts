import {card} from "composables/types/card";
import { Record } from "pocketbase";


export default class Pack {
    picked = 0;
    picked_id =0;

    pack_id: number = 0
    cards: Record[] = []

    constructor(pack_id: number) {
        this.pack_id = pack_id
        this.cards = this.buildPack() as Record[]
    }

    get Cards() {
        return this.cards
    }

    ////////////////////////////////////////////////////////////////////////////
    // LAYER 1 METHODS
    ////////////////////////////////////////////////////////////////////////////
    getRandomInt(max: number, min: number): number {
        let num = Math.floor(Math.random() * max)// start at 1
        return num
        //return this.lcg(21, 3, 7, seed, 3)[1] % max
    }


    buildPack(): Record[] {
        return useBuildPack();
    }
    ////////////////////////////////////////////////////////////////////////////
    // LAYER 4 METHODS
    ////////////////////////////////////////////////////////////////////////////
    

    removeCard(cardPackId: Record): void {
        this.cards = this.cards.filter(card => card !== cardPackId)
        this.picked++
    }

    getRandomCardID(): Record | null {
        const index=this.getRandomInt(this.cards.length,0)
        const card = this.cards.at(index)
        if(card) return card
        else return null
    }

    removeRandomCard() {
        this.removeCard(this.getRandomCardID()!)
    }

    getCard(card_pack_id:number): number | undefined {
        return this.cards.at(card_pack_id)?.card_id
    }
}