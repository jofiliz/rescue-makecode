namespace SpriteKind {
    export const decoration = SpriteKind.create()
    export const goal = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (avatar.bottom > sprite.bottom) {
        sprite.vy = -100
        sprite.vx = 20 + avatar.vx / 10
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (avatar.bottom >= scene.screenHeight()) {
        avatar.vy = -50
        avatar.ay = acel
    }
    console.log(avatar.bottom)
})
info.onScore(3, function () {
    pause(1000)
    sprites.destroy(goal)
    sprites.destroy(start)
    game.setGameOverMessage(true, "YOU WIN!")
    game.setGameOverEffect(true, effects.smiles)
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.goal, function (sprite, otherSprite) {
    otherSprite.startEffect(effects.confetti, 1000)
    sprites.destroy(sprite)
    animation.runMovementAnimation(
    goal,
    animation.animationPresets(animation.bobbing),
    500,
    false
    )
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
})
sprites.onCreated(SpriteKind.Projectile, function (sprite) {
    proyectiles.push(sprite)
    music.play(music.createSoundEffect(WaveShape.Sine, 5000, 1, 213, 44, 878, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
})
let projectil: Sprite = null
let proyectiles: Sprite[] = []
let acel = 0
let goal: Sprite = null
let start: Sprite = null
let avatar: Sprite = null
scene.setBackgroundImage(assets.image`background`)
info.setScore(0)
let arrow = sprites.create(assets.image`arrow`, SpriteKind.decoration)
arrow.setPosition(35, 71)
let shadow = sprites.create(assets.image`shadow`, SpriteKind.Player)
controller.moveSprite(shadow, 100, 0)
shadow.y = 106
avatar = sprites.create(assets.image`avatar`, SpriteKind.Player)
animation.runImageAnimation(
avatar,
assets.animation`myAnim`,
200,
true
)
avatar.y = 100
controller.moveSprite(avatar, 100, 0)
start = sprites.create(assets.image`start`, SpriteKind.decoration)
start.setPosition(11, 20)
goal = sprites.create(img`
    . . . . . . . 2 . . . . . . . 
    . . . . . . 2 2 2 . . . . . . 
    . . . . . 2 2 5 2 2 . . . . . 
    . . . . 2 2 5 5 5 2 2 . . . . 
    . . . 2 2 5 5 5 5 5 2 2 . . . 
    . . 2 2 5 5 5 5 5 5 5 2 2 . . 
    . 2 2 5 5 5 5 5 5 5 5 5 2 2 . 
    2 2 5 5 5 5 5 5 5 5 5 5 5 2 2 
    2 2 5 5 5 5 5 5 5 5 5 5 5 2 2 
    . 2 2 5 5 5 5 5 5 5 5 5 2 2 . 
    . . 2 2 5 5 5 5 5 5 5 2 2 . . 
    . . . 2 2 5 5 5 5 5 2 2 . . . 
    . . . . 2 2 5 5 5 2 2 . . . . 
    . . . . . 2 2 5 2 2 . . . . . 
    . . . . . . 2 2 2 . . . . . . 
    . . . . . . . 2 . . . . . . . 
    `, SpriteKind.goal)
goal.setPosition(153, 48)
avatar.startEffect(effects.trail, 500)
acel = 98
avatar.ay = acel
music.play(music.stringPlayable("C E E F F D F C ", 129), music.PlaybackMode.InBackground)
proyectiles = []
console.log("START")
forever(function () {
    for (let proy of proyectiles) {
        if (proy.bottom >= scene.screenHeight() && proy.vy > 0) {
            proy.vy = 0
            proy.ay = 0
            proy.vx = 40
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        }
        if (proy.x > scene.screenWidth()) {
            sprites.destroy(null)
            proyectiles.removeAt(proyectiles.indexOf(proy))
        }
    }
})
forever(function () {
    if (avatar.bottom >= scene.screenHeight() && avatar.vy > 0) {
        avatar.vy = 0
        avatar.ay = 0
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
    }
})
game.onUpdateInterval(500, function () {
    if (proyectiles.length < 3) {
        animation.runMovementAnimation(
        start,
        animation.animationPresets(animation.shake),
        200,
        false
        )
        projectil = sprites.createProjectileFromSprite(assets.image`ball`, start, 20, 0)
        projectil.ay = acel
    }
})
game.onUpdateInterval(200, function () {
    if (avatar.vx == 0) {
        effects.clearParticles(avatar)
    } else {
        avatar.startEffect(effects.trail, 500)
    }
})
