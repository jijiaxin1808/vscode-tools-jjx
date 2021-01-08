function debounce<T extends (...args: any[])=> any>(timeOut: number, cb: T ) {
    let timer: NodeJS.Timeout | null = null;
    return function(this: ThisParameterType<T>,...args: any[]): void  {
        clearTimeout(<NodeJS.Timeout>timer);
        timer = setTimeout(()=>{
            cb.apply(this, args);
        }, timeOut);
    };
}

export { debounce };