import { it, expect} from 'vitest'
import { describe, test } from 'vitest'
import { setup } from '@nuxt/test-utils'
import buildBox from 'composables/useBuildDraft'

describe('Test new draft builder', ()=> {
    test('Test new draft builder', ()=> {
        console.log(buildBox().packs)
    })
})