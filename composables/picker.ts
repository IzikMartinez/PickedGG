import Draft from "./draft";
import Round from "./round";

export default class Picker {
    draft: Draft
    active_round: number
    active_pack: number

    constructor(draft: Draft, active_round: number, active_pack: number) {
        this.draft = draft
        this.active_round = active_round
        this.active_pack = active_pack
    }

    setActive(active_round: number, active_pack: number) {
        this.active_round = active_round
        this.active_pack = active_pack
    }

    // pick once for each pack except the active pack
    pickCards(min: number, max: number, active_round: number, active_pack: number) {
        this.setActive(active_round, active_pack)
        this.draft.pickFromRound(active_round, active_pack)
    }

    // generate random number()
    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * ((max - min) + min))
    }
    // for 7 packs
        // generateRandomNumber()
    getInts(min: number, max: number): number[] {
        let ids = []
        for (let i = 0; i < 8; i++) {
            ids.push(this.getRandomInt(min, max))
        }
        return ids
    }

    // remove card from each pack except the one currently focused
    allButActive(): Round[] {
        return this.draft.Rounds.filter(round => round.round_id !== this.active_round)
    }

    removePick(round_id: number) {
        let removal_round = this.draft.getRound(round_id)
        // removal_pack = removal_round.filter(pack => packs.pack_id = this.id)
    }

}