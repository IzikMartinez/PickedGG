import { Record } from 'pocketbase'

type Box = {
    packs: Record[][]   
}

type pack = {
    pack_id: number,
    cards: Record[]
}

function makePack(pack_id: number, cards: Record[]) {
    return {
        pack_id: pack_id,
        cards: cards
    }
}

export function useBuildRound() {
    // check if all packs are depleted
    //if(round.value.length === 0 || !round)
    // load box from state
    const draftBox = useState('draft-box').value as Record[][]
    let round = [] as pack[]
    // from box, put 8 packs into state
        // get 8 packs from box
        /*
            pop 8 packs from box
            push popped packs

        */
       for (let index = 0; index < 8; index++) {
        console.log(round.push(
                makePack(index, draftBox.pop() as Record[])
            ))
       }
    useRoundStore().value = round
    if(useRoundStore().value)
        console.log(useRoundStore().value)
    else
    console.log("FAILED TO PUSH OR FAILED TO PRINT");
}


function findIndex(pack: Record[], wanted_id: string) {
    return pack.findIndex(card => card.id === wanted_id)
}
/*
function that takes a pack_index and card id as imput
load round from state
from pack remove one and only one instance of a card whose id matches that of the input card id
update state
*/
export function useRemovePick(pack_idx: number, card_id: string) {
    const round = useRoundStore().value as unknown as Record[][]
    const idx = findIndex(round[pack_idx], card_id)
    if (idx > -1)  {
        round[pack_idx].splice(idx, 1)
    }
}
