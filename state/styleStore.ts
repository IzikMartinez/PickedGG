export const useStyleStore = defineStore('style', {
    state: ()=> ({
        cardboxClass: "mid",
        cardSizeClass: ["med", "card-box"],
        slid: false,
    }),
    getters: {
        slider: (state) => state.slid ? "pick-bar" : "pick-bar-collapsed",
        slideBtn: (state) => state.slid ? "slide-btn" : "slide-btn-cl",
    },
    actions: {
        delay(ms: number) {
            return new Promise( resolve => setTimeout(resolve, ms))
        },
        async screenWipe(roundFlag: boolean) {
            //const cardClass = useCardClass()
            const cardboxClass = useCardBoxClass().value
            if(roundFlag == true) { // round is odd
                useCardBoxClass().value = cardboxClass + "-right"
                await this.delay(400)
                useCardBoxClass().value = cardboxClass + "-left"
                await this.delay(300)
            } else {
                useCardBoxClass().value = cardboxClass + "-left"
                await this.delay(400)
                useCardBoxClass().value = cardboxClass + "-right"
                await this.delay(300)
            }
            useCardBoxClass().value = cardboxClass
        },
        setCardSize(payload: string) {
            if (payload === "small") {
                this.cardSizeClass[0] = "sml"
                this.cardSizeClass[1] = "card-box-sml"
            } else if (payload === "big" ) {
                this.cardSizeClass[0] = "big"
                this.cardSizeClass[1] = "card-box-big"
            } else {
                this.cardSizeClass[0] = "med"
                this.cardSizeClass[1] = "card-box"
            }
        },
        toggleSlider() {
            this.slid = !this.slid
            console.log("toggled " + this.slid + " : " + this.slider)
        },
    }
})