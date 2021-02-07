import * as vscode from 'vscode';
import { debounce } from '@jjxtools/utils/src';
import { openCurrtFIleWithvscode, openWithVscode,  selectFilesinVscode} from '@jjxtools/open-invscode';
import { easycommit } from '@jjxtools/easy-commit';
import { test } from '@jjxtools/extensiontest';
import { npmconf } from '@jjxtools/npmconf';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.easycommit', easycommit));
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.openFile', debounce(500, openCurrtFIleWithvscode)));
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.openfolder',openWithVscode));
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.selectFolder',selectFilesinVscode));
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.testest',test));
    context.subscriptions.push(vscode.commands.registerCommand('jjxTools.npmconf',npmconf));
}