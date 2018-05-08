import { Item } from "./Items/Item";
import { ItemCreator } from "./Items/ItemCreator";
import { ItemFiles } from "./Items/ItemFiles";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemComponent extends cc.Component {

    public async start() {
        for (let i = 0; i < 5; ++i) {
            const item: Item = await ItemCreator.Instance.createItem(ItemFiles.Sword);
            console.log(item.toString());
        }
    }
}
