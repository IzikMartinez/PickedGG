export type query = {
    id: number
    card_id: number
    set_id: number
    card_name: string
    card_type: string[] | null
    pitch: number
    cost: number
    power: number | null
    defense: number | null
    rarity: string
}