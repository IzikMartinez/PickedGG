import {card} from "composables/types/card";
import { Record } from "pocketbase";

type CardMap = {
    id: string,
    count: number
}

type Box = {
    packs: Record[][]   
}

export function useBuildBox() {
        // declare empty box
        // make 24 packs with a shared cardMap
        // append the packs to the box
        // return the box
        let box = [] as Record[][]
        for (let i = 0; i < 24; i++) {
            box.push(useBuildPack());
        }

        const draftBox = useState('draft-box', ()=> box)
    }


/*
export default class Pack {
    picked = 0;
    picked_id =0;

    pack_id: number = 0
    picked_cards: Record[] = []
    cards: Box

    constructor(pack_id: number) {
        this.pack_id = pack_id
        this.cards = this.buildBox()
        console.log(this.cards)
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

    ////////////////////////////////////////////////////////////////////////////
    // LAYER 4 METHODS
    ////////////////////////////////////////////////////////////////////////////
    
    removeCard(cardId: string ): void {
        this.picked++
        this.cards = this.cards.filter(card => card.id !== cardId)
    }

    removePick(card_id: string) {  
        let index = this.cards.findIndex(card => card.id === card_id)
        if (index > -1)  {
            this.picked_cards.push(this.cards.splice(index, 1)[0])
        }
    }
    getRandomCardIndex() {
        return this.getRandomInt(this.cards.length,0)
    }

    getRandomCardID(): string {
        const card = this.cards.at(this.getRandomCardIndex())
        if(card) return card.id
        else return "" 
    }

    removeRandomCard() {
        this.removePick(this.getRandomCardID()!)
    }

    getCard(card_pack_id:number): number | undefined {
        return this.cards.at(card_pack_id)?.card_id
    }
}
*/