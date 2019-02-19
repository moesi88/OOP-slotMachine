var programmerMachine = (function () {
  var maxTime = 2000
  // time measured in milliseconds

  var height = 310
  // height of reels

  var speeds = []
  // reel arry speed

  var r = []
  // reel arry values

  var reelArry = [
    ['Javascript', 'Python', 'Go'],
    ['Brendan Eich', 'Guido van Rossum', 'Ken Thompson'],
    ['1995', '1991', '2018']
  ]

  var slotReels

  var txt

  var begin

  function init () {
    slotReels = document.querySelectorAll('.slots__reel')
    for (i = 0; i < slotReels.length; i++) {
      slotReels[i].innerHTML =
        '<ul class="items"><li>' +
        reelArry[i].join('</li><li>') +
        '</li></ul><ul class="items"><li>' +
        reelArry[i].join('</li><li>') +
        '</li></ul>'
      console.log(slotReels.innerHTML)
    }

    txt = document.querySelector('.txt')

    document.querySelector('#spin-cta').addEventListener('click', daMagic)
  }

  function daMagic () {
    if (begin !== undefined) {
      return
    }

    for (var i = 0; i < 3; ++i) {
      speeds[i] = Math.random() + 0.5
      r[i] = (((Math.random() * 3) | 0) * height) / 3
    }

    txt.innerHTML = 'Spinning...'
    animate()
  }

  function animate (now) {
    if (!begin) {
      begin = now
    }

    var t = now - begin || 0

    for (var i = 0; i < 3; ++i) {
      slotReels[i].scrollTop =
        ((speeds[i] / maxTime / 2) * (maxTime - t) * (maxTime - t) + r[i]) %
          height |
        0
      // console.log(slotReels[i]);
    }

    if (t < maxTime) {
      requestAnimationFrame(animate) // animate callback
      // console.log('animate?');
    } else {
      begin = undefined
      checkWinner()
      // console.log('check');
    }
  }

  function checkWinner () {
    if (r[0] === r[1] && r[1] === r[2]) {
      txt.innerHTML =
        '<span class="winner">You\'ve won! Enjoy your ' +
        // reelArry[1][(r[0] / 70 + 1) % 3 | 0].split(' ')[0]
        'chatbot' +
        '!</span>'
    } else {
      txt.innerHTML = '<span class="loser">Try again...</span>'
    }
  }

  return {
    init: init
  }
})()

programmerMachine.init()

// Animation polyfill
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
;(function () {
  var lastTime = 0
  var vendors = ['webkit', 'moz']
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime()
      var timeToCall = Math.max(0, 16 - (currTime - lastTime))
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
})()
