var stripCurrentMargin = 0
var bank = 0
var self = this
setInterval(function () {
  // var now = new Date();
  if (stripCurrentMargin >= 0) {
    self.refreshStrip()
    stripCurrentMargin = -150
  } else {
    stripCurrentMargin = stripCurrentMargin + 10
  }
  $('.spin .strip').css('margin-top', stripCurrentMargin)
  $('#debug #marginTopValue').text(stripCurrentMargin)
}, 10)

function refreshStrip () {
  var $rStrip = $('#wheels .enclosure.open.full .strip')
  var rAtiveStrip = $('#wheels .enclosure.active .strip')
  var _currentIndex = 0
  for (var _i = 0; _i < 6; _i++) {
    _currentIndex = _i + bank * 6
    var $_stripSymbol = $rStrip
      .children()
      .eq(_currentIndex)
      .html()
    rAtiveStrip.find('.symbol_' + (_i + 1)).html($_stripSymbol)
    console.log('#symbol_' + (_i + 1))
  }
  bank = bank == 0 ? 1 : 0
}

// Animation polyfill
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// ;(function () {
//   var lastTime = 0
//   var vendors = ['webkit', 'moz']
//   for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//     window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
//     window.cancelAnimationFrame =
//       window[vendors[x] + 'CancelAnimationFrame'] ||
//       window[vendors[x] + 'CancelRequestAnimationFrame']
//   }

//   if (!window.requestAnimationFrame) {
//     window.requestAnimationFrame = function (callback, element) {
//       var currTime = new Date().getTime()
//       var timeToCall = Math.max(0, 16 - (currTime - lastTime))
//       var id = window.setTimeout(function () {
//         callback(currTime + timeToCall)
//       }, timeToCall)
//       lastTime = currTime + timeToCall
//       return id
//     }
//   }

//   if (!window.cancelAnimationFrame) {
//     window.cancelAnimationFrame = function (id) {
//       clearTimeout(id)
//     }
//   }
// })()
