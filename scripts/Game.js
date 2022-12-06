class Game{
    constructor(){
        this.Score = 0;
        this.Player = new Player();
        this.Actors = [];
        this.Projectiles = [];
        this.EFX = [];
        this.Background = new Background();
    }
    getInput(controller){
        if(this.Player){
            // Player.update() will return true if the player is firing
            let isFiring = this.Player.update(controller);
            if(isFiring){
                const {x, y} = this.Player;
                this.Projectiles.push(new Laser(x,y));
            }
            //DEBUG
            // document.getElementById('keylog').innerHTML = JSON.stringify(controller);
        }
    }
    updateActors(){
        // Update Each Actor
        this.Actors.forEach( actor => actor.update() );

        // Check for ACTOR x PLAYER Collisions

        // Filter Actors
        this.Actors = this.Actors.filter( actor => !actor.clear);
    }
    updateProjectiles(){
        // Update Each Projectile
        this.Projectiles.forEach( (projectile) => projectile.update());

        // Check for PROJECTILE X PLAYER Collisions

        // Filter Projectiles
        this.Projectiles = this.Projectiles.filter( proj => !proj.clear);

        // DEBUG
        // document.getElementById('proj').innerHTML = JSON.stringify(this.Projectiles);
    }
    updateScore(points){
        this.Score+=points;
    }
}