namespace hanyeah {
  import Application = PIXI.Application;
  import Container = PIXI.Container;
  import Graphics = PIXI.Graphics;
  export class Main{
    public app: Application;
    public stage: Container;
    public scene: Scene;
    constructor(){
      console.log("main");
      window.addEventListener("load", this.onLoaded);
    }

    onLoaded = () => {
      window.removeEventListener("load", this.onLoaded)
      this.app = new Application({antialias: true});
      document.body.appendChild(this.app.view);
      this.stage = this.app.stage;

      this.scene = new Scene();
      this.stage.addChild(this.scene);
      this.app.ticker.add((dt: number) => {
        this.scene.update(dt);
      });

    }
  }
  
}

new hanyeah.Main();