interface ImportMeta {
  readonly env: {
    readonly SSR: boolean;
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly PROD: boolean;
    readonly DEV: boolean;
    [key: string]: any;
  };
}

declare module 'common' {
  export const store: {
    globalRegister: (store: any, props?: any) => void;
  };
}
declare module 'path' {
  export const resolve: Function
}


declare interface Window {
  __POWERED_BY_QIANKUN__?: boolean;
}