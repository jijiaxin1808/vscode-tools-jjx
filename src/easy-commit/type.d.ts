import * as vscode from 'vscode';
import { Repository } from './git';

export interface commitItemType extends vscode.QuickPickItem {
	value: string
}

export interface repoItemType extends vscode.QuickPickItem {
	value: Repository
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
