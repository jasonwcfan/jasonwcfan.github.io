import { TweenMax } from 'gsap';
import 'animation.gsap';
import 'debug.addIndicators';

var Tweens = {
    // Move an element to upper left
    moveToUpperLeftTween: (selector, duration) => new TweenMax.to(selector, duration, {
        top: 0,
        left: 0
    }),
    // Make an element fade out
    fadeOutTween: (selector, duration) => new TweenMax.to(selector, duration, {
        opacity: 0
    }),
    // Make an element fade in
    fadeInTween: (selector, duration) => new TweenMax.to(selector, duration, {
        opacity: 1
    }),
    // Move an element to center, slightly above middle
    moveToCenterTween: (selector, duration) => new TweenMax.to(selector, duration, {
        left: '50%',
        top: '30%',
        xPercent: '-50',
        yPercent: '-50'
    }),
};

export default Tweens;
