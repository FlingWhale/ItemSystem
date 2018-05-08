import { AttributeType } from "./AttributeType";

export class Attribute {
    public type: AttributeType;

    public constructor(type: AttributeType) {
        this.type = type;
    }

    public toString() {
        const str = "Attribute: " + this.type;
        return str;
    }
}
