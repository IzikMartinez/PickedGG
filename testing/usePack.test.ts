import { it, expect} from 'vitest'
import {useBuildPack} from 'composables/usePack'
import Pack from 'composables/pack'


it("PocketBase should have some records", () => {
    console.log(useBuildPack().at(0))
})