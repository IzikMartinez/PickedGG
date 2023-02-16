import Draft from "~~/composables/draft";

export const useDraftStore = defineStore('main', {
    state: ()=> ({
        draft: new Draft()
    }),
    getters: {}, 
    actions: {}

})