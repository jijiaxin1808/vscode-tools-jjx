import * as vscode from 'vscode';
import { Repository } from './git';

export interface commitItemType extends vscode.QuickPickItem {
	value: string
}

export interface repoItemType extends vscode.QuickPickItem {
	value: Repository
}

export type formatterFunc = (result: string) => string

export type pickType<T extends vscode.QuickPickItem> = {
	type: 'picker',
	nextLine: boolean,
	placeholder?: string,
	item: T[],
	fomatter?: formatterFunc
}

export type inputType = {
	type: 'input',
	placeholder?: string,
	nextLine: boolean,
	empty: boolean,
	fomatter?: formatterFunc
}

export type commitType<T extends vscode.QuickPickItem> = pickType<T> | inputType
