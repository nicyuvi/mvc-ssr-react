export const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';
export const PORT: number = parseInt(process.env.PORT ?? '5173', 10);
export const BASE_URL: string = process.env.BASE ?? '/';
