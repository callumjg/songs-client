import moment from "moment";

interface IStoreValue<T> {
  value: T;
  expiry?: number;
  created: moment.Moment;
}

export default class Cache<T> {
  private store: { [key: string]: IStoreValue<T> } = {};

  get size() {
    this.removeExpired();
    return Object.keys(this.store).length;
  }

  set(key: string, value: any, expiry?: number) {
    this.store[key] = { value, expiry, created: moment() };
  }

  get(key: string) {
    const { value, expiry, created } = this.store[key] || {};
    if (!value) return;
    if (!expiry) return value;
    console.log(this.store[key]);
    if (moment().isAfter(created.add(expiry, "second"))) {
      console.log("EPIRED");
      delete this.store[key];
      return;
    }
    return this.store[key].value;
  }

  remove(key: string) {
    delete this.store[key];
  }

  clearAll() {
    this.store = {};
  }

  has(key: string) {
    const val = this.store[key];
    if (!val) return false;

    if (this.checkHasExpired(key)) {
      delete this.store[key];
      return false;
    }
    return true;
  }

  private removeExpired() {
    Object.keys(this.store).forEach((key) => {
      if (this.checkHasExpired(key)) delete this.store[key];
    });
  }

  private checkHasExpired(key: string) {
    const { expiry, created } = this.store[key] || {};
    return !!expiry && moment().isAfter(created.add(expiry, "second"));
  }
}
