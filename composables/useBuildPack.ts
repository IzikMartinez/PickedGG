import {card} from "composables/types/card";
import { Record } from "pocketbase";
import { CardImage } from "~~/.nuxt/components";

type CardMap = {
    id: string,
    count: number
}
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
// COMMON CARD LIMIT
////////////////////////////////////////////////////////////////////////////


function checkIfMax(card_id: string, cardMap: CardMap[]) {
    const idx = cardMap.findIndex(x => x.id === card_id)
    if(cardMap.at(idx)!.count <= 3) {return false}
    else return true
}

function IsEmpty(card_id: string, cardMap: CardMap[]) {
    let idx
    if(cardMap.length === 0)
        return true
    else if(cardMap.length > 0 && cardMap.findIndex(x => x.id === card_id) === -1)
        return true
    else return false
}

// function IsCardInMap(card_id: string, cardMap: CardMap[]) {
 //   if (IsEmpty(card_id, cardMap))
 //}

function initializeCardmapEntry(card_id: string) {
    useCardMap().value!.push({
        id: card_id,
        count: 0
    })
}

function incrementCardmap(idx: number) {
    const cardMap = useCardMap()
    if(cardMap.value[idx])
        cardMap.value[idx].count++
    else
        console.log("TRIED TO COUNT EMPTY MAP AT: ", cardMap.value[idx]);
        
}

function checkMap(card_id: string, cardMap: CardMap[]) {

 }
/*
    roll card id
    check card id
    get counter for card id
    if counter <3
        add card to pack
    else
        reroll card id
*/
////////////////////////////////////////////////////////////////////////////
// COMMON CARD LIMIT END
////////////////////////////////////////////////////////////////////////////

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

function getRandomCard(cards: Record[]): Record {
    let card_index = randomCardNumber(cards)
    let card = cards.at(card_index) as Record
    const cardMap = useCardMap().value as CardMap[]

    /*
    check if empty 
    TRUE -> 
        initialize card entry in map
        return card
    FALSE ->
        check if full
        TRUE -> 
            get new card index
        FALSE ->
            increment counter
    return card
    */
    if(IsEmpty(card.id, cardMap)) {
        initializeCardmapEntry(card.id)
    } else {
        do {
            if(checkIfMax(card.id, cardMap)) {
                card_index = randomCardNumber(cards)
                card = cards.at(card_index) as Record
            } else incrementCardmap(card_index)
        } while(checkIfMax(card.id, cardMap))
    }
    return card
}

////////////////////////////////////////////////////////////////////////////
// LAYER 3 METHODS
////////////////////////////////////////////////////////////////////////////
function getCardT(classes: string[], cardData: Record[]): Record{
    let cards_by_type = filterByType(cardData, classes)
    let card = getRandomCard(cards_by_type)
    return card
}

function getCardTs(cardData: Record[], classes: string[]) {
    const cards_by_types = filterTypes(cardData, classes)
    return getRandomCard(cards_by_types)
}

function getCardR(rarity: string, cardData: Record[]): Record{
    let cards_by_rarity = filterByRarity(rarity, cardData)
    //function that gets a random number based on length of cards_by_type_rarity
    let card = getRandomCard(cards_by_rarity)
    return card
    //return the card
}

//////////////////// LAYER 5 ////////////////////////
function getCardTR(type: string[], rarity: string, cardData: Record[]): Record{
    let cards_by_type_rarity = filterByTypeAndRarity(type, rarity, cardData)
    //function that gets a random number based on length of cards_by_type_rarity
    let card = getRandomCard(cards_by_type_rarity)
    return card
    //return the card
}

function getEquipmentCard(cardData: Record[], rarity: string) {
    const cards_by_rarity = filterByRarity(rarity, cardData)
    const cards_by_equip = filterForEquipment(cards_by_rarity)
    return getRandomCard(cards_by_equip)
}

function getCardTypesAndRarity(cardData: Record[], validClasses: string[], rarity: string): Record{
    const cards_by_rarity = filterByRarity(rarity, cardData)
    const cards_by_types_rarity = filterTypes(cards_by_rarity, validClasses)
    return getRandomCard(cards_by_types_rarity)
}
export function BuildCard(cardData: Record[], card_in_pack: number, rarity?: string, type?: string[]): Record {

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
interface classesAndRarity {
    classes: string[],
    rarity: string
}
interface classesAndOdds {
    classes: string[]
    odds: number
}

function getWinner(dieroll: number, classOdds: classOdds[]) {
    return classOdds.filter(cls => cls.class_odds > dieroll)
}

function getRandomRarity(classOdds: classOdds[], count: number): string {
    const winner = getWinner(getRandomInt(100,1), classOdds)
    return winner[0].class_name
}

function getRandomClasss(classSets: classesAndOdds[]) {
    const dieroll = getRandomInt(100, 1)
    const winner = classSets.filter(set => set.odds > dieroll)
    return winner[0].classes
}

function getIsCommon(testee: string, test: string) {
    if(testee === "common") return true
    else return false
}

function getConditionalClass(classSets: string[][], classOdds: classOdds[], count: number): classesAndRarity  {
    const randRarity = getRandomRarity(classOdds, count)
    if( randRarity === "common") {
        return {classes: classSets[0], rarity: randRarity}
    } else return {classes: classSets[1], rarity: randRarity}
}

function getHybrids(classSets: classesAndOdds[], classOdds: classOdds[], count: number) {
    const randRarity = getRandomRarity(classOdds, count)
    if( randRarity === "common") {
        return {classes: getRandomClasss(classSets), rarity: randRarity}
    } else return {classes: useOutClasses, rarity: randRarity}
}

function getSlot11(cardData: Record[], classSets: classesAndOdds[], classOdds: classOdds[], count: number) {
    const {classes: slot11_classes, rarity: slot11_rarity} = getHybrids(classSets, classOdds, count)
    if(slot11_rarity === "common") {
        return getCardTypesAndRarity(cardData, slot11_classes, slot11_rarity)
    } else return getCardTR(slot11_classes, slot11_rarity, cardData)
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

const outsider_hybrids: classesAndOdds[] = [
    { classes: ["Assassin", "Ninja"], odds: 50},
    { classes: ["Assassin", "Ranger"], odds: 100},
]

export const useBuildPack = function(): Record[] {
    const cardData = useState('card-data').value as Record[]
    const cardmap = useCardMap().value as CardMap[]
    
    let pack: Record[] = []

    let ninjaCount = 0
    let assassinCount = 0
    let rangerCount = 0
    pack.push(BuildCard(cardData, 0, "common", ["Generic"]))
    pack.push(BuildCard(cardData, 1, "common", ["Generic"]))
    pack.push(BuildCard(cardData, 2, "common", ["Generic"]))
    pack.push(BuildCard(cardData, 3, "common", ["Ninja"]))
    pack.push(BuildCard(cardData, 4, "common", ["Ranger"]))
    pack.push(BuildCard(cardData, 5, "common", ["Ranger"]))
    pack.push(BuildCard(cardData, 6, "common", ["Ninja"]))
    pack.push(BuildCard(cardData, 7, "common", ["Assassin"]))
    pack.push(BuildCard(cardData, 8, "common", ["Assassin"]))
    const {classes: slot10_classes, rarity: slot10_rarity} = getHybrids(outsider_hybrids, slot10odds, 0)
    pack.push(getCardTypesAndRarity(cardData, slot10_classes, slot10_rarity))
    pack.push(getSlot11(cardData, outsider_hybrids, slot11odds, 0))
    pack.push(getCardR(getRandomRarity(slot12odds,0), cardData))
    const {classes: slot13_classes, rarity: slot13_rarity} = getConditionalClass([["Assassin", "Ninja", "Ranger"], useOutClasses], slot11odds, 0)
    pack.push(getCardTR(slot13_classes, slot13_rarity, cardData))
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