import { commitItemType, commitType, pickType } from './type';
import { getExtConfig } from '../utils/index';
export const commitItems: commitType<commitItemType>[] = [
    {
        type: 'picker',
        nextLine: false,
        placeholder: 'Select the type of change that you\'re committing:',
        item: [
        ],
    },
    {
        type: 'input',
        nextLine: false,
        empty: true,
        placeholder: 'What is the scope of this change (e.g. component or file name): (press enter to skip)',
    },
    {
        type: 'input',
        placeholder: 'Write a short, imperative tense description of the change (max 50 chars):',
        nextLine: true,
        empty: false
    },
    {
        type: 'input',
        placeholder: 'Provide a longer description of the change: (press enter to skip)',
        nextLine: true,
        empty: true
    },
    {
        type: 'picker',
        nextLine: false,
        placeholder: 'Are there any breaking changes?',
        item: [{
            label: 'no',
            value: '',
        }, {
            label: 'yes',
            value: '(has break changes)',
        }]
    }
];

export function getCommitItems() {
    const items = getExtConfig().get('commitItems');
    (commitItems[0] as pickType<commitItemType>).item = items as commitItemType[];
    return commitItems;
}