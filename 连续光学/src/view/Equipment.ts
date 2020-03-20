namespace hanyeah {
  import Container = PIXI.Container;
  export class Equipment extends Container {
    public main: Scene;
    constructor(main: Scene) {
      super();
      this.main = main;
    }

    removed(): void {

    }

    update(dt: number): void {
      
    }
  }
}