let timerID: NodeJS.Timer
export const useTimerStore = defineStore("timer", {
    state: ()=> ({
        time: 0,
    }),
    getters: {
        getMinutes: (state) => Math.floor(state.time/60),
        getSeconds: (state) => state.time%60
    },
    actions: {
        decrementTime() { this.time-- },
        initializeTimer(init: number) { this.time = init },
        timer(init: number) {
            this.initializeTimer(init)
            timerID = setInterval(()=> {
                this.time--; 
                if(this.time <=0) clearInterval(timerID);
            },1000)
        },
        setTimer(init: number) {
            clearInterval(timerID)
            this.timer(init*10)
        },
    }
})