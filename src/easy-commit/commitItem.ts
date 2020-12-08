import { commitItemType, commitType } from './type';
export const commitItems: commitType<commitItemType>[] = [
    {
        type: 'picker',
        nextLine: false,
        placeholder: '水水倒萨',
        item: [{label: 'update', value: 'update',description: 'this is a update for your repo'}, {label: 'init11111', value: 'init', description: 'this is a init for your repo'}],
        
    },
    {
        type: 'picker',
        nextLine: true,
        placeholder: 'jjx',
        item: [{label: 'up321321date', value: 'update',description: 'this is a update for your repo'}, {label: '12312', value: 'init', description: 'this is a init for your repo'}]
    },
    {
        type: 'input',
        placeholder: 'empty true,',
        nextLine: true,
        empty: false
    },
    {
        type: 'input',
        placeholder: 'empty false,',
        nextLine: true,
        empty: true
    }
];