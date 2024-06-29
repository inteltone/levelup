//=============== СЛАЙДЕР ==========================================
var slider_testim = document.querySelector("[data-slider-testim]");
if (slider_testim) { 
  var slider = new Splide('[data-slider-testim]', {
    type: 'loop',
    autoplay: true,
    interval: 10000,
    speed: 1000,
    perPage: 3,
    focus: 0,
    pagination: false,
    arrows: true,
    gap: 20,
    breakpoints: {
      1024: {
        perPage: 2,
      },      
      620: {
        perPage: 1,
      },
    },
  }).mount();
} 

// =============== ТАЙМЕР ==========================================
var end
if (!localStorage.getItem('levelupend')) {
	end = Date.parse(new Date(Date.parse(new Date()) + 30 *60 * 1000)) 	
	localStorage.setItem('levelupend', end)
} else {
	end = parseInt(localStorage.getItem('levelupend'))
}

function declensionNum(num, words) {
	return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
}

function getTimeRemaining() {
	var t = end - Date.parse(new Date())
	var seconds = Math.floor((t / 1000) % 60)
	var minutes = Math.floor((t / 1000 / 60) % 60)	
	return {	 
		'total': t,
		'minutes': minutes,
		'seconds': seconds
	}
 }
 
 function initializeClock(id) {
	var clock = document.getElementById(id)	
	var minutesSpan = clock.querySelector('.minutes')
	var secondsSpan = clock.querySelector('.seconds')
	var minutesWord = clock.querySelector('.word-minutes')
	var secondsWord = clock.querySelector('.word-seconds')
 
	function updateClock() {
	  var t = getTimeRemaining()
	 
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2)
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2)
		minutesWord.innerHTML = declensionNum(t.minutes, ['минута', 'минуты', 'минут']);
		secondsWord.innerHTML = declensionNum(t.seconds, ['секунда', 'секунды', 'секунд']);
 
		if (t.total <= 0) {
		  clearInterval(timeinterval)
		  document.querySelector('.cta__timer-inner').style.display = 'none'
		  document.querySelector('.cta__timer-msg').style.display = 'block'
	  }
	}
 
	updateClock()
	var timeinterval = setInterval(updateClock, 1000)
 } 
 
 initializeClock('timer')