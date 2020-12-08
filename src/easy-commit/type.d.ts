import * as vscode from 'vscode';

export interface commitItemType extends vscode.QuickPickItem {
	value: string
}

export type inputType<T extends vscode.QuickPickItem> = {
	type: 'input',
	nextLine: boolean,
	empty: boolean,
	placeholder?: string,
	item: T[]
}

export type pickType = {
	type: 'picker',
	placeholder?: string,
	nextLine: boolean
}

export type commitType<T extends vscode.QuickPickItem> = inputType<T> | pickType

export function isInputType<T extends vscode.QuickPickItem>(commitItem: commitType<T>) : commitItem is inputType<T>{
    return commitItem.type == 'input';
} 
export function isPickType<T extends vscode.QuickPickItem>(commitItem: commitType<T>) : commitItem is pickType{
    return commitItem.type == 'picker';
}