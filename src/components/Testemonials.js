import React from 'react';
import {TweenMax} from "gsap/TweenMax";

export default class Testemonials extends React.Component {

    state = {
        animVal: 1
    }

    scrollAnimation = e => {
            if (window.innerWidth > 860) {
                this.setState(prev => ({animVal: prev.animVal + 1}));
                if (this.state.animVal % 5 === 0) {
                    const el = document.getElementById('testemonial-1');
                    const top = el.getBoundingClientRect().top;
                    const height = el.getBoundingClientRect().height;
                    const speed = 6;
                    TweenMax.to(el, 1.5, {
                        top: -(top - height) / speed + "px",
                        ease: Power2.easeOut
                    });

                    const el2 = document.getElementById('testemonial-2');
                    const top2 = el2.getBoundingClientRect().top;
                    const height2 = el2.getBoundingClientRect().height;
                    const speed2 = 8;
                    TweenMax.to(el2, 1.5, {
                        top: (top2 - height2) / speed2 + "px",
                        ease: Power2.easeOut
                    });
                }
            }
    }

    initAnimations = e => {
        window.addEventListener('scroll', this.scrollAnimation);
    }

    componentDidMount() {
        this.initAnimations();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollAnimation);
    }

    render() {
        return (
            <div className="testemonials">
    
                <div className="testemonials__header">
                    <h2 className="heading--primary">برخی از مشتریان ما</h2>
                    <h3 className="sub-heading">چرا پنج نوش؟ از زبان مشتریان ما</h3>
                </div>
                
                <div className="testemonials__content">
                    <div className="testemonial testemonial--primary" id="testemonial-1">
                        <img className="testemonial__img" src="img/person-2.jpg"/>
                        <p className="testemonial__name">نام و نام خانوادگی</p>
                        <h4 className="testemonial__title">کیفیت فوق العاده</h4>
                        <p className="testemonial__text">برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
                    </div>
    
                    <div className="testemonial testemonial--tertiary" id="testemonial-2">
                        <img className="testemonial__img" src="img/person-1.jpg"/>
                        <p className="testemonial__name">نام و نام خانوادگی</p>
                        <h4 className="testemonial__title">خوش طعم</h4>
                        <p className="testemonial__text">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                    </div>
                </div>
                
            </div>
        )
    }
}
