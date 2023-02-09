export const useFilterPicks = () => {
    switch(useActiveBtn().value) {
        case "generic": 
            return usePickStore().picks.filter(x=> x.card_type?.find(y => y === "generic"))
            break;
        case "fai": 
            return usePickStore().picks.filter(x=> !x.card_type?.includes("illusionist") && x.card_type?.includes('draconic') )
            break;
        case "dromai": 
            return usePickStore().picks.filter(x=> !x.card_type?.includes("ninja") && x.card_type?.includes('draconic') )
            break;
        case "iyslander": 
            return usePickStore().picks.filter(x=>
                x.card_type?.find(y=>y==="ice" || y==="wizard" || y==="elemental"))
            break;
        default: 
            return usePickStore().picks
            break;
    }
}

export const useSearchPicks = () => {
    const search_text = useState('search', ()=> ref('SEARCH...')).value
    const picks = useFilterPicks()
    if (search_text !== 'SEARCH...' && search_text !== '') {
        return picks.filter(x => x.card_name.toUpperCase().includes(search_text.toUpperCase()))
    } else return picks
}