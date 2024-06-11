import type { Alpine } from "alpinejs";

interface Timer {
  expiry: number;
  remaining: number;
  init(): void;
  setRemaining(): void;
  days(): { value: number; remaining: number };
  hours(): { value: number; remaining: number };
  minutes(): { value: number; remaining: number };
  seconds(): { value: number };
  format(value: any): number;
  time(): { days: number; hours: number; minutes: number; seconds: number };
}

export default (Alpine: Alpine) => {
  Alpine.data<Timer, []>("timer", () => ({
    expiry: new Date("12/14/2024 12:00 AM").getTime(),
    remaining: 0,
    init() {
      this.setRemaining();
      setInterval(() => {
        this.setRemaining();
      }, 1000);
    },
    setRemaining() {
      const diff = this.expiry - new Date().getTime();
      this.remaining = parseInt(`${diff / 1000}`);
    },
    days() {
      return {
        value: this.remaining / 86400,
        remaining: this.remaining % 86400,
      };
    },
    hours() {
      return {
        value: this.days().remaining / 3600,
        remaining: this.days().remaining % 3600,
      };
    },
    minutes() {
      return {
        value: this.hours().remaining / 60,
        remaining: this.hours().remaining % 60,
      };
    },
    seconds() {
      return {
        value: this.minutes().remaining,
      };
    },
    format(value) {
      return parseInt(value);
    },
    time() {
      return {
        days: this.format(this.days().value),
        hours: this.format(this.hours().value),
        minutes: this.format(this.minutes().value),
        seconds: this.format(this.seconds().value),
      };
    },
  }));
};
