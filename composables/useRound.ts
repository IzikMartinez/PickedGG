import { Record } from "pocketbase"

export function useRound(packsize: number): Record[][] {
    let packs: Record[][] = [[]]
    for (let index = 0; index < packsize; index++) {
        packs.push(useBuildPack())
    }
    return packs
}