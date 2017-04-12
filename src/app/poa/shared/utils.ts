export class PoaUtils {

  static getNestedValue(obj: any, key: string): any {
    return key.split('.').reduce(
      (result, currentKey) => {
        // note: explicit compare to null (everything else is a valid value <-> truthy / falsy
        if (result != null && result[currentKey] != null) {
          return result[currentKey];
        } else {
          return null;
        }
      }
      , obj);
  }

  static getComparator(sortProperty: string): (a: any, b: any) => number {
    return (a: any, b: any) => {
      const left = PoaUtils.getNestedValue(a, sortProperty);
      const right = PoaUtils.getNestedValue(b, sortProperty);
      if (typeof left === 'string') {
        return left.localeCompare(right);
      } else if (typeof left === 'number' && typeof right === 'number') {
        return left - right;
      } else if (left != null && right == null) {
        return 1;
      } else if (left == null && right != null) {
        return 1;
      } else {
        return 0;
      }
    };
  }

  static withAscending(ascending: boolean, compareFunction: (a: any, b: any) => number): (a: any, b: any) => number {
    // wraps the given compare function if ascending == false
    if (ascending) {
      return compareFunction;
    } else {
      return (a: any, b: any) => (-1) * compareFunction(a, b);
    }
  }
}

