import { AssetUtils } from "../AssetUtils";
import { Attribute } from "../Attributes/Attribute";
import { AttributeType } from "../Attributes/AttributeType";
import { NameAttribute } from "../Attributes/NameAttribute";
import { ItemFiles } from "./ItemFiles";
import { ArrayUtils } from "../ArrayUtils";

export class Item {
    public name: string;

    public attributes: Map<AttributeType, Attribute>;
    public constructor(name: string) {
        this.attributes = new Map<AttributeType, Attribute>();
        this.addAttribute(new NameAttribute(name));

        this.loadItemFile(ItemFiles.Sword).then((item: ItemFile) => {
            this.loadItemFileChain(this.getItemFileNames(item.type)).then((itemFiles) => {
                console.log(this.constructFinalItemFile(itemFiles));
            });
        });
    }

    public addAttribute(attribute: Attribute) {
        this.attributes.set(attribute.type, attribute);
    }

    public getAttribute(attributeType: AttributeType) {
        return this.attributes.get(attributeType);
    }

    public hasAttribute(attributeType: AttributeType) {
        return this.attributes.has(attributeType);
    }

    // protected abstract getItemFile();

    private async loadItemFileChain(itemFiles: string[]): Promise<ItemFile[]> {
        const loadedItemFiles: ItemFile[] = [];
        for (const itemFile of itemFiles) {
            console.log("Loading itemFile", itemFile);
            loadedItemFiles.push(await this.loadItemFile(ItemFiles[itemFile]));
        }

        console.log(loadedItemFiles);
        return loadedItemFiles;
    }

    private async loadItemFile(itemfile: ItemFiles): Promise<ItemFile> {
        const itemDef = await AssetUtils.Instance.loadResource<ItemFile>(itemfile);
        return itemDef;
    }

    private getItemFileNames(itemType: ItemType): string[] {
        const itemTypeChain: string[] = [];
        let currentType = itemType;
        itemTypeChain.push(itemType.name);
        while (currentType.type) {
            currentType = currentType.type;
            itemTypeChain.push(currentType.name);
        }

        console.log(itemTypeChain);
        return itemTypeChain;
    }

    private constructFinalItemFile(itemFiles: ItemFile[]): ItemFile {
        const finalItemFile = itemFiles.pop();

        while (itemFiles.length > 0) {
            const nextItemFile = itemFiles.pop();
            this.concatOptionalAttributes(finalItemFile, nextItemFile);
            this.concatRequiredAttributes(finalItemFile, nextItemFile);
        }

        return finalItemFile;
    }

    private concatOptionalAttributes(finalItemFile, nextItemFile) {
        if (!finalItemFile.optionalAttributes) {
            finalItemFile.optionalAttributes = [];
        }
        const currentOpAttr = finalItemFile.optionalAttributes || [];
        const nextOpAttr = nextItemFile.optionalAttributes || [];
        for (const nextAttr of nextOpAttr) {
            let found: boolean = false;
            for (const currentAttr of currentOpAttr) {
                if (currentAttr.name === nextAttr.name) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                currentOpAttr.push(nextAttr);
            }
        }
    }

    private concatRequiredAttributes(finalItemFile, nextItemFile) {
        if (!finalItemFile.requiredAttributes) {
            finalItemFile.requiredAttributes = [];
        }
        const currentReqAttr = finalItemFile.requiredAttributes;
        const nextReqAttr = nextItemFile.requiredAttributes || [];
        for (const nextAttr of nextReqAttr) {
            let found: boolean = false;
            for (const currentAttr of currentReqAttr) {
                if (currentAttr.name === nextAttr.name) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                currentReqAttr.push(nextAttr);
            }
        }
    }

}

export interface ItemFile {

    type: ItemType;
    rarity: Rarity;
    optionalAttributes?: [{
        name: AttributeType,
    }];
    requiredAttributes?: [{
        name: AttributeType,
    }];
}

export interface ItemType {
    name: string;
    type?: ItemType;
}

export enum Rarity {
    Common = "Common",
    Rare = "Rare",
}
