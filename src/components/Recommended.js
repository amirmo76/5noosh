import React from 'react';
import {TweenMax} from "gsap/TweenMax";
import {TimelineMax} from "gsap/TimelineMax";
import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';

export default class Recommended extends React.Component {

    floatAnimation = e => {
        const el = document.getElementById('recommended-' + this.props.id);
        const top = el.getBoundingClientRect().top;
        const height = el.getBoundingClientRect().height;
        let speed = 5;
        if (this.props.id === 1) {
            speed = 10;
        } 
        TweenMax.to(el, 1, {top: (top - height) / speed + "px", ease: Power2.easeOut});
    }
    
    initFloat = e => {
        window.addEventListener('scroll', this.floatAnimation);
    }

    initProductAnimation = e => {
        const bind = this;
        const controller = new ScrollMagic.Controller();
        const id = "#recommended__product-" + bind.props.id;
        

        const anim = new TimelineMax();
        if (bind.props.id === 1) {
            // anim
                // .from(id, 2.5, {right: "-400px", ease: Power2.easeOut})
                // .from(id + " .recommended__logo", 3, {right: "-400px", ease: Power2.easeOut}, 0)
                // .from(id + " .recommended__desc", 1.5, {right: "-400px", ease: Power2.easeOut}, 0)
                // .from(id + " .recommended__buttons", 2.5, {opacity: 0, y: 25, ease: Power2.easeOut}, 1.25);

            anim
                .from(id, 2.5, {right: "-400px", ease: Power2.easeOut})
                .from(id + " .recommended__logo", 3, {right: "-400px", ease: Power2.easeOut}, 0);
        } else {
            // anim
                // .from(id, 2.5, {left: "-400px", ease: Power2.easeOut})
                // .from(id + " .recommended__logo", 3, {left: "-400px", ease: Power2.easeOut}, 0)
                // .from(id + " .recommended__desc", 1.5, {left: "-400px", ease: Power2.easeOut}, 0)
                // .from(id + " .recommended__buttons", 2.5, {opacity: 0, y: 25, ease: Power2.easeOut}, 1.25);

            anim
                .from(id, 2.5, {left: "-400px", ease: Power2.easeOut})
                .from(id + " .recommended__logo", 3, {left: "-400px", ease: Power2.easeOut}, 0);
        }

        const scene = new ScrollMagic.Scene({
            triggerElement: id,
            reverse: false
        })
        .setTween(anim)
        .addTo(controller);

        if (id === 'recommended__product-1') {
            scene.triggerHook(0.4);
        } else {
            scene.triggerHook(0.85);            
        }

    }

    componentDidMount() {
        this.initFloat();
        this.initProductAnimation();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.floatAnimation);
    }

    render () {

        let style = {
            backgroundImage: `url(${this.props.hero})`
        }


        return (
            <div className={"recommended" + (this.props.direction ? " recommended--rtl" : "")}>
                <span id={"recommended-" + this.props.id} className={"recommended__hero" + (this.props.direction === 'rtl' ? " recommended__hero--right" : " recommended__hero--left") + (this.props.landscape ? " recommended__hero--landscape" : "")} style={style}></span>
                <span className={"recommended__hero-bg" + (this.props.direction === 'rtl' ? " recommended__hero-bg--right" : " recommended__hero-bg--left") + (this.props.landscape ? " recommended__hero-bg--landscape" : "")}></span>
                <div className={"recommended__product" + (this.props.direction === 'rtl' ? " recommended__product--left" : " recommended__product--right")} id={"recommended__product-" + this.props.id}>
                    <img className="recommended__logo" src={this.props.logo}/>
                    <span className={"recommended__product-bg" + (this.props.direction === 'rtl' ? " recommended__product-bg--left" : " recommended__product-bg--right")}></span>
                    <h2 className="recommended__desc">{this.props.shortDesc}</h2>
                    <div className="recommended__buttons">
                        <button className="recommended__more btn btn--outline-primary">جزئیات بیشتر</button>
                        <button className="recommended__shop btn btn--primary">فروشگاه</button>
                    </div>
                </div>
            </div>
        );
    }
}
