import $ from 'jquery';
import ScrollMagic from 'scrollmagic';
import { TweenMax, TimelineMax } from 'gsap';
import 'animation.gsap';
import 'debug.addIndicators';
import Tweens from './tweens';
import Timelines from './timelines';

/**
 * Factory for creating scenes as they are needed
 * @type {Object}
 */
var scenes = {
    // Pin the header to the screen
    pinHeaderScene: (controller) => {
        new ScrollMagic.Scene({})
        .setPin('#header')
        .addIndicators()
        .addTo(controller)
    },
    // Handle actions that happen when the user scrolls past the first page
    scrollPastSplashScene: (controller) => {
        new ScrollMagic.Scene({
            triggerElement: '#who',
            offset: '-100'
        })
        .setTween(Timelines.scrollPastSplashTimeline())
        .addIndicators()
        .addTo(controller)
    },
    // Handle moving the header back to the centre on the last page
    headerMoveToCenterScene: (controller) => {
        new ScrollMagic.Scene({
            triggerElement: '#where'
        })
        .setTween(Tweens.moveToCenterTween('#header', 1.5))
        .addIndicators()
        .addTo(controller)
    },
    // Have text fade in as the user scrolls
    textFadeInScene: (controller) => {
        $('.page-text').each(function () {
            var id = $(this).attr('id');
            var textFadeInScene = new ScrollMagic.Scene({
                triggerElement: `#${id}`,
                // Exception for the final page, so the text stays fixed
                // until the bottom of the page
                triggerHook: id === 'page-text4' ? 0 : 0.1,
                duration: id === 'page-text4' ? '300%' :'300%'
            })
            .setPin(`#${id}`)
            .setTween(Timelines.textFadeInTimeline($(this).children()))
            .addIndicators()
            .addTo(controller);
        })
    },
    // Scene for animating the scroll icon
    animateScrollIconTimeline: (controller) => {
        new ScrollMagic.Scene({})
        .setTween(Timelines.animateScrollIconTimeline())
        .addTo(controller);
    },
    // Scene for pinning the photos to the second page
    pinPhotosScene: (controller) => {
        new ScrollMagic.Scene({
            triggerElement: '#who',
            triggerHook: 0,
            duration: '300%'
        })
        .setPin('#photoreel')
        .addTo(controller)
    }
}

export default {
    // Interface to allow calling function to run all the animations
    // TODO: Implement options that allow for only some of the scenes to be run
    Run: (controller) => {
        Object.keys(scenes).forEach((key) => {
            scenes[key](controller);
        })
    }
};
