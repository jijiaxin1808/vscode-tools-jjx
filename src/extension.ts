import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('jjxTools.openFile', openFIleWithvscode));
}

function openFIleWithvscode() {
	return new Promise(() => {
		const currtFileName = <string>vscode.window.activeTextEditor?.document.fileName;
		if (currtFileName == undefined) throw new Error('未能成功获取当前文件');
		vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(currtFileName));
	}).catch(error => {
		vscode.window.showErrorMessage(error.toString());
	});
}
