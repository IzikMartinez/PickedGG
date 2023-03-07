import PocketBase from 'pocketbase';
const pb = new PocketBase('http://194.195.222.191')



export const useRecords =  await pb.collection('outsiders').getFullList(200 /* batch size */, {
        sort: '-created',
    })


export const usePocketbase = pb