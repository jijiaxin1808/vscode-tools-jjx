import * as vscode from 'vscode';
import  { isInputType, isPickType, commitItemType, commitType } from './type';
import { commitItems } from './commitItem';
import { GitExtension } from './git';

export async function easycommit () {
    const length = commitItems.length;
    for(let i = 0; i < length; i++) {
        const item =await createCommitInput<commitItemType>(<commitType<commitItemType>>commitItems[i]);
        console.log(item);
    }
}

async function createCommitInput<T extends vscode.QuickPickItem>(commitItem: commitType<T>) {
    if(isInputType<T>(commitItem)) {
        return new Promise(reslove=> {
            const item: T[] = commitItem.item;
            const placeHolder = commitItem.placeholder ? commitItem.placeholder : '';
            vscode.window.showQuickPick<T>(item, {ignoreFocusOut: true, placeHolder }).then(selected => {
                setTimeout(()=>reslove(selected), 500);
            });
        });
    } else if(isPickType(commitItem)) {
        return new Promise(reslove=> {
            const placeHolder = commitItem.placeholder ? commitItem.placeholder : '';
            vscode.window.showInputBox({placeHolder}).then(selected => {
                setTimeout(()=>reslove(selected), 500);
            });
        });
    }
}

function getGitExtesion() {
    const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git');
    const gitExport = gitExtension && gitExtension.exports;
    return gitExport && gitExport.getAPI(1);	
}