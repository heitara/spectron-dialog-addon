import { Application, AppConstructorOptions } from 'spectron';
export declare class SpectronDialogAddon {
    private app;
    createApplication(options: AppConstructorOptions): Application;
    setDialogDelay(delay: Number): Promise<void>;
    setDialogButtonIndex(index: Number): Promise<void>;
}
declare const spectronDialogAddon: SpectronDialogAddon;
export default spectronDialogAddon;
