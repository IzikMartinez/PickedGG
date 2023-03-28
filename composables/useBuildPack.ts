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

export function getInvalidClasses(classes:string[], validClasses: string[]) {
    let invalidClasses = classes;
    validClasses.forEach(valid_class =>  {
        invalidClasses = invalidClasses.filter(cls => !cls.includes(valid_class))
    })
    return invalidClasses
}

const useOutClasses = ["Assassin", "Ninja", "Ranger", "Generic", "Equipment"]

function filterByType(cardData: Record[], validClasses: string[]) {
    let filtered = cardData
    getInvalidClasses(useOutClasses, validClasses).forEach(invalid_class => {
        filtered = filtered.filter(card => !card.card_type.includes(invalid_class))
    })
    return filtered
}

function filterByRarity(rarity: string, cardData: Record[]): Record[] {
    return cardData.filter( x => x.rarity === rarity )
}

function filterForEquipment(cardData: Record[]) {
    return cardData.filter(card => card.card_type.includes("Equipment"))
}

////////////////////////////////////////////////////////////////////////////
// LAYER 2 METHODS
////////////////////////////////////////////////////////////////////////////
function filterTypes(cardData: Record[], validClasses: string[]){
    //get array from filterbytypes
    //return only values that overlap all classes
    let fulljoin =filterByType(cardData, validClasses)
    return fulljoin.filter(card => card.card_type.includes(validClasses[0]) && card.card_type.includes(validClasses[1]))

}

function filterByTypeAndRarity(classes: string[], rarity: string, cardData: Record[]): Record[] {
    const cards_by_type = filterByType(cardData, classes)
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
function getCardT(classes: string[], cardData: Record[]): Record{
    let cards_by_type = filterByType(cardData, classes)
    //function that gets a random number based on length of cards_by_type_rarity
    let card_index = randomCardNumber(cards_by_type)
    //function that uses random number to get the corresponding card from the list
    let card = getRandomCard(card_index, cards_by_type)
    return card
    //return the card
}

function getCardTs(cardData: Record[], classes: string[]) {
    const cards_by_types = filterTypes(cardData, classes)
    return getRandomCard(randomCardNumber(cards_by_types), cards_by_types)
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

//////////////////// LAYER 5 ////////////////////////
function getCardTR(type: string[], rarity: string, cardData: Record[]): Record{
    let cards_by_type_rarity = filterByTypeAndRarity(type, rarity, cardData)
    //function that gets a random number based on length of cards_by_type_rarity
    let card_index = randomCardNumber(cards_by_type_rarity)
    //function that uses random number to get the corresponding card from the list
    let card = getRandomCard(card_index, cards_by_type_rarity)
    return card
    //return the card
}

function getEquipmentCard(cardData: Record[], rarity: string) {
    const cards_by_rarity = filterByRarity(rarity, cardData)
    const cards_by_equip = filterForEquipment(cards_by_rarity)
    return getRandomCard(randomCardNumber(cards_by_equip), cards_by_equip)
}

function getCardTypesAndRarity(cardData: Record[], validClasses: string[], rarity: string): Record{
    const cards_by_rarity = filterByRarity(rarity, cardData)
    const cards_by_types_rarity = filterTypes(cards_by_rarity, validClasses)
    return getRandomCard(randomCardNumber(cards_by_types_rarity), cards_by_types_rarity)
}
function BuildCard(cardData: Record[], card_in_pack: number, rarity?: string, type?: string[]): Record {

    if(type && !rarity) return getCardT(type, cardData) as Record 
    else if(!type && rarity) return getCardR(rarity, cardData) as Record 
    else if(type && rarity) return getCardTR(type, rarity, cardData) as Record 
    else { console.log(card_in_pack); return new Record }
}
////////////////////////////////////////////////////////////////////////////
// Get card from a random class
////////////////////////////////////////////////////////////////////////////

interface classOdds {
    class_name: string;
    class_odds: number;
}

interface classes {
    valid_classes: string[]
    invalid_class: string[];
}

function getWinner(dieroll: number, classOdds: classOdds[]) {
    return classOdds.filter(cls => cls.class_odds > dieroll)
}

interface randomClassRarity {
    classes: string[],
    rarity: string
}
export function getRandomRarity(classOdds: classOdds[], count: number): string {
    const winner = getWinner(getRandomInt(100,1), classOdds)
    return winner[0].class_name
}


function getRandomClass(classOdds: classOdds[], classSets: string[][], count: number): randomClassRarity  {
    const randRarity = getRandomRarity(classOdds, count)
    if( randRarity === "common") {
        return {classes: classSets[0], rarity: randRarity}
    } else return {classes: classSets[1], rarity: randRarity}
}

////////////////////////////////////////////////////////////////////////////
// LAYER 4 METHODS
////////////////////////////////////////////////////////////////////////////
const an_hybrid:classes = {
    valid_classes: ["Assassin", "Ninja"],
    invalid_class: ["Ranger", "Generic"]
}

const ra_hybrid: classes = {
    valid_classes: ["Assassin", "Ranger"],
    invalid_class: ["Ninja", "Generic"]
}

const slot10odds: classOdds[] = [
    {
        class_name: "common",
        class_odds: 66.667,
    },
    {
        class_name: "rare",
        class_odds: 100
    }
] 
const slot11odds: classOdds[] = [
        {
            class_name: "common",
            class_odds: 42.5
        },
        {
            class_name: "rare",
            class_odds: 80.0
        },
        {
            class_name: "majestic",
            class_odds: 100.0
        }
    ]
const slot12odds: classOdds[] = [
        {
            class_name: "rare",
            class_odds: 100.0
        }
    ]
const slot13odds: classOdds[] = [
        {
            class_name: "common",
            class_odds: 76.0
        },
        {
            class_name: "rare",
            class_odds: 96.0
        },
        {
            class_name: "majestic",
            class_odds: 100.0
        }
    ]

export const useBuildPack = function(): Record[] {
    const cardData = useState('card-data').value as Record[]
    let pack: Record[] = []

    let ninjaCount = 0
    let assassinCount = 0
    let rangerCount = 0
    pack.push(BuildCard(cardData, 0, "common", ["Generic"]))
    pack.push(BuildCard(cardData,1, "common", ["Generic"]))
    pack.push(BuildCard(cardData,2, "common", ["Generic"]))
    pack.push(BuildCard(cardData,3, "common", ["Ninja"]))
    pack.push(BuildCard(cardData,4, "common", ["Ranger"]))
    pack.push(BuildCard(cardData,5, "common", ["Ranger"]))
    pack.push(BuildCard(cardData,6, "common", ["Ninja"]))
    pack.push(BuildCard(cardData,7, "common", ["Assassin"]))
    pack.push(BuildCard(cardData,8, "common", ["Assassin"]))
    pack.push(getCardTypesAndRarity(cardData, ["Assassin", "Ninja"], getRandomRarity(slot10odds, 0)))
    const {classes: slot11_classes, rarity: slot11_rarity} = getRandomClass(slot11odds, [["Assassin", "Ninja"], useOutClasses], 0)
    pack.push(getCardTypesAndRarity(cardData, slot11_classes, slot11_rarity))
    pack.push(getCardR(getRandomRarity(slot12odds,0), cardData))
    pack.push(getCardR(getRandomRarity(slot13odds,0), cardData))
    pack.push(getEquipmentCard(cardData, "common"))

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