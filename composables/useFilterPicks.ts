export const useFilterPicks = () => {
    if(useSetName().value === "upr") {
        switch(useActiveBtn().value) {
            case "generic": 
                return usePickStore().picks.filter(x=> x.card_type?.includes("generic"))
                break;
            case "fai": 
                return usePickStore().picks.filter(x=> !x.card_type?.includes("illusionist") && x.card_type?.includes('draconic') )
                break;
            case "dromai": 
                return usePickStore().picks.filter(x=> !x.card_type?.includes("ninja") && x.card_type?.includes('draconic') )
                break;
            case "iyslander": 
                return usePickStore().picks.filter(x=>
                    x.card_type?.includes("ice") || x.card_type?.includes("wizard") || x.card_type?.includes("elemental"))
                break;
            default: 
                return usePickStore().picks
                break;
        }
    } else {
        switch(useActiveBtn().value) {
            case "generic": 
                return usePickStore().picks.filter(x=> x.card_type?.includes("Generic"))
                break;
            case "assassin": 
                return usePickStore().picks.filter(x=> x.card_type?.includes("Assassin"))
                break;
            case "ranger": 
                return usePickStore().picks.filter(x=> x.card_type?.includes("Ranger"))
                break;
            case "ninja": 
                return usePickStore().picks.filter(x=> x.card_type?.includes("Ninja"))
                break;
            default: 
                return usePickStore().picks
                break;
        }
    }
}

export const useSearchPicks = () => {
    const search_text = useState('search', ()=> ref('SEARCH...')).value
    const picks = useFilterPicks()
    if (search_text !== 'SEARCH...' && search_text !== '') {
        return picks.filter(x => x.card_name.toUpperCase().includes(search_text.toUpperCase()))
    } else return picks
}