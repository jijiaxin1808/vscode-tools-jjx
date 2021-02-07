import { spawn, exec } from  'child_process';
import  { promisify }  from 'util';
import * as vscode from 'vscode';
const execPromise = promisify(exec);



export async function getCurrtConfig() {
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        title: "检查中",
        cancellable: true
    }, async () => {
        return  execPromise('npm -v').then(() => {
            execPromise('npm config get registry').then(({stdout})  => {
                vscode.window.showInformationMessage(stdout);
            });
        }).catch(err => {
            vscode.window.showErrorMessage('err');
        });
    });
}

export function setConfig(url: string) {
   
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        title: "执行中",
        cancellable: true
    }, async () => {
        return   execPromise('npm -v').then(() => {
            execPromise(`npm config set registry ${url}`).then(()  => {
                vscode.window.showInformationMessage('修改成功');
            });
        }).catch(err => {
            vscode.window.showErrorMessage('出错了, 请检查nodejs/npm是否安装成功');
        });
    });}
