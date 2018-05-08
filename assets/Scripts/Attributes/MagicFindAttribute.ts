import { MathUtils } from "../MathUtils";
import { Attribute } from "./Attribute";
import { AttributeType } from "./AttributeType";

export class MagicFindAttribute extends Attribute {
    public magicFind: number;

    public constructor(min: number, max: number) {
        super(AttributeType.MagicFind);
        this.magicFind = MathUtils.randomInRange(min, max);
    }

    public toString() {
        let str = super.toString();
        str += "\n\tValue: " + this.magicFind;
        return str;
    }
}
