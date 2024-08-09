import { level1Config } from "./content/level1/config.js"
import { level1Mappings, levelLayout } from "./content/level1/level1Layout.js"
import { level2Config } from "./content/level2/config.js"
import { level2Layout, level2Mappings } from "./content/level2/level2Layout.js"
import { level3Config } from "./content/level3/config.js"
import { level3Layout, level3Mappings } from "./content/level3/level3Layout.js"
import { Axes } from "./entities/Axes.js"
import { Birds } from "./entities/Birds.js"
import { Player } from "./entities/Player.js"
import { Projectiles } from "./entities/Projectiles.js"
import { Saws } from "./entities/Saws.js"
import { Spiders } from "./entities/Spiders.js"
import kaboom from "./libs/kaboom.mjs"
import { attachCamera } from "./utils/Camera.js"
import { Level } from "./utils/level.js"
import { load } from "./utils/loader.js"
import { uiManager } from "./utils/UIManager.js"

kaboom({
    width: 1280,
    height: 720,
    letterbox: true
})

load.fonts()
load.sounds()
load.assets()


const scenes = {
    menu: () => {
        uiManager.displayMainMenu();
    },
    controls: () => {
        uiManager.displayControlsMenu()
    },
    1: () => {
        const waterAmbience = play("water-ambience", {
            volume: 0.02,
            loop: true
        })
        onSceneLeave(() => {
            waterAmbience.paused = true
        })

        setGravity(1400)

        const level1 = new Level()
        level1.drawBackground("forest-background")
        level1.drawMapLayout(levelLayout, level1Mappings)
        const player = new Player(
            level1Config.playerStartPosX, 
            level1Config.playerStartPosY,
            level1Config.playerSpeed,
            level1Config.jumpForce,
            level1Config.nbLives,
            1,
            false
        )
        player.enablePassthrough() 
        player.enableMobVunerability()
        player.enableCoinPickup()
        player.update()

        const spiders = new Spiders(
            level1Config.spiderPositions.map((spiderPos) => spiderPos()),
            level1Config.spiderRanges,
            level1Config.spiderSpeeds,
            level1Config.spiderType
        )
        spiders.setMovementPattern()
        spiders.enablePassthrough()

        const fish = new Projectiles(
            level1Config.fishPositions.map(fishPos => fishPos()),
            level1Config.fishRanges,
            "fish"
        )
        fish.setMovementPattern()

        uiManager.addDarkBg()
        attachCamera(player.gameObj, 0, 200)
        level1.drawWaves("water", "wave")
        uiManager.displayCoinCount()
        player.updateCoinCount(uiManager.coinCountUI)
        uiManager.displayLivesCount()
        player.updateLives(uiManager.livesCountUI)
    },
    2: () => {
        const lavaAmbience = play("lava-ambience", { loop: true })
        onSceneLeave(() => {
            lavaAmbience.paused = true
        })
        setGravity(1400)

        const level2 = new Level()
        level2.drawBackground("castle-background")
        level2.drawMapLayout(level2Layout, level2Mappings)
        const player = new Player(
            level2Config.playerStartPosX, 
            level2Config.playerStartPosY,
            level2Config.playerSpeed,
            level2Config.jumpForce,
            level2Config.nbLives,
            2,
            false
        )
        player.enablePassthrough() 
        player.enableMobVunerability()
        player.enableCoinPickup()
        player.update()
        const spiders = new Spiders(
            level2Config.spiderPositions.map((spiderPos) => spiderPos()),
            level2Config.spiderRanges,
            level2Config.spiderDurations,
            level2Config.spiderType
        )
        
        spiders.setMovementPattern()
        spiders.enablePassthrough()
        const flames = new Projectiles(
            level2Config.flamePositions.map(flamePos => flamePos()),
            level2Config.flameRanges,
            "flame"
        )
        flames.setMovementPattern()
        const axes = new Axes(
            level2Config.axesPositions.map((axePos) => axePos()),
            level2Config.axesSwingDurations
          )
          axes.setMovementPattern()
          const saws = new Saws(
            level2Config.sawPositions.map((sawPos) => sawPos()),
            level2Config.sawRanges
          )
          saws.setMovementPattern()
            

          
        uiManager.addDarkBg()
        attachCamera(player.gameObj, 0, 200)
        level2.drawWaves("lava", "wave")
        uiManager.displayCoinCount()
        player.updateCoinCount(uiManager.coinCountUI)
        uiManager.displayLivesCount()
        player.updateLives(uiManager.livesCountUI)
    },
    3: () => {
        const windAmbience = play("strong-wind", { volume: 0.2, loop: true })
        onSceneLeave(() => {
            windAmbience.paused = true
        })
        setGravity(1400)

        const level3 = new Level()
        level3.drawBackground("sky-background-0")
        level3.drawBackground("sky-background-1")
        level3.drawBackground("sky-background-2")
        level3.drawMapLayout(level3Layout, level3Mappings)
        const player = new Player(
            level3Config.playerStartPosX, 
            level3Config.playerStartPosY,
            level3Config.playerSpeed,
            level3Config.jumpForce,
            level3Config.nbLives,
            3,
            true
        )
        const birds = new Birds(
            level3Config.birdPositions.map((birdPos) => birdPos()),
            level3Config.birdRanges
        )
        birds.setMovementPattern()
        player.enablePassthrough() 
        player.enableMobVunerability()
        player.enableCoinPickup()
        player.update()
 

        uiManager.addDarkBg()
        attachCamera(player.gameObj, 0, 200)
        level3.drawWaves("clouds", "wave")
        uiManager.displayCoinCount()
        player.updateCoinCount(uiManager.coinCountUI)
        uiManager.displayLivesCount()
        player.updateLives(uiManager.livesCountUI)
    },
    gameover: () => {
        uiManager.displayGameOverScreen()
    },
    end: () => {
        uiManager.displayEndGameScreen()
    },
}

for (const key in scenes) {
    scene(key, scenes[key])
}

go("3") 