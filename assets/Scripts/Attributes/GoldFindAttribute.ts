import { MathUtils } from "../MathUtils";
import { Attribute } from "./Attribute";
import { AttributeType } from "./AttributeType";

export class GoldFindAttribute extends Attribute {
    public goldFind: number;

    public constructor(min: number, max: number) {
        super(AttributeType.MagicFind);
        this.goldFind = MathUtils.randomInRange(min, max);
    }
}
