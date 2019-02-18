import React from 'react';
import Navigation from './Navigation';
import Carousel from './Carousel';
import Recommended from './Recommended';
import Features from './Features';
import Testemonials from './Testemonials';
import Footer from './Footer';
import HomeArticles from './HomeArticles';
import HomeSales from './HomeSales';



const HomePage = props => {
    return (
        <div className="home">
            <Navigation shifted={true}/>
            <Carousel />
            <Recommended 
            hero='img/product-hero-1.jpg' 
            logo='img/product-1-no-bg.png' 
            id={1}
            landscape={false} 
            shortDesc='تنظیم قند خون بدن' />
            <Recommended
            direction='rtl'
            landscape={true} 
            hero='img/product-hero-2.jpg' 
            logo='img/product-1-no-bg.png' 
            id={2}
            shortDesc='سم زدایی و پاک سازی کبد' />
            <Features />
            <HomeSales />
            <Testemonials />
            <HomeArticles />
            <Footer animated={true}/>
        </div>
    );
}

export default HomePage;