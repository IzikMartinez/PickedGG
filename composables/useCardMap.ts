type cardMap = {
    id: string,
    count: number
}
let cardmap = [] as cardMap[]
export const useCardMap = ()=> useState('card-map', ()=> cardmap)