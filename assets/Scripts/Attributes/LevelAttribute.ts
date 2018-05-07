
import { MathUtils } from "../MathUtils";
import { Attribute } from "./Attribute";
import { AttributeType } from "./AttributeType";

export class LevelAttribute extends Attribute {
    public level: number;

    public constructor(min: number, max: number) {
        super(AttributeType.Level);
        this.level = MathUtils.randomInRange(min, max);
    }
}
