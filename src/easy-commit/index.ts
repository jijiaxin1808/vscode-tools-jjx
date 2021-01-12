import * as vscode from 'vscode';
import  {   commitItemType, commitType, pickType, repoItemType } from './type';
import { getCommitItems } from './commitItem';
import { GitExtension, Repository } from './git';

const commitItems = getCommitItems();

function isPickType<T extends vscode.QuickPickItem>(commitItem: commitType<T>) : commitItem is pickType<T>{
    return commitItem.type == 'picker';
} 

export async function easycommit () {
    let git;
    try {
        git = getGitExtesion();
        if(!git) throw new Error();
    }
    catch (e) {
        vscode.window.showErrorMessage('vscode-git插件未加载或还在加载中');
        return;
    }
    let commitRepo: Repository;
    if(git.repositories.length > 1) {
        commitRepo = await creatSelectRepoItmes(git.repositories);
    } else {
        commitRepo = git.repositories[0];
    }
    if(!commitRepo.state.indexChanges.length) {
        vscode.window.showErrorMessage('当前repo还没有暂存文件');
        return null;
    }
    const length = commitItems.length;
    let commitMsg = ''; 
    for(let i = 0; i < length; i++) {
        const currItem = commitItems[i];
        const item: commitItemType | string | undefined | repoItemType = await createCommitInput<commitItemType>(<commitType<commitItemType>>currItem);
        // TODO: 这里的类型要拿出来
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
            await commitRepo.commit(commitMsg);
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

async function creatSelectRepoItmes(repos: Repository[]): Promise<Repository> {
    const selectRepoItems: pickType<repoItemType> =     {
        type: 'picker',
        nextLine: false,
        placeholder: 'Select the repo of current commit',
        item: [
        ],
    };
    for(const repo of repos) {
        selectRepoItems.item.push({
            value: repo,
            label: repo.rootUri.path
        });
    }
    const item = await createCommitInput(selectRepoItems) as repoItemType;
    return item.value;
}
async function createCommitInput<T extends vscode.QuickPickItem>(commitItem: commitType<T>): Promise<T | undefined | string | repoItemType>  {
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