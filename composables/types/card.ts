export type card = {
    record_id: string,
    card_id: number
    card_in_pack?: number
    card_name: string
    card_type: string[] | null
    pitch: number
    cost: number
    power: number | null
    defense: number | null
    rarity: string
    picked?: boolean
    card_art: string
}


