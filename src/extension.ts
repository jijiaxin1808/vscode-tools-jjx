import * as vscode from 'vscode';
import { debounce } from './utils/index';
import { openCurrtFIleWithvscode, openWithVscode } from './open-invscode';
import { easycommit } from './easy-commit';



export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.easycommit', easycommit));
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.openFile', debounce(500, openCurrtFIleWithvscode)));
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.openfolder',openWithVscode));
}