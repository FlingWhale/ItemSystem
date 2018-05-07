export class MathUtils {
    public static randomInRange(min, max) {
        return min + Math.floor(Math.random() * (max - min));
    }
}
