import { useBuildBox } from "~/composables/useBuildDraft"
import { useBuildRound } from "~/composables/useBuildRound"
import { describe, it } from "vitest";

it('Test draftbox state', ()=>{
    useBuildBox()
    console.log("OUTPUT: ", useBuildRound());
})