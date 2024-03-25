export class TSGuard {
  /**
   * Handle type of a value.
   * 
   * @example
   * In APP:
   * ```
   *  import { TSGuard } from './utils/tsGuard';
   *  ...
   *  TSGuard.isNumber(...);
   *  TSGuard.isString(...);
   *  TSGuard.isObject(...);
   *  TSGuard.isStructure(...);
   *  TSGuard.checkType(...);
   *  TSGuard.isEmpty(...);
   *  ...
   * ```
   */

  public static isNull(value: any): value is null {
    return value === null;
  }

  public static isUndefined(value: any): value is undefined {
    return value === undefined;
  }

  public static isNil(value: any): value is null | undefined {
    return value === null || value === undefined;
  }

  public static isNumber(value: number | any): value is number {
    return (typeof value === 'number');
  }

  public static isString(value: string | any): value is string {
    return (typeof value === 'string');
  }

  public static isObject(value: object | any): value is object {
    return (typeof value === 'object');
  }

  public static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  public static isFunction(value: any): boolean {
    return typeof value === 'function';
  }

  public static isStructure<T>(value: any | { [key: string]: any }, matcher: T): value is T {
    for (let key in matcher) {
      if (typeof value[key] !== typeof matcher[key]) {
        return false;
      }
    }
    return true;
  }

  // return type: "Null", "Undefined", "Object", "Array", "Number", "Boolean", "String", "Function", "RegExp"
  public static checkType(value: any): string {
    return (
      value === null
        ? 'Null'
        : value === undefined
          ? 'Undefined'
          : Object.prototype.toString.call(value).slice(8, -1)
    );
  }

  public static isEmpty(value: any): boolean {
    // (value == null) check null or undefined.
    return (
      // Null
      (value === null) ||
      // Undefined
      (value === undefined) ||
      // Check if a Set() or Map() is empty.
      (value.size === 0) ||
      // NaN - The only JavaScript value that is unequal to itself.
      (value !== value) ||
      // Length is zero && it's not a function.
      (value.length === 0 && typeof value !== 'function') ||
      // Is an Object && has no keys.
      (value.constructor === Object && Object.keys(value).length === 0)
    );
  }
}