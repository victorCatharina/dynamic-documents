import { Response } from 'express';
import { LocalStorageService } from './local-storage.service';
export declare class StorageController {
    private readonly localStorageService;
    constructor(localStorageService: LocalStorageService);
    getAsset(storageKey: string, res: Response): Promise<void>;
}
