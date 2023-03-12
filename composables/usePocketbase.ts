import PocketBase, { Record } from 'pocketbase';
const pb = new PocketBase('http://194.195.222.191')


export let useMaster = [] as Record[]
const useSlave = async () => await pb.collection('outsiders').getFullList(200 /* batch size */, {
        sort: '-created',
    }).then(data => {
        useMaster = data 
    })

export const usePocketbase = pb