import { MathUtils } from "../MathUtils";
import { Attribute } from "./Attribute";
import { AttributeType } from "./AttributeType";

export class DamageAttribute extends Attribute {
    public damage: number;

    public constructor(min: number, max: number) {
        super(AttributeType.Damage);
        this.damage = MathUtils.randomInRange(min, max);
    }

    public toString() {
        let str = super.toString();
        str += "\n\tValue: " + this.damage;
        return str;
    }
}
