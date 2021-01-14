import { Application, AppConstructorOptions } from 'spectron';
export declare class SpectronDialogAddon {
    private app;
    createApplication(options: AppConstructorOptions): Application;
    setDialogDelay(delay: number): Promise<void>;
    setDialogButtonIndex(index: number): Promise<void>;
    getItemsCount(): Promise<number>;
    setContextMenuId(name: string): Promise<void>;
}
declare const spectronDialogAddon: SpectronDialogAddon;
export default spectronDialogAddon;
