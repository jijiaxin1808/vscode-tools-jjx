import * as vscode from 'vscode';
import { debounce } from '@jjxtools/utils';
import { openCurrtFIleWithvscode, openWithVscode } from '@jjxtools/open-invscode';
import { easycommit } from '@jjxtools/easy-commit';
// import { infjsTest } from './src/infjsTest';


export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.easycommit', easycommit));
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.openFile', debounce(500, openCurrtFIleWithvscode)));
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.openfolder',openWithVscode));
    // context.subscriptions.push(vscode.commands.registerCommand('jjxTools.infjs',infjsTest));
}