import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

class Storage {
  static getString(key: string) {
    try {
      const value: string | undefined = storage.getString(key);
      console.log("Get Value", key, "Successes!", value);

      return value;
    } catch (error) {
      throw error;
    }
  }

  static getNumber(key: string) {
    try {
      const value = storage.getNumber(key);
      console.log("Get Value", key, "Successes!", value);

      return value;
    } catch (error) {
      throw error;
    }
  }

  static getBoolean(key: string) {
    try {
      const value = storage.getBoolean(key);
      console.log("Get Value", key, "Successes!", value);

      return value;
    } catch (error) {
      throw error;
    }
  }

  static getAllKeys() {
    try {
      const value: Array<string> = storage.getAllKeys();
      console.log("Get All Keys Successes!", value);

      return value;
    } catch (error) {
      throw error;
    }
  }

  static set(key: string, value: boolean | string | number) {
    try {
      console.log("Set Successes!", value);

      return storage.set(key, value);
    } catch (error) {
      throw error;
    }
  }

  static getObject(key: string) {
    try {
      const value: string | undefined = storage.getString(key);
      if (value) {
        const parseToObject = JSON.parse(value);

        return parseToObject;
      }
      return value;
    } catch (error) {
      throw error;
    }
  }

  static setObject(key: string, value?: { [key: string]: string } | Array<any>) {
    try {
      const convertToString = JSON.stringify(value);

      return storage.set(key, convertToString);
    } catch (error) {
      throw error;
    }
  }

  static setBoolean(key: string, value: boolean) {
    try {

      return storage.set(key, value);
    } catch (error) {
      throw error;
    }
  }
  
  static delete(key: string) {
    try {
      console.log("Delete Successes!", key);

      return storage.delete(key);
    } catch (error) {
      throw error;
    }
  }

  static async clearAll() {
    try {
      storage.clearAll();
      console.log("ClearAll Successes!");
    } catch (e) {
      console.log("clearAllError:", e);
    }
  }
}

export default Storage;
