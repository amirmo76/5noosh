import React from 'react';
import {TimelineMax} from "gsap/TimelineMax";
import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';

export default class Footer extends React.Component {

    initAnmation = e => {
        const bind = this;
        const controller = new ScrollMagic.Controller();
        const selector = ".footer";

        const anim = new TimelineMax();
        anim.from(selector, 1.5, {y: "-400px", ease: Power2.easeOut})

        const scene = new ScrollMagic.Scene({
            triggerElement: selector,
            reverse: false
        })
        .setTween(anim)
        .addTo(controller);
    }

    componentDidMount() {
        if (this.props.animated) {
            this.initAnmation();
        }
    }

    render() {
        return (
            <div className="footer footer--bg-black">
                <div className="footer__links">
                    <h3 className="footer__title">لینک ها</h3>
    
                    <ul className="footer__list">
                        <li className="footer__list-item">
                            <div className="footer__link">خانه</div>
                        </li>
    
                        <li className="footer__list-item">
                            <div className="footer__link">فروشگاه</div>
                        </li>
    
                        <li className="footer__list-item">
                            <div className="footer__link">بلاگ</div>
                        </li>
    
                        <li className="footer__list-item">
                            <div className="footer__link">شرایط استفاده</div>
                        </li>
    
                        <li className="footer__list-item">
                            <div className="footer__link">حریم خصوصی</div>
                        </li>
    
                        <li className="footer__list-item">
                            <div className="footer__link">پرسش های متداول</div>
                        </li>
    
                        <li className="footer__list-item">
                            <div className="footer__link">درباره ما</div>
                        </li>
    
                        <li className="footer__list-item">
                            <div className="footer__link">ارتباط با ما</div>
                        </li>
                    </ul>
                </div>
    
                <div className="footer__socials">
                    <h3 className="footer__title">شبکه های اجتماعی</h3>
    
                    <div className="footer__social-icons">
                        <svg className="footer__svg" id='footer__facebook' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 250'>
                            <path className='st0' d='M125,0c34.6,0,66,14,88.7,36.7c22.7,22.7,36.7,54,36.7,88.7c0,34.6-14,66-36.7,88.7 c-22.7,22.7-54,36.7-88.7,36.7c-34.6,0-66-14-88.7-36.7c-22.7-22.7-36.7-54-36.7-88.7c0-34.6,14-66,36.7-88.7C59,14,90.4,0,125,0 L125,0z M206.8,43.7c-21-20.9-49.9-33.9-81.8-33.9c-31.9,0-60.8,13-81.7,33.9C22.4,64.6,9.4,93.5,9.4,125.4 c0,31.9,13,60.8,33.9,81.8C64.2,228.1,93.1,241,125,241c31.9,0,60.8-12.9,81.8-33.8c20.9-21,33.8-49.9,33.8-81.8 C240.6,93.5,227.7,64.6,206.8,43.7L206.8,43.7z'
                            />
                            <path className='st1' d='M134.6,99.8V89.5c0-4.9,3.3-6.1,5.6-6.1c2.3,0,14.4,0,14.4,0V61.5h-19.8c-22,0-26.9,16.2-26.9,26.8v11.5H95.1 v15.5v10.1H108c0,29.1,0,64,0,64h25.6c0,0,0-35.4,0-64h19l0.8-10.1l1.5-15.6H134.6z'
                            />
                        </svg>
    
                        <svg className="footer__svg" id='footer__instagram' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 250'>
                            <path className='st0' d='M125,0c34.6,0,66,14,88.7,36.7c22.7,22.7,36.7,54,36.7,88.7c0,34.6-14,66-36.7,88.7 c-22.6,22.7-54,36.7-88.7,36.7c-34.6,0-66-14-88.7-36.7c-22.7-22.7-36.7-54-36.7-88.7c0-34.6,14-66,36.7-88.7C59,14,90.4,0,125,0 L125,0z M206.8,43.7c-21-20.9-49.9-33.9-81.8-33.9c-31.9,0-60.8,13-81.7,33.9C22.4,64.6,9.4,93.5,9.4,125.4 c0,31.9,13,60.8,33.9,81.8C64.2,228.1,93.1,241,125,241c31.9,0,60.8-12.9,81.8-33.8c20.9-21,33.8-49.9,33.8-81.8 C240.6,93.5,227.7,64.6,206.8,43.7L206.8,43.7z'
                            />
                            <path className='st1' d='M92.9,125.4c0-17.7,14.4-32.2,32.1-32.2c17.8,0,32.2,14.4,32.2,32.2c0,17.8-14.4,32.2-32.2,32.2 C107.3,157.6,92.9,143.2,92.9,125.4L92.9,125.4z M158.2,62.6H91.9c-16.3,0-29.7,13.3-29.7,29.7v66.3c0,16.3,13.4,29.7,29.7,29.7 h66.3c16.4,0,29.7-13.4,29.7-29.7V92.3C187.9,75.9,174.6,62.6,158.2,62.6L158.2,62.6z M91.9,70h66.3c12.3,0,22.3,10,22.3,22.3v66.3 c0,12.3-10,22.3-22.3,22.3H91.9c-12.3,0-22.3-10-22.3-22.3V92.3C69.6,80,79.6,70,91.9,70L91.9,70z M164.8,79.4 c-3.6,0-6.5,2.9-6.5,6.5c0,3.6,2.9,6.5,6.5,6.5c3.6,0,6.5-2.9,6.5-6.5C171.3,82.3,168.4,79.4,164.8,79.4L164.8,79.4z M165.6,125.4 c0-22.4-18.1-40.6-40.6-40.6c-22.4,0-40.6,18.2-40.6,40.6c0,22.4,18.2,40.6,40.6,40.6C147.4,166,165.6,147.8,165.6,125.4 L165.6,125.4z'
                            />
                        </svg>
    
                        <svg className="footer__svg" id='footer__twitter' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 250'>
                            <path className='st0' d='M125,0c34.5,0,65.8,14,88.4,36.6C236,59.2,250,90.5,250,125c0,34.5-14,65.8-36.6,88.4 C190.8,236,159.5,250,125,250c-34.5,0-65.8-14.1-88.4-36.6C14,190.8,0,159.5,0,125c0-34.5,14-65.8,36.6-88.5C59.2,14,90.5,0,125,0 L125,0z M206.5,43.5C185.6,22.7,156.8,9.8,125,9.8c-31.8,0-60.6,12.9-81.5,33.7C22.6,64.3,9.8,93.2,9.8,125 c0,31.8,12.9,60.6,33.8,81.5c20.8,20.8,49.6,33.8,81.5,33.8c31.8,0,60.6-12.9,81.5-33.8c20.9-20.8,33.8-49.7,33.8-81.5 C240.2,93.2,227.4,64.3,206.5,43.5L206.5,43.5z'
                            />
                            <path className='st1' d='M188.8,86.1c-4.6,2-9.7,3.4-15,4.1c5.5-3.3,9.6-8.2,11.6-14.3c-5.1,3-10.7,5.1-16.7,6.3 c-4.7-5-11.6-8.2-19.2-8.2c-14.4,0-26.2,11.6-26.2,25.7c0,2.1,0.4,4,0.8,5.9c-21.8-1-41.1-11.3-54-26.9c-2.2,3.9-3.6,8.2-3.6,12.9 c0,9,4.7,16.9,11.6,21.5c-4.3-0.1-8.3-1.2-11.8-3.2c0,0.1,0,0.2,0,0.3c0,3.3,0.6,6.4,1.8,9.3c3.2,8.1,10.5,14.2,19.2,15.9 c-2.3,0.6-4.5,1-6.9,1c-1.7,0-3.3-0.2-4.9-0.6c3.4,10.2,13,17.7,24.4,18c-9,6.9-20.2,11-32.5,11c-2.1,0-4.2-0.1-6.3-0.3 c11.6,7.3,25.4,11.6,40.1,11.6c40.9,0,66.2-28.3,72.7-57.7c1.2-5.3,1.7-10.4,1.7-15.6c0-1.1,0-2.3,0-3.3 C180.9,95.8,185.4,91.2,188.8,86.1L188.8,86.1z'
                            />
                        </svg>
    
                        <svg className="footer__svg" id='footer__googleplus' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 250'>
                            <path className='st0' d='M125,0.3c34.6,0,65.8,14,88.4,36.6c22.6,22.6,36.6,53.9,36.6,88.4c0,34.6-14,65.8-36.6,88.4 c-22.6,22.6-53.9,36.6-88.4,36.6s-65.8-14-88.4-36.6C13.9,191.2-0.1,160-0.1,125.4c0-34.6,14-65.8,36.6-88.4 C59.2,14.3,90.4,0.3,125,0.3L125,0.3z M206.5,43.9C185.7,23,156.9,10.1,125,10.1S64.3,23,43.5,43.9C22.6,64.7,9.7,93.5,9.7,125.4 c0,31.9,12.9,60.7,33.8,81.6c20.8,20.8,49.7,33.7,81.5,33.7s60.7-12.9,81.5-33.7c20.9-20.9,33.8-49.7,33.8-81.6 C240.3,93.5,227.4,64.7,206.5,43.9L206.5,43.9z'
                            />
                            <path className='st1' d='M137.7,116.7c-9.2,0.1-18.4,0.1-27.6,0.1c-2.6,0-5.3-0.1-7.9,0c-0.6,0-1.4,0.6-1.4,1 c-0.1,5.3-0.1,10.7-0.1,16.2c7.5,0,15,0,22.5,0c-0.2,1.1-0.4,1.9-0.8,2.7c-3.4,10.3-14,15.3-25.4,13.4 c-14.1-2.4-22.9-15.4-20.3-29.5c0.3-2,1-3.9,1.7-5.8c4.7-10.2,16.3-16.5,27.7-13.9c4.1,0.9,7.6,2.8,10.6,5.5 c4.2-4.2,8.1-8.1,12.4-12.4c-0.3-0.2-0.8-0.6-1-0.9c-10-8.4-21.4-11.5-34.2-9.4c-18.5,3-31.8,17.5-34.6,34.5 c-1.3,7.2-0.8,14.9,2.1,22.4c7.1,17.9,25.1,29,44.5,26.8c9.5-1,17.9-4.4,24.5-11.4c9.8-10.4,12.3-22.9,10.7-36.6 C140.8,117.1,139.9,116.7,137.7,116.7L137.7,116.7z M179.6,118c-0.8,0-1.8,0-2.8,0c0-0.2,0-0.5,0-0.6c0-0.8,0-1.4,0-1.9 c0-3.5,0.1-7.1,0-10.7c0-0.6-0.7-1.6-1-1.6c-3.2-0.1-6.4-0.1-9.8-0.1c0,4.3,0,8.3,0,12.4c0,0.8,0,1.6,0,2.4c-5.1,0-9.8,0-14.9,0 c0,1.2,0,1.9,0,2.7c0.1,2.6,0.2,5.3,0.4,8c2.6,0.1,5.1,0.3,7.8,0.3c2.2,0.1,4.4,0,6.7,0c0,5.1,0,9.8,0,14.5c3.7-0.1,7.1,0,10.7,0 c0-4.9,0-9.6,0-14.5c5,0,9.7,0,14.5,0c0-2.8,0-5.5,0-8.2c0-0.9,0-1.7,0-2.6C187.5,118,183.6,118,179.6,118L179.6,118z'
                            />
                        </svg>
    
                        <svg className="footer__svg" id='footer__youtube' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 250'>
                            <path className='st0' d='M125,0c34.5,0,65.7,14,88.4,36.6C236,59.2,250,90.5,250,125c0,34.5-14,65.7-36.6,88.4 C190.7,236,159.5,250,125,250s-65.7-14-88.4-36.6C14,190.8,0,159.5,0,125c0-34.5,14-65.8,36.6-88.4C59.3,14,90.5,0,125,0L125,0z M206.4,43.5C185.6,22.7,156.8,9.8,125,9.8S64.4,22.7,43.6,43.5C22.7,64.4,9.8,93.2,9.8,125c0,31.8,12.9,60.6,33.8,81.4 c20.8,20.8,49.6,33.8,81.4,33.8s60.6-12.9,81.4-33.8c20.9-20.8,33.8-49.7,33.8-81.4C240.2,93.2,227.3,64.4,206.4,43.5L206.4,43.5z'
                            />
                            <path className='st1' d='M187.6,98.4c0,0-1.3-9.2-5.1-13.2c-4.8-5.3-10.3-5.3-12.7-5.7c-17.9-1.3-44.6-1.3-44.6-1.3h-0.1 c0,0-26.7,0-44.6,1.3c-2.6,0.3-8,0.4-12.8,5.7c-3.8,4-5.1,13.2-5.1,13.2s-1.3,10.8-1.3,21.4v1.4v8.8c0,10.8,1.3,21.5,1.3,21.5 s1.3,9.2,5.1,13.3c4.8,5.3,11.2,5.1,14.1,5.7c10.2,1,43.4,1.4,43.4,1.4s26.8-0.1,44.6-1.4c2.4-0.3,7.9-0.3,12.7-5.7 c3.8-4.1,5.1-13.3,5.1-13.3s1.2-10.7,1.2-21.5v-8.2v-1.9C188.8,109.2,187.6,98.4,187.6,98.4L187.6,98.4z M146.3,123.6l-34.5,18.6 v-28.6v-8.7l15.6,8.5L146.3,123.6z'
                            />
                        </svg>
                    </div>
    
                </div>
    
                <div className="footer__subscribe">
                    <h3 className="footer__title">خبرنامه</h3>
                    
                    <div className="footer__subscribe-input-box">
                        <input className="input input--attached" type="email" placeholder="ایمیل خود را وارد کنید"/>
                        <button className="btn btn--no-up-animation btn--color-animation-blue btn--fat btn--primary btn--attached">عضویت</button>
                    </div>
                </div>
    
                <p className="footer__copyright"> تمامی حقوق مادی و معنوی این سایت متعلق به پنج نوش است ©</p>
    
                <p className="footer__by">طراحی و راه اندازی توسط اسم تیم</p>
            </div>
        )
    }
}
