import {card} from "composables/types/card";
import {query} from "composables/types/query";

export const usePickStore = defineStore('main', {
    state: () => ({
        picks: [] as card[],
        artMap: new Map<string,string>,
        packSize: 14,
        pickIndex: 0,
        roundIndex: 1,
    }),
    getters: {
        getPicks: (state) => state.picks,
        getPickIndex: (state) => state.pickIndex,
        getInversePickIndex: (state) => state.packSize - state.pickIndex%state.packSize,
        getRoundIndex: (state) => state.roundIndex,
    },
    actions: {
        addPick(payload: card ) { this.picks.push(payload) },
        incrementIndex() { this.pickIndex++ },

    }

})
