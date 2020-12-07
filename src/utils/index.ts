function debounce<T extends (...args: any[])=> any>(timeOut: number, cb: T ) {
  let timer: NodeJS.Timeout | null = null;
  return function(...args: any[]): void  {
    clearTimeout(<NodeJS.Timeout>timer);
    timer = setTimeout(()=>{
      cb(...args);
    }, timeOut);
  };
}

export { debounce };
