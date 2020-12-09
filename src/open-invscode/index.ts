import * as vscode from 'vscode';
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