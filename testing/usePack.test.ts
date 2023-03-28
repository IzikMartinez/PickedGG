import { it, expect} from 'vitest'
import {useBuildPack, getInvalidClasses, getRandomRarity} from 'composables/useBuildPack'
import { Record } from 'pocketbase';


it("PocketBase should have some records", () => {
    interface classOdds {
        class_name: string;
        class_odds: number;
    }
    const useOutClasses = ["Assassin", "Ninja", "Ranger", "Generic", "Equipment"]
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
    console.log(getInvalidClasses(useOutClasses, ["Equipment"]))
    console.log(getRandomRarity(slot11odds, 0))
})