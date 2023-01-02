import {query} from "./types/query";

export const useFetchCardData = async () => {
        const supabase = useSupabaseClient()
        const {data: cards, pending: loading, error: err} = await useAsyncData(async ()=> {
             const {data } = await supabase
            .from('spells')
            .select('*')
            .eq('set_id', 7)
            return data as query[]
        })
        return {cards, loading, err}
}

export class fetchBaaS {
    ////////////////////////////////////////////////////////////////////////////
    // SUPABASE
    ////////////////////////////////////////////////////////////////////////////

    async fetchCardData() {
        
    }

    async setCardData() {
        const store = usePickStore()
        console.log('setting')
        await this.fetchCardData()
            // @ts-ignore
            .then(value => {store.cardData = value; console.log('fetched')})
            .catch(err => console.error(err.message))
    }


    ////////////////////////////////////////////////////////////////////////////
    // ART
    ////////////////////////////////////////////////////////////////////////////
    /**
     * 
     * @param cardID the set ID for the card who's filename is being constructed
     * @param cardSet the set name for the card who's filename is being constructed
     * @returns a string formatted as folder/cardSet000.extension
     * @example upr/UPR067.avif
     */



    /**
     * Connects to the backend API to retrieve card art from storage
     * This function checks if a card's art has been fetched before. If it has, the function returns the cached blob via a map.
     * If it has not, it makes an API call to supabase to retrieve the blob for card_id, adds it to the map, and then returns it
     * @remarks
     * The card sets are so small that caching every fetched card, at most, uses 14MB of memory 
     * It therefore makes sense for card-loading-speed purposes to cache every fetched card
     * I chose to store the map in a store to facilitate easy data sharing between the 100+ card objects in the draft
     * @param card_id - The set ID for the card whose artwork is being fetched
     * @returns A URL to the downloaded artwork is assigned to the reference variable 'localart'
     */



}
function formatFilename(cardID: number, cardSet: string): string {
        let filename: string
        const extension = ".avif"
        const folder="upr/"
        // if card id is a single-digit number, add two 0s
        if (cardID < 10) { filename = folder + cardSet + "00" + cardID.toString() + extension }
        // if card id is a double-digit number, add a 0
        else if (cardID >= 10 && cardID < 100) { filename = folder + cardSet + "0" + cardID.toString() + extension }
        // if card id is a triple digit number, no padding is necessary
        else { filename = folder + cardSet + cardID.toString( )+ extension }
        return filename
    }

export const useGetArt = async (card_id: number) => {
    const supabase = useSupabaseClient()
    const cardSet = "UPR"   // placeholder for cardSet parameter
    const filename = formatFilename(card_id, cardSet) //set filename
    const artKey = card_id+"_art"
    const store = usePickStore()

    if(!store.artMap.has(artKey)) {
        try {
            const {data: artData, error} = await supabase.storage
                .from('public/cart-art')
                .download(filename)
            if (error) console.error('Error downloading image: ', error.message)
            if (artData) store.artMap.set(artKey, URL.createObjectURL(artData))
        } catch (error: any) {
            console.log(error.description)
        } 
    }
    else {
        //console.log(artKey, " already in map")
    }
    return store.artMap.get(artKey)
}