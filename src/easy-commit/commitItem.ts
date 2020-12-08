import { commitItemType, commitType } from './type';
export const commitItems: commitType<commitItemType>[] = [
    {
        type: 'input',
        nextLine: false,
        empty: false,
        placeholder: '水水倒萨',
        item: [{label: 'update', value: 'update',description: 'this is a update for your repo'}, {label: 'init11111', value: 'init', description: 'this is a init for your repo'}],
        
    },
    {
        type: 'input',
        nextLine: false,
        empty: false,
        placeholder: 'jjx',
        item: [{label: 'up321321date', value: 'update',description: 'this is a update for your repo'}, {label: '12312', value: 'init', description: 'this is a init for your repo'}]
    },
    {
        type: 'picker',
        placeholder: 'jjx,',
        nextLine: false,
    }
];