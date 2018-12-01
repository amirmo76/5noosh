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
            hero='img/product-hero-1.png' 
            logo='img/product.png' 
            shortDesc='افزایش شادابی و نشاط با عنوان محصول' />
            <Features />
            <HomeSales />
            <Testemonials />
            <HomeArticles />
            <Footer />
        </div>
    );
}

export default HomePage;