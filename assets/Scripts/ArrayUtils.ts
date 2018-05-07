export class ArrayUtils {
    public static concatIfExitsts(firstArray, secondArray) {
        let finalArray = null;
        if (firstArray) {
            finalArray = firstArray;
        }

        if (secondArray) {
            if (finalArray) {
                finalArray = finalArray.concat(secondArray);
            } else {
                finalArray = secondArray;
            }
        }
        return finalArray;
    }
}
