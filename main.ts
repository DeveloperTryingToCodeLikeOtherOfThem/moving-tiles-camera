 class MovingTilesEngine {
     tile: Image 

     protected movingTile: MovingTilesEngine

     x: number = screen.width >> 1
     y: number = screen.height >> 1
     vx: number
     vy: number

     constructor(tile: Image) {
         this.tile = tile
         
         this.vx = 0
         this.vy = 0

         this.movingTile = this

         this.drawTile(tile)
     }   

     public moveTile(on: boolean, col: number, row: number, vx: number, vy: number) {
         this.connectTheTilemapToThisTile(on, col, row)   
         this.creatingMovingTile()
         this.setVelocity(vx, vy)
     }

     protected setVelocity(vx: number, vy: number) {
         this.vx = vx 
         this.vy = vy
     }

     protected connectTheTilemapToThisTile(registered: boolean, col: number, row: number) {
       const tm = game.currentScene().tileMap

       if(tm && tm.enabled)
        for(let y = 0; y <= tm.areaHeight();) {
            for(let x = 0; y <= tm.areaWidth();) {
                const index = tm.getImageType(this.tile)
                const getTileStored = tm.getTileImage(index)
                tm.setTileAt(col, row, index)
                 tm.setWallAt(x, y, registered)
            }
        }
     }

    /**
     * Not neccessary but just add an extra function to the extension for connecting tilemaps in this editor instead
     */
    //% deprecated=1
      __attachTilemap(tilemap1: tiles.WorldMap, tilemap2: tiles.WorldMap, connection: number) {
         tiles.connectMapById(tilemap1, tilemap2, connection)
      }

     protected creatingMovingTile() {
         let lastTime = control.millis() / 1000

         control.eventContext().registerFrameHandler(10, () => {
             const now = control.millis() / 1000
             const dt = now - lastTime
             lastTime = now

             this.x += this.movingTile.vx * dt
             this.y += this.movingTile.vy * dt
         })
     }

     protected drawTile(tile: Image) {
         control.enablePerfCounter("drawTile")

         tile = image.create(screen.width, screen.height)
         scene.createRenderable(scene.TILE_MAP_Z, (image: Image) => image.drawImage(tile, this.x, this.y))
     }
 }

tiles.setTilemap(tilemap`level1`)

new MovingTilesEngine(assets.tile`myTile`)
let playerSprite = sprites.create(img`
    . . . . . . . . . . b 5 b . . .
    . . . . . . . . . b 5 b . . . .
    . . . . . . b b b b b b . . . .
    . . . . . b b 5 5 5 5 5 b . . .
    . . . . b b 5 d 1 f 5 d 4 c . .
    . . . . b 5 5 1 f f d d 4 4 4 b
    . . . . b 5 5 d f b 4 4 4 4 b .
    . . . b d 5 5 5 5 4 4 4 4 b . .
    . b b d d d 5 5 5 5 5 5 5 b . .
    b d d d b b b 5 5 5 5 5 5 5 b .
    c d d b 5 5 d c 5 5 5 5 5 5 b .
    c b b d 5 d c d 5 5 5 5 5 5 b .
    c b 5 5 b c d d 5 5 5 5 5 5 b .
    b b c c c d d d 5 5 5 5 5 d b .
    . . . . c c d d d 5 5 5 b b . .
    . . . . . . c c c c c b b . . .
`)
scene.cameraFollowSprite(playerSprite)
controller.moveSprite(playerSprite)