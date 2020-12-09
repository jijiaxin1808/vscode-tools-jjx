import * as vscode from 'vscode';

export interface commitItemType extends vscode.QuickPickItem {
	value: string
}

export type pickType<T extends vscode.QuickPickItem> = {
	type: 'picker',
	nextLine: boolean,
	placeholder?: string,
	item: T[]
}

export type inputType = {
	type: 'input',
	placeholder?: string,
	nextLine: boolean,
	empty: boolean
}

export type commitType<T extends vscode.QuickPickItem> = pickType<T> | inputType
