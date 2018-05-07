export class AssetUtils {
    private static instance: AssetUtils;
    public static get Instance() {
        if (!this.instance) {
            this.instance = new AssetUtils();
        }

        return this.instance;
    }

    public async loadResource<T>(resName: string,
                                 onProgress?: (completedCount: number,
                                               totalCount: number, item: any) => void): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            cc.loader.loadRes(resName,
                onProgress,
                (err, resource) => {
                    if (err) {
                        console.error("AssetUtils::loadResource", resName, err);
                        reject(err);
                        return;
                    }
                    if (resource instanceof cc.Asset) {
                        cc.loader.setAutoReleaseRecursively(resource, true);
                    }
                    resolve(resource);
                });
        });
    }
}
