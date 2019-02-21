import React from 'react';
import {TweenMax} from "gsap/TweenMax";
import {TimelineMax} from "gsap/TimelineMax";
import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';
import {Link} from 'react-router-dom';

export default class Recommended extends React.Component {

    state = {
        animVal: 1
    }

    floatAnimation = e => {
        this.setState(prev => ({animVal: prev.animVal + 1}));
        if (this.state.animVal % 5 === 0) {
            const el = document.getElementById('recommended-' + this.props.id);
            const top = el.getBoundingClientRect().top;
            const height = el.getBoundingClientRect().height;
            let speed = 5;
            if (this.props.id === 1) {
                //10
                speed = 5;
            } 
            TweenMax.to(el, .75, {top: (top - height) / speed + "px"});
        }
    }
    
    initFloat = e => {
        if (window.innerWidth > 860) {
            window.addEventListener('scroll', this.floatAnimation);
        }
    }

    initProductAnimation = e => {
        const bind = this;
        const controller = new ScrollMagic.Controller();
        const id = "#recommended__product-" + bind.props.id;
        

        const anim = new TimelineMax();
        if (bind.props.id === 1) {
            anim
                .from(id, 2.5, {right: "-400px", ease: Power2.easeOut})
                .from(id + " .recommended__logo", 3, {right: "-400px", ease: Power2.easeOut}, 0);
        } else {
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
                        <Link to={"/product/" + this.props.id}>
                            <button className="recommended__more btn btn--outline-primary">جزئیات بیشتر</button>
                        </Link>
                        <Link to="/shop">
                            <button className="recommended__shop btn btn--primary">فروشگاه</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
