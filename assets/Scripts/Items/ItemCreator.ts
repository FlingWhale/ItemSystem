import { AssetUtils } from "../AssetUtils";
import { IRangeFile, Item, ItemFile, ItemType, ItemTypeFile } from "./Item";
import { ItemFiles } from "./ItemFiles";

export class ItemCreator {
    private static instance: ItemCreator;
    public static get Instance() {
        if (!this.instance) {
            this.instance = new ItemCreator();
        }

        return this.instance;
    }

    public createItem() {

    }

    
}
