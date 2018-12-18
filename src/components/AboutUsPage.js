import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';


export default class AboutUsPage extends React.Component {

    state = {
        about: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
        trophies: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد'
    }

    render(){

        const style1 = {
            backgroundImage: `url(img/pic-1.png)`
        }

        const style2 = {
            backgroundImage: `url(img/pic-4.png)`
        }

        return (
            <div className="aboutus">
            <svg className="aboutus__about-img-bg aboutus__about-img-bg--left" id='Group_130' data-name='Group 130' xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 267.117 1080'>
                <defs />
                <path className="aboutus__about-img-bg-bottom" id='Path_1051' data-name='Path 1051' d='M48.2,0V982.9C196.3,869.4,216.9,802.4,216.9,802.4s91-148.9,28-368.5S244.9,0,244.9,0H48.2Z'
                />
                <path className="aboutus__about-img-bg-top" id='Path_1052' data-name='Path 1052' d='M0,0V1080C162.7,955.3,185.4,881.6,185.4,881.6s100-163.6,30.8-404.9S216.2,0,216.2,0H0Z'
                />
            </svg>
                <Navigation shifted={true} transparent={true}/>
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
        );
    } 
}