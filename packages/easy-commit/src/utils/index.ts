import { WorkspaceConfiguration, workspace } from 'vscode';
export function getExtConfig(): WorkspaceConfiguration {
    return workspace.getConfiguration('Jtools');
}