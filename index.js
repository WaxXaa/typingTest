var keys = document.querySelectorAll('.row div')
let score = 0
var $scr = document.querySelector('#scr')
var $scrBox = document.querySelector('#scoreBox')
$scr.textContent = score
const plus = new Audio('./asset/mixkit-arcade-game-jump-coin-216.wav')
const minus = new Audio('./asset/mixkit-game-show-wrong-answer-buzz-950.wav')
plus.volume = 0.2
minus.volume = 0.07
let typingInpt = 0
const textLevels = {
    level_1 :
        [
            'A NASA spacecraft that will deliberately crash into an asteroid is getting closer to its target. The DART mission, or the Double Asteroid Redirection Test, will have a rendezvous with the space rock on september.',
            'The spacecraft will slam into an asteroids moon to see how it affects the motion of an asteroid in space. A live stream of images captured by the spacecraft will be available on NASAs website beginning that day. The impact is expected to occur around the morning.',
            'The mission is heading for Dimorphos, a small moon orbiting the near-Earth asteroid Didymos. The asteroid system poses no threat to Earth, NASA officials have said, making it a perfect target to test out a kinetic impact which may be needed if an asteroid is ever on track to hit Earth.'
        ],
        level_2 :
        [
            'When iPhone 14 users are not using their new Apple device, the screen is hardly asleep. It will remain lit with prominently displayed widgets such as alarms, calendar appointments and sports scores flittering with real-time updates, and be at the ready if you glance down or inevitably pick it back up.',
            'The new flagship lineup, which goes on sale in stores on Friday, features the biggest ever change to the lock screen, precious real estate that had mostly been a wasteland of alerts up until this point. It is not a new concept.',
            'Android has supported an always on display for a while but this is a first for Apple. Not only is it a way to keep users more tethered to their devices in a more passive way, the notion of finding something new to do with old space comes as purse strapped consumers must find a reason to trade in or buy devices without major hardware upgrades.'
        ]
    }
let textDash = document.querySelector('.text')
textDash.innerHTML = textLevels.level_1[0]
let length = textDash.innerHTML.length

// this function return the key value if the key preesed is one of the ui keys
const preessLetter = (key, e) => {
    let istrue = false
    key.forEach((node) => {
        if ( node.textContent.toLowerCase() === e.key.toLowerCase() || node.textContent === e.code) {
            istrue = true
        }
    })
    console.log(istrue + ' the key ' + e.key + ' is in ui?')
    if( istrue) {
        return true
    } else {
        return false
    }
}
// this function check if the key is equal to the text char
function keyVlidation(char, key) {
    console.log('the text char is = ' + char)
    console.log('the pressed key is = ' + key)
    if ( char == key) {
        console.log('correct')
        return true
    } else { return false}
}

// this is the main function whit the eventListener
const isload= () => {
    let count = 0
    let inner = textDash.textContent
    blinking(inner, count)
    document.addEventListener('keyup', e => {
        let uiKey = preessLetter(keys, e)
        if ( count < textDash.textContent.length) {
            if( uiKey) {
                let correctL = keyVlidation(inner[count], e.key)
                console.log(correctL + ' the pressed key')
                if ( correctL) {
                    scorePlus()
                    blinking(inner, count+1)
                } else {
                    scoreMinus()
                    blinking(inner, count+1)
                }
            count++
            }
        }
        console.log('count is = ' + count)
    })
}
isload()

//this function paint the key background every time a key is pressed
document.addEventListener('keyup', e => {
    keys.forEach ( node => {
        if ( node.textContent.toLowerCase() === e.key || node.textContent === e.key || node.textContent === e.code) { //the whitout lwcase fnc becouse of the shift key
            node.classList.add('anm')
            setTimeout(() => node.classList.remove('anm'), 100)
        }
    })
})
/*
----------------->>>>>> this part is in construction ***
// typingInpt addition
function addType() {
    typingInpt++
}
// Words per minute function
function wpm(tp, count, len) {
    if ( count <= len) {
        return
    }

setTimeout(sdd)
}
*/

// game score addition animation function
function scorePlus() {
    score++
    plus.play()
    $scr.textContent = score
    $scrBox.classList.add('scorePlus_anim')
    setTimeout(() =>  {
        plus.currentTime = 1
        $scrBox.classList.remove('scorePlus_anim')}, 100)
}
// game score substractin animation function
function scoreMinus() {
    score--
    minus.play()
    $scr.textContent = score
    $scrBox.classList.add('scoreMinus_anim')
    setTimeout(() => minus.currentTime = 2, 80)
    setTimeout(() => {
        $scrBox.classList.remove('scoreMinus_anim')}, 100)
}
// add blink letter animation
function blinking (inner, indx) {
    let content = inner
    let strArr = []
    for ( let i = 0; i < content.length; i++) {
        strArr.push(content[i])
    }
    let char = content[indx]
    strArr[indx] = `<span class="blink">${char}</span>`
    let contStr = strArr.join('')
    textDash.innerHTML = contStr
}

