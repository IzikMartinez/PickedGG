export const useHeroes = ()=> {
    if(useSetName().value === "out"){
        return ["all", "generic", "arakni", "azalea", "benji", "riptide", "katsu", "uzuri"]
    }
    else return ["all", "generic", "dromai", "fai", "iyslander"]
}