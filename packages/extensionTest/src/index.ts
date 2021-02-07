import { infInput } from 'infquery';
import * as vscode from 'vscode';
export function test() {
    infInput([
        {
            type: "input",
            name: 'jjxsb',
            message: '这里是第一个input',
            // prefix: 'prefix',
            // suffix: 'subfix'
        },
        {
            type: "input",
            name: 'aaa',
            when: (obj)=>{
                return obj['jjxsb'] === 'jjxsb';
            },
            validate: (input, res)=>{
                console.log({res});
                if(input.startsWith('jjx')) return `${input} can\`t valite`;
                return null;
            },
            default: (res)=>{
                return res['jjxsb'];
            }
        }
    ]).then(res=> {
        vscode.window.showInformationMessage(JSON.stringify(res));
    });
}