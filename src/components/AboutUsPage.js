import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import {TimelineMax} from "gsap/TimelineMax";
import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';
import { Power2 } from 'gsap/TweenLite';
import { Helmet } from 'react-helmet';

export default class AboutUsPage extends React.Component {

    state = {
        shiftedNav: true,
        about: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
        trophies: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد'
    }

    animateText = e => {
        const controller = new ScrollMagic.Controller();
        const selector = ".aboutus__about";
        const selector2 = ".aboutus__trophies";

        const aboutAnim = new TimelineMax();
        aboutAnim.from(selector, 2, {y: 100, opacity: 0, ease: Power2.easeOut});

        const trophiesAnim = new TimelineMax();
        trophiesAnim.from(selector2, 2, {y: 100, opacity: 0, ease: Power2.easeOut});

        new ScrollMagic.Scene({
            reverse: false,
            triggerElement: selector,
            offset: -100
        }).addTo(controller).setTween(aboutAnim);

        new ScrollMagic.Scene({
            reverse: false,
            triggerElement: selector2,
            offset: -200
        }).addTo(controller).setTween(trophiesAnim);
    }

    animateImages = e => {
        const el = document.querySelector('.aboutus__about-img');
        const top = el.getBoundingClientRect().top;
        const height = el.getBoundingClientRect().height;
        const speed = 5;
        TweenMax.to(el, 1, {y: -(top - height) / speed + "px", ease: Power2.easeOut});

        const el2 = document.querySelector('.aboutus__trophies-img');
        const top2 = el2.getBoundingClientRect().top;
        const height2 = el2.getBoundingClientRect().height;
        const speed2 = 5;
        TweenMax.to(el2, 1, {y: (top2 - height2) / speed2 + "px", ease: Power2.easeOut});

        //the bgs

        const el3 = document.querySelector('.aboutus__about-bg--left');
        const top3 = el3.getBoundingClientRect().top;
        const height3 = el3.getBoundingClientRect().height;
        const speed3 = 8;
        TweenMax.to(el3, 1, {y: -(top3 - height3) / speed3 + "px", ease: Power2.easeOut});

        const el4 = document.querySelector('.aboutus__about-bg--right');
        const top4 = el4.getBoundingClientRect().top;
        const height4 = el4.getBoundingClientRect().height;
        const speed4 = 7;
        TweenMax.to(el4, 1, {y: (top4 - height4) / speed4 + "px", ease: Power2.easeOut});
    }

    onResize = e => {
        const shiftedNav = window.matchMedia("screen and (max-width: 35.625em)");
        this.setState(() => ({ shiftedNav: !shiftedNav.matches }));
    }

    componentDidMount() {
        this.animateText();
        window.addEventListener('scroll', this.animateImages);

        const shiftedNav = window.matchMedia("screen and (max-width: 35.625em)");
        this.setState(() => ({ shiftedNav: !shiftedNav.matches }));
    }

    componentWillMount() {
        //scroll event listener
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.animateImages);
        window.removeEventListener("resize", this.onResize);
    }

    

    render(){

        const style1 = {
            backgroundImage: `url(img/pic-1.png)`
        }

        const style2 = {
            backgroundImage: `url(img/pic-4.png)`
        }


        return (
            <>
            <Helmet>
                <title>پنج نوش | درباره ما</title>
            </Helmet>
            <div className="aboutus">
                <svg className="aboutus__about-img-bg aboutus__about-img-bg--left" id='Group_130' data-name='Group 130' xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 267.117 1080'>
                    <defs />
                    <path className="aboutus__about-img-bg-bottom" id='Path_1051' data-name='Path 1051' d='M48.2,0V982.9C196.3,869.4,216.9,802.4,216.9,802.4s91-148.9,28-368.5S244.9,0,244.9,0H48.2Z'
                    />
                    <path className="aboutus__about-img-bg-top" id='Path_1052' data-name='Path 1052' d='M0,0V1080C162.7,955.3,185.4,881.6,185.4,881.6s100-163.6,30.8-404.9S216.2,0,216.2,0H0Z'
                    />
                </svg>
                <Navigation shifted={this.state.shiftedNav} transparent={true}/>
                <div className="aboutus__container">
                    <div className="aboutus__about">
                        <h1 className="aboutus__about-title mg-bottom-md">درباره پنج نوش</h1>
                        <p className="aboutus__about-text">{this.state.about}</p>
                    </div>
                    <div className="aboutus__about-img" style={style2}>
                        
                    </div>
                    <span className="aboutus__about-bg aboutus__about-bg--right"></span>
                    

                    <div className="aboutus__trophies">
                        <h2 className="aboutus__trophies-title mg-bottom-md">افتخارات و نشان های پنج نوش</h2>
                        <p className="aboutus__trophies-text">{this.state.trophies}</p>
                    </div>
                    <span className="aboutus__trophies-img" style={style1}></span>
                    <span className="aboutus__about-bg aboutus__about-bg--left"></span>

                    <svg className="aboutus__about-img-bg aboutus__about-img-bg--right" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 375.496 1080'>
                        <defs />
                        <g id='Group_131' data-name='Group 131' transform='translate(-.004)'>
                            <path className="aboutus__about-img-bg-bottom"  id='Path_1053' data-name='Path 1053' d='M375.5,0S98.9-.2,77.4,300.2C67.8,434.8-218.7,836.7,375.5,1080Z'
                            />
                            <path className="aboutus__about-img-bg-top"  id='Path_1054' data-name='Path 1054' d='M375.5,0S-41.8,142.5,44.7,431,0,998.3,375.5,1080Z'
                            />
                        </g>
                    </svg>
                </div>
                <Footer />
            </div>
            </>
        );
    } 
}