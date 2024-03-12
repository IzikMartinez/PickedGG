import { it, expect} from 'vitest'
import {useBuildPack, BuildCard} from 'composables/useBuildPack'
import { Record } from 'pocketbase';

type card_counter = {
    id: string,
    count: number
}

import PocketBase from 'pocketbase';
const pb = new PocketBase('https://pack1pick1.com');

const useRecords = pb.collection('outsiders').getFullList(200 /* batch size */, {
        sort: '-created',
})
it("PocketBase should have some records", () => {

    let blankMap = [] as card_counter[]
    const cardData = useState('card-data').value as Record[]
    BuildCard(cardData, 0, 'common', ['Generic']) 
})
    /*
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
*/
