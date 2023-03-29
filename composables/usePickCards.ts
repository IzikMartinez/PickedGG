import Round from "./round";

export function usePickCards(round: Round, pack_id: number) { 
    //from current round
    //packs = filtered ( pack != current pack)
    round.Packs.filter(pack => pack.pack_id !== pack_id).forEach(pack =>
        pack.removeRandomCard()
    )
    //packs.forEach(remove a random card)
}