import PocketBase, { Record } from 'pocketbase';
const pb = new PocketBase('https://pack1pick1.com');

export const useRecords = pb.collection('outsiders').getFullList(200 /* batch size */, {
        sort: '-created',
    })
export const usePocketbase = pb
