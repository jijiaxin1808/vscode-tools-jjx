import * as vscode from 'vscode';
import * as path from 'path';

export function openCurrtFIleWithvscode() {
    return new Promise(() => {
        const currtFileName = <string>vscode.window.activeTextEditor?.document.fileName;
        console.log(currtFileName);
        if (currtFileName == undefined) throw new Error('未能成功获取当前文件');
        vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(currtFileName));
    }).catch(error => {
        vscode.window.showErrorMessage(error.toString());
    });
}

export function openWithVscode(uri: vscode.Uri) {
    vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(uri.fsPath), true );
}

export function selectFilesinVscode(uri: vscode.Uri) {
    vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        defaultUri: uri ? uri : vscode.Uri.parse(path.resolve(__dirname))
    }).then(path => {
        if(path) {
            vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(path[0].fsPath), true );
        }
    });
}