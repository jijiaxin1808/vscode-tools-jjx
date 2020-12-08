import * as vscode from 'vscode';
import { debounce } from './utils/index';
import { openFIleWithvscode } from './open-invscode';
import { easycommit } from './easy-commit';



export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.easycommit', debounce(500,easycommit)));
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.openFile', debounce(500,openFIleWithvscode)));
}

