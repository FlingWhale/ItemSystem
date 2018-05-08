import { ArrayUtils } from "../ArrayUtils";
import { AssetUtils } from "../AssetUtils";
import { Attribute } from "../Attributes/Attribute";
import { AttributeType } from "../Attributes/AttributeType";
import { NameAttribute } from "../Attributes/NameAttribute";
import { ItemFiles } from "./ItemFiles";

export class Item {
    public name: string;

    public attributes: Map<AttributeType, Attribute>;
    public constructor(name: string) {
        this.attributes = new Map<AttributeType, Attribute>();
        this.addAttribute(new NameAttribute(name));


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
}

export interface ItemFile {

    type: ItemType;
    range: Range;
    weaponClass: WeaponClass;
    rarity: Rarity;
    optionalAttributes?: [{
        name: AttributeType,
    }];
    requiredAttributes?: [{
        name: AttributeType,
    }];
}

export interface IRangeFile {
    optionalAttributes?: [{
        name: AttributeType,
    }];
    requiredAttributes?: [{
        name: AttributeType,
    }];
}

export interface ItemTypeFile {
    optionalAttributes?: [{
        name: AttributeType,
    }];
    requiredAttributes?: [{
        name: AttributeType,
    }];
}

export enum ItemType {
    Weapon = "Weapon",
}
export enum Range {
    Melee = "Melee",
    Ranged = "Ranged",
}

export enum WeaponClass {
    Sword = "Sword",
}

export enum Rarity {
    Common = "Common",
    Rare = "Rare",
}
