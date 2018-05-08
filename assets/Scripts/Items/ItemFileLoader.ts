import { AssetUtils } from "../AssetUtils";
import { IRangeFile, Item, ItemFile, ItemType, ItemTypeFile } from "./Item";
import { ItemFiles } from "./ItemFiles";

export class ItemFileLoader {
    private itemFileType: ItemFiles;
    private itemFile: ItemFile;
    public constructor(itemFile: ItemFiles) {
        this.itemFileType = itemFile;
    }

    public async createItemFile(): Promise<ItemFile> {
       this.itemFile = await this.loadItemFile();
       const rangeFile = await this.loadRangeFile();
       const itemTypeFile = await this.loadItemTypeFile();

       return this.constructFinalItemFile([itemTypeFile, rangeFile, this.itemFile]);
    }
    private async loadItemFile(): Promise<ItemFile> {
        return await AssetUtils.Instance.loadResource<ItemFile>(this.itemFileType);
    }

    private async loadRangeFile(): Promise<IRangeFile> {
        return await AssetUtils.Instance.loadResource<IRangeFile>(ItemFiles[this.itemFile.range]);
    }

    private async loadItemTypeFile(): Promise<ItemTypeFile> {
        return await AssetUtils.Instance.loadResource<ItemTypeFile>(ItemFiles[this.itemFile.type]);
    }

    private constructFinalItemFile(files): ItemFile {
        /// Files in order from least priority to highest priority
        const finalItemFile = files.pop();

        while (files.length > 0) {
            const nextItemFile = files.pop();
            this.concatOptionalAttributes(finalItemFile, nextItemFile);
            this.concatRequiredAttributes(finalItemFile, nextItemFile);
        }

        return finalItemFile;
    }

    private concatOptionalAttributes(finalItemFile, nextItemFile) {
        if (!finalItemFile.optionalAttributes) {
            finalItemFile.optionalAttributes = [];
        }
        const currentAttr = finalItemFile.optionalAttributes;
        const nextAttr = nextItemFile.optionalAttributes || [];
        this.concatUniqueAttributes(currentAttr, nextAttr);
    }

    private concatRequiredAttributes(finalItemFile, nextItemFile) {
        if (!finalItemFile.requiredAttributes) {
            finalItemFile.requiredAttributes = [];
        }
        const currentAttr = finalItemFile.requiredAttributes;
        const nextAttr = nextItemFile.requiredAttributes || [];
        this.concatUniqueAttributes(currentAttr, nextAttr);
    }

    private concatUniqueAttributes(currentAttr, nextAttr) {
        for (const next of nextAttr) {
            let found: boolean = false;
            for (const current of currentAttr) {
                if (current.name === next.name) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                currentAttr.push(next);
            }
        }
    }
}
