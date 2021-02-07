import { infInput } from 'infquery';
import { getCurrtConfig, setConfig } from './utils';
 
const FuncMap = [
    getCurrtConfig,
    () => setConfig('https://registry.npm.taobao.org'),
    () => setConfig('https://registry.npmjs.org'),
    () => setConfig('https://registry.bnpm.bytedance.org'),
    (url: string) => setConfig(url)
];

export function npmconf() {
    infInput([
        {
            type: "list",
            name: 'functions',
            message: '请选择对应的功能',
            choices: [
                {
                    label: "查看当前npm包源地址",
                    type: 0
                }, {
                    label: "设置当前npm源地址为淘宝源",
                    type: 1
                }, {
                    label: "设置当前npm源地址为初始源",
                    type: 2
                }, {
                    label: "设置当前mpm源地址为bnpm",
                    type: 3
                }, {
                    label: '自定义设置npm包源地址',
                    type: 4
                }
            ]
        },
        {
            type: "input",
            name: 'custonNpm',
            message: '请输入npm包源地址',
            when: (result) => {
                console.log({result});
                console.log(result['functions']);
                return (result['functions'] as any)?.type === 4;
            }
        }
    ]).then(async res=> {
        const type: number = (res['functions'] as any)?.type;
        const custom: string = (res['custonNpm'] as any)?.type;
        FuncMap[type](custom);
    });
}