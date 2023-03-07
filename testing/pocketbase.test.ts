import { it, expect} from 'vitest'
import { usePocketbase, useRecords } from 'composables/usePocketbase'


it("PocketBase should have some records", () => {
    expect(useRecords.at(0)?.id).toBe('l0g474k4t489cv6')
    console.log(usePocketbase.collection('outsiders').getOne('l0g474k4t489cv6', {
        expand: 'card_name'
    })
    )
})
