declare module '*.png'
declare module '*.svg'
declare module '*.json'
declare module '*.scss'
declare module '*.css'
declare module '*.sass'
declare const DEVELOPMENT: boolean
declare const IS_SERVER: boolean


type PickType<T, K extends T> = Exclude<T, Exclude<T, K>>