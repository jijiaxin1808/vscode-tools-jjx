import * as vscode from 'vscode';
import  {  isPickType, commitItemType, commitType } from './type';
import { commitItems } from './commitItem';
import { GitExtension } from './git';

export async function easycommit () {
    const git = getGitExtesion();
    if(!git) return;
    const length = commitItems.length;
    let commitMsg = ''; 
    for(let i = 0; i < length; i++) {
        const currItem = commitItems[i];
        const item: commitItemType | string | undefined = await createCommitInput<commitItemType>(<commitType<commitItemType>>currItem);
        switch (typeof item) {
        case 'undefined': {
            // 这里对undeined情况进行处理
            return null;
            break;
        }
        case 'string':  {
            commitMsg += currItem.nextLine? '\n' : '';
            commitMsg += item;
            break;
        }
        default: {
            commitMsg += currItem.nextLine? '\n' : '';
            commitMsg += item.value;
        }
        }
    }
    git.repositories.forEach(resposity => {
        resposity.inputBox.value = commitMsg;
    });
    vscode.commands.executeCommand('workbench.view.scm');
}

async function createCommitInput<T extends vscode.QuickPickItem>(commitItem: commitType<T>): Promise<T | undefined | string>  {
    if(isPickType<T>(commitItem)) {
        return new Promise(reslove=> {
            const item: T[] = commitItem.item;
            const placeHolder = commitItem.placeholder ? commitItem.placeholder : '';
            vscode.window.showQuickPick<T>(item, {ignoreFocusOut: true, placeHolder }).then(selected => {
                setTimeout(()=>reslove(selected), 500);
            });
        });
    } else {
        return new Promise(reslove=> {
            const validateInput = commitItem.empty ? ()=> null: validateEmpty;
            const placeHolder = commitItem.placeholder ? commitItem.placeholder : '';
            vscode.window.showInputBox({placeHolder, validateInput}).then(selected => {
                setTimeout(()=>reslove(selected), 500);
            });
        });
    }
}

function validateEmpty(str: string) {
    if(str === '') {
        return 'this is required';
    } else return null;
}

function getGitExtesion() {
    const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git');
    const gitExport = gitExtension && gitExtension.exports;
    return gitExport && gitExport.getAPI(1);	
}