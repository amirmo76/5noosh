import React from 'react';
import ProductPrev from './ProductPrev';

const HomeSales = props => {
    let style = {
        backgroundImage: `url(${props.thumbnail})`
    }

    return (
        <div className="home-sales">
            <div className="home-sales__header">
                <h2 className="heading--primary">پیشنهادات ویژه ماه</h2>
                <h3 className="sub-heading">چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</h3>
            </div>
            <span className="home-sales__hero"></span>
            <span className="home-sales__bg"></span>
            <div className="home-sales__products">
                <ProductPrev  title="نام محصول" category="دسته بندی" price="12.500" thumbnail="img/img-3.jpg" />
                <ProductPrev  title="نام محصول" category="دسته بندی" price="12.500" thumbnail="img/img-4.jpg" />
                <ProductPrev  title="نام محصول" category="دسته بندی" price="12.500" thumbnail="img/img-5.jpg" />
                <ProductPrev  title="نام محصول" category="دسته بندی" price="12.500" thumbnail="img/img-1.png" />
                <ProductPrev  title="نام محصول" category="دسته بندی" price="12.500" thumbnail="img/img-3.jpg" />
            </div>
            </div>
    );
}

export default HomeSales;