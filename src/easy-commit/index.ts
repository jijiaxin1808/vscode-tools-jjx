import * as vscode from 'vscode';
import  {   commitItemType, commitType, pickType, inputType } from './type';
import { commitItems } from './commitItem';
import { GitExtension } from './git';

function isPickType<T extends vscode.QuickPickItem>(commitItem: commitType<T>) : commitItem is pickType<T>{
    return commitItem.type == 'picker';
} 

export async function easycommit () {
    const git = getGitExtesion();
    if(!git) {
        vscode.window.showErrorMessage('git插件未加载或还在加载中');
        return;
    }
    const length = commitItems.length;
    let commitMsg = ''; 
    for(let i = 0; i < length; i++) {
        const currItem = commitItems[i];
        const item: commitItemType | string | undefined = await createCommitInput<commitItemType>(<commitType<commitItemType>>currItem);
        switch (typeof item) {
        case 'undefined': {
            // 这里对undeined情况进行处理
            return null;
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
    try {
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "正在comit",
            cancellable: true
        }, async progress => {
            progress.report({ increment: 0 });
            for(const repository of git.repositories) {
                await repository.commit(commitMsg);
            }
            progress.report({ increment: 100 });
            return new Promise(reslove=>{
                vscode.window.showInformationMessage('commit 成功');
                reslove(null);
            });
        });
    } catch(e) {
        vscode.window.showErrorMessage(e);
    }
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
    } if(str.length >50) {
        return 'less then 50 char';
    } else return null;
}

function getGitExtesion() {
    const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git');
    const gitExport = gitExtension && gitExtension.exports;
    return gitExport && gitExport.getAPI(1);	
}