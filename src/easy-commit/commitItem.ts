import { commitItemType, commitType } from './type';
export const commitItems: commitType<commitItemType>[] = [
    {
        type: 'picker',
        nextLine: false,
        placeholder: 'Select the type of change that you\'re committing:',
        item: [{
            label: 'feat',
            value: 'feat: ',
            description: 'A new feature'
        }, {
            label: 'fix',
            value: 'fix: ',
            description: 'A bug fix'
        }, {
            label: 'docs',
            value: 'docs: ',
            description: 'Documentation only changes'
        }, {
            label: 'style',
            value: 'style: ',
            description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
        }, {
            label: 'refactor',
            value: 'refactor: ',
            description: 'A code change that neither fixes a bug nor adds a feature'
        }, {
            label: 'perf',
            value: 'perf: ',
            description: 'A code change that improves performance'
        }, {
            label: 'test',
            value: 'test: ',
            description: 'Adding missing tests or correcting existing tests'
        }, {
            label: 'build',
            value: 'build: ',
            description: 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)'
        }, {
            label: 'chore',
            value: 'chore: ',
            description: 'Other changes that don\'t modify src or test files'
        }, {
            label: 'revert',
            value: 'revert: ',
            description: 'Reverts a previous commit'
        }
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