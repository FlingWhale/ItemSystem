import { AssetUtils } from "../AssetUtils";
import { AttributeFactory } from "../Attributes/AttributeFactory";
import { IRangeFile, Item, ItemFile, ItemType, ItemTypeFile } from "./Item";
import { ItemFileLoader } from "./ItemFileLoader";
import { ItemFiles } from "./ItemFiles";

export class ItemCreator {
    private static instance: ItemCreator;
    public static get Instance() {
        if (!this.instance) {
            this.instance = new ItemCreator();
        }

        return this.instance;
    }

    public async createItem(itemfileName: ItemFiles): Promise<Item> {
        const itemFile = await new ItemFileLoader(itemfileName).createItemFile();
        const item = new Item(itemFile.weaponClass);
        this.addRequiredAttributes(item, itemFile);
        this.addOptionalAttributes(item, itemFile);

        return item;
    }

    private addRequiredAttributes(item: Item, itemFile: ItemFile) {
        for (const attribute of itemFile.requiredAttributes) {
            const createdAttribute = AttributeFactory.create(attribute.name);
            item.addAttribute(createdAttribute);
        }
    }
    private addOptionalAttributes(item: Item, itemFile: ItemFile) {

        for (let i = 0; i < 2 && itemFile.optionalAttributes.length > 0; ++i) {

            const randomAttributeIndex = Math.floor(Math.random() * itemFile.optionalAttributes.length);
            const attribute = itemFile.optionalAttributes[randomAttributeIndex];
            item.addAttribute(AttributeFactory.create(attribute.name));

        }
    }

}
