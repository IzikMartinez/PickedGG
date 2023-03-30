import Round from "./round";

export function usePickCards(round: Round, pack_id: number) { 
    round.Packs.filter(pack => pack.pack_id !== pack_id).forEach(pack =>
        pack.removeRandomCard()
    )
}