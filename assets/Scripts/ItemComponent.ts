import { Item } from "./Items/Item";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemComponent extends cc.Component {

    public start() {
        const item: Item = new Item("Sword");
    }
}
