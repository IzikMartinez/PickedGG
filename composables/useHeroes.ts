export const useHeroes = ()=> {
    if(useSetName().value === "out"){
        return ["all", "generic", "assassin", "ranger", "ninja"]
    }
    else return ["all", "generic", "dromai", "fai", "iyslander"]
}