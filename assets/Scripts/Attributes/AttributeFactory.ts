import { AttributeType } from "./AttributeType";
import { Attribute } from "./Attribute";
import { DamageAttribute } from "./DamageAttribute";
import { LevelAttribute } from "./LevelAttribute";
import { MagicFindAttribute } from "./MagicFindAttribute";
import { GoldFindAttribute } from "./GoldFindAttribute";

export class AttributeFactory {
        public static create(attributeType: AttributeType): Attribute {
            switch(attributeType) {
                case AttributeType.Damage: {
                    return new DamageAttribute(0, 100);
                    break;
                }
                case AttributeType.Level: {
                    return new LevelAttribute(0, 50);
                    break;
                }
                case AttributeType.MagicFind: {
                    return new MagicFindAttribute(0, 100);
                    break;
                }
                case AttributeType.GoldFind: {
                    return new GoldFindAttribute(0, 100);
                    break;
                }
                default: {
                    console.warn("Attribute", attributeType, "Does not exist");
                    break;
                }
            }
        }
}