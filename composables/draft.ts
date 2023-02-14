import Round from "./round";
import {query} from "./types/query";

export const useDraftState = ()=> useState('draft-cards', ()=> new Draft)

export const useDraft = ()=> {
    const draft = new Draft()
    return draft
}

export default class Draft {
    rounds: Round[] = []
    constructor() {
        this.rounds = this.buildDraft()
    }
    buildDraft(): Round[] {
        let rounds: Round[] = []
        for (let i = 0; i < 3; i++) {
            rounds.push(new Round(i))
        }
        return rounds
    }
    getRound(round_id:number) {
        return this.rounds.at(round_id)
    }
    get Rounds() {
        return this.rounds
    }
    removeFromRound(round_id: number, pack_id: number, card_pack_id: number) {
        //console.log(`${this.rounds.at(round_id)?.getCardInPack(pack_id, card_pack_id)}`)
        this.rounds.at(round_id)?.removeCardFromPack(pack_id, card_pack_id)
    }

    pickFromRound(round_id: number, current_pack: number) {
        this.rounds.at(round_id)?.removeCardFromPacks(current_pack)
    }
}