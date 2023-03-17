import {card} from "composables/types/card";
import { Record } from "pocketbase";


function makeCard(data: Record, cardPackID: number): card {
    return {
        record_id: data.id,
        card_id: data.card_id,
        card_in_pack: cardPackID,
        card_name: data.card_name,
        card_type: data.card_type,
        pitch: data.pitch,
        cost: data.cost,
        power: data.power,
        defense: data.defense,
        rarity: data.rarity,
        card_art: data.card_art
    }
}

function packHash(seed: number): number {
    const time = new Date().getTime()
    return time * seed
}

function lcgLoop(mod: number, multiplier: number, increment: number, seed: number, len: number, nums: number[]): number[] {
    for (let i = 1; i < len; i++) {
        seed = (multiplier * packHash(seed) + increment) % mod
        nums.push(seed)
    }
    return nums
}

function lcg(mod: number, multiplier: number, increment: number, seed: number, len: number): number[] {
    let nums = [] as number[]
    return lcgLoop(mod,packHash(multiplier),increment,seed,len,nums)
}
////////////////////////////////////////////////////////////////////////////
// LAYER 1 METHODS
////////////////////////////////////////////////////////////////////////////
function getRandomInt(max: number, min: number): number {
    let num = Math.floor(Math.random() * max)// start at 1
    return num
    //return lcg(21, 3, 7, seed, 3)[1] % max
}

function pushCard(pack: card[], data: Record, cardPackID: number) {
    pack.push(makeCard(data, cardPackID))
}

function filterByType(type: string[], cardData: Record[], both?: boolean): Record[] {
    if(type.length === 2 && both === false) 
        return cardData.filter( x => x.card_type.includes(type[0]) && !x.card_type.includes(type[1]))
    else if(type.length === 3 && both === false) 
        return cardData.filter( x => x.card_type.includes(type[0]) && !x.card_type.includes(type[1]) && !x.card_type.includes(type[2]))
    else if(type.length === 4 && both === false) 
        return cardData.filter( x => x.card_type.includes(type[0]) 
            && !x.card_type.includes(type[1]) 
            && !x.card_type.includes(type[2]) 
            && !x.card_type.includes(type[3]))
    else if(type.length === 5 && both === false) 
        return cardData.filter( x => x.card_type.includes(type[0]) 
            && !x.card_type.includes(type[1]) 
            && !x.card_type.includes(type[2]) 
            && !x.card_type.includes(type[3])
            && !x.card_type.includes(type[4]))
    else if (type.length === 3 && both === true)
        return cardData.filter( x => x.card_type.includes(type[0]) && x.card_type.includes(type[1]) && !x.card_type.includes(type[2]))
    else 
        return cardData.filter( x => x.card_type.includes(type[0]))
}

function filterByRarity(rarity: string, cardData: Record[]): Record[] {
    
    return cardData.filter( x => x.rarity === rarity )
}

////////////////////////////////////////////////////////////////////////////
// LAYER 2 METHODS
////////////////////////////////////////////////////////////////////////////
function filterByTypeAndRarity(type: string[], rarity: string, cardData: Record[], both?: boolean): Record[] {
    const cards_by_type = filterByType(type, cardData, both)
    return filterByRarity(rarity, cards_by_type)
}

function randomCardNumber(cards: Record[]): number {
    //return cards[getRandomInt(cards.length, cardPackID)]
    return getRandomInt(cards.length, 0)
}

function getRandomCard(card_index: number, cards: Record[]): Record {
    let card = cards.at(card_index) as Record
    return card
}

////////////////////////////////////////////////////////////////////////////
// LAYER 3 METHODS
////////////////////////////////////////////////////////////////////////////
function getCardT(type: string[], cardData: Record[], both?: boolean): Record{
    let cards_by_type = filterByType(type, cardData, both)
    //function that gets a random number based on length of cards_by_type_rarity
    let card_index = randomCardNumber(cards_by_type)
    //function that uses random number to get the corresponding card from the list
    let card = getRandomCard(card_index, cards_by_type)
    return card
    //return the card
}

function getCardR(rarity: string, cardData: Record[]): Record{
    let cards_by_rarity = filterByRarity(rarity, cardData)
    //function that gets a random number based on length of cards_by_type_rarity
    let card_index = randomCardNumber(cards_by_rarity)
    //function that uses random number to get the corresponding card from the list
    let card = getRandomCard(card_index, cards_by_rarity)
    return card
    //return the card
}
function getCardTR(type: string[], rarity: string, cardData: Record[], both?: boolean): Record{
    let cards_by_type_rarity = filterByTypeAndRarity(type, rarity, cardData, both)
    //function that gets a random number based on length of cards_by_type_rarity
    let card_index = randomCardNumber(cards_by_type_rarity)
    //function that uses random number to get the corresponding card from the list
    let card = getRandomCard(card_index, cards_by_type_rarity)
    return card
    //return the card
}
function BuildCard(cardData: Record[], card_in_pack: number, rarity?: string, type?: string[], both?: boolean): Record {

    if(type && !rarity) return getCardT(type, cardData, both) as Record 
    else if(!type && rarity) return getCardR(rarity, cardData) as Record 
    else if(type && rarity) return getCardTR(type, rarity, cardData, both) as Record 
    else { console.log(card_in_pack); return new Record }
    /*
    return {
        record_id: RecordCard.value.id,
        card_in_pack: card_in_pack,
        card_id: RecordCard.value.card_id,
        card_name: RecordCard.value.card_name,
        card_type: RecordCard.value.card_type,
        pitch: RecordCard.value.pitch,
        cost: RecordCard.value.cost,
        power: RecordCard.value.power,
        defense: RecordCard.value.defense,
        rarity: RecordCard.value.rarity,
        card_art: RecordCard.value.card_art
    }
    */
}

function randomClass(class1: string, class2: string, odds1: number, odds2: number): string {
    const number = getRandomInt(100,1)
    if(number <= odds1) return class1
    else if(number > odds1 && number <= odds2) return class2
    else return ""
}

function randomClass3(class1: string, class2: string, class3: string, odds1: number, odds2: number): string {
    const number = getRandomInt(100,1)
    if(number <= odds1) return class1
    else if(number > odds1 && number <= odds2) return class2
    else return class3
}

function buildPack(cardData: Record[]) {
    let pack: Record[] = []

    if(useSetName().value === "out") {
        pack.push(BuildCard(cardData, 0, "common", ["Assassin", "Ninja", "Equipment"], false))
        pack.push(BuildCard(cardData,1, "common", ["Assassin", "Ninja", "Equipment"], false))
        pack.push(BuildCard(cardData,2, "common", ["Ninja", "Assassin", "Equipment"], false))
        pack.push(BuildCard(cardData,3, "common", ["Ninja", "Assassin", "Equipment"], false))
        pack.push(BuildCard(cardData,4, "common", ["Ranger", "Assassin", "Equipment"], false))
        pack.push(BuildCard(cardData,5, "common", ["Ranger", "Assassin", "Equipment"], false))
        pack.push(BuildCard(cardData,6, "common", ["Generic", "Equipment"], false))
        pack.push(BuildCard(cardData,7, "common", ["Generic", "Equipment"], false))
        pack.push(BuildCard(cardData,8, "common", ["Generic", "Equipment"], false))
        pack.push(BuildCard(cardData,9, "common", ["Equipment"]))
        pack.push(BuildCard(cardData,0, "common", ["Assassin", "Ninja", "Equipment"], true))
        pack.push(getCardR("rare", cardData))
        pack.push(BuildCard(cardData,11, randomClass3("rare","majestic", "legendary", 81, 98)))
        pack.push(BuildCard(cardData,12, randomClass("common", "rare", 92,100)))
    }

    else {
        pack.push(BuildCard(cardData,0, "common", ["generic"], false))
        pack.push(BuildCard(cardData,1, "common", ["ice"], false))
        pack.push(BuildCard(cardData,2, "common", ["draconic"], false))
        pack.push(BuildCard(cardData,3, "common", ["generic"], false))
        pack.push(BuildCard(cardData,4, "rare"))
        pack.push(BuildCard(cardData,5, randomClass("rare","majestic", 75, 100)))
        pack.push(BuildCard(cardData,6, randomClass("common", "rare", 97,100)))
        pack.push(BuildCard(cardData,7, "common", ["ninja"], false))
        pack.push(BuildCard(cardData,8, "common", ["ninja"], false))
        pack.push(BuildCard(cardData,9, "common", ["illusionist"], false))
        pack.push(BuildCard(cardData,10, "common", ["illusionist"], false))
        pack.push(BuildCard(cardData,11, "common", ["wizard"], false))
        pack.push(BuildCard(cardData,12, "common", ["wizard"], false))
        pack.push(BuildCard(cardData,13, "common", ["wizard"], false))
    }
    return pack;
}
////////////////////////////////////////////////////////////////////////////
// LAYER 4 METHODS
////////////////////////////////////////////////////////////////////////////
export const useBuildPack = function(): Record[] {
    const cardData = useState('card-data').value as Record[]
    let pack: Record[] = []

    if(useSetName().value === "out") {
        pack.push(BuildCard(cardData, 0, "common", ["Assassin", "Ninja", "Equipment"], false))
        pack.push(BuildCard(cardData,1, "common", ["Assassin", "Ninja", "Equipment"], false))
        pack.push(BuildCard(cardData,2, "common", ["Ninja", "Assassin", "Equipment"], false))
        pack.push(BuildCard(cardData,3, "common", ["Ninja", "Assassin", "Equipment"], false))
        pack.push(BuildCard(cardData,4, "common", ["Ranger", "Assassin", "Equipment"], false))
        pack.push(BuildCard(cardData,5, "common", ["Ranger", "Assassin", "Equipment"], false))
        pack.push(BuildCard(cardData,6, "common", ["Generic", "Equipment"], false))
        pack.push(BuildCard(cardData,7, "common", ["Generic", "Equipment"], false))
        pack.push(BuildCard(cardData,8, "common", ["Generic", "Equipment"], false))
        pack.push(getCardT(["Equipment"], cardData, false))
        pack.push(getCardTR(["Assassin", "Ninja", "Equipment"], "common", cardData, true))
        pack.push(getCardR("rare", cardData))
        pack.push(BuildCard(cardData,11, randomClass("rare","majestic", 75, 100)))
        pack.push(BuildCard(cardData,12, randomClass("common", "rare", 97,100)))
    }

    else {
        pack.push(BuildCard(cardData,0, "common", ["generic"], false))
        pack.push(BuildCard(cardData,1, "common", ["ice"], false))
        pack.push(BuildCard(cardData,2, "common", ["draconic"], false))
        pack.push(BuildCard(cardData,3, "common", ["generic"], false))
        pack.push(BuildCard(cardData,4, "rare"))
        pack.push(BuildCard(cardData,5, randomClass("rare","majestic", 75, 100)))
        pack.push(BuildCard(cardData,6, randomClass("common", "rare", 97,100)))
        pack.push(BuildCard(cardData,7, "common", ["ninja"], false))
        pack.push(BuildCard(cardData,8, "common", ["ninja"], false))
        pack.push(BuildCard(cardData,9, "common", ["illusionist"], false))
        pack.push(BuildCard(cardData,10, "common", ["illusionist"], false))
        pack.push(BuildCard(cardData,11, "common", ["wizard"], false))
        pack.push(BuildCard(cardData,12, "common", ["wizard"], false))
        pack.push(BuildCard(cardData,13, "common", ["wizard"], false))
    }
    return pack;
}

function removeCard(cardPackId: Record, pack: Record[]): Record[] {
    return pack.filter(card => card !== cardPackId)
}

function getRandomCardID(pack: Record[]): Record | null {
    const index=getRandomInt(pack.length,0)
    const card = pack.at(index)
    if(card) return card
    else return null
}

function removeRandomCard(pack: Record[]) {
    removeCard(getRandomCardID(pack)!, pack)
}

function getCard(card_pack_id:number, pack: Record[]): number | undefined {
    return pack.at(card_pack_id)?.card_id
}