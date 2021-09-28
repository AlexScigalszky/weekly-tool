export class Partner {
  id: string = '';
  name: string = '';
  whenWasHired: number = 0;

  constructor(name: string, whenWasHired: Date) {
    this.name = name;
    this.whenWasHired = whenWasHired.getTime();
  }
}
