import React from 'react';
import Navigation from './Navigation';
import Carousel from './Carousel';
import Recommended from './Recommended';
import Features from './Features';
import Testemonials from './Testemonials';
import Footer from './Footer';
import HomeArticles from './HomeArticles';
import HomeSales from './HomeSales';
import { Helmet } from "react-helmet";


export default class HomePage extends React.Component {

    state = {
        shiftedNav: true
    }

    onResize = e => {
        const shiftedNav = window.matchMedia("screen and (max-width: 78.125em)");
        this.setState(() => ({ shiftedNav: !shiftedNav.matches }));
    }

    componentDidMount() {
        this.onResize();
    }

    componentWillMount() {
        //scroll event listener for navigation shift
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        //scroll event listener for navigation shift
        window.removeEventListener('resize', this.onResize);
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>پنج نوش | فروش دمنوش های گیاهی</title>
                </Helmet>
                <div className="home">
                    <Navigation shifted={this.state.shiftedNav}/>
                    <Carousel />
                    <Recommended 
                    hero='img/product-hero-1.jpg' 
                    logo='img/artisho-no-bg.png' 
                    id={1}
                    landscape={false} 
                    shortDesc='تنظیم قند خون بدن' />
                    <Recommended
                    direction='rtl'
                    landscape={true} 
                    hero='img/product-hero-2.jpg' 
                    logo='img/artisho-no-bg.png' 
                    id={2}
                    shortDesc='سم زدایی و پاک سازی کبد' />
                    <Features />
                    <HomeSales />
                    <Testemonials />
                    <HomeArticles />
                    <Footer animated={true}/>
                </div>
            </>
        );
    }
}