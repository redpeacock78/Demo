export class common {}
export namespace common {
  export const curry = <T>(
    func: T
  ): (<U>(...args1: U[]) => T | ((...args2: U[]) => T)) => {
    const aliasFunc: Function = func as unknown as Function;
    const curried = <U>(
      ...args1: U[]
    ): typeof func | ((...args2: U[]) => typeof func) => {
      if (aliasFunc.length <= args1.length) {
        return aliasFunc.apply(func, args1);
      } else {
        return (...args2: U[]): typeof func => {
          return aliasFunc.apply(func, [...args1, ...args2]);
        };
      }
    };
    return curried;
  };

  export const isUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
}
