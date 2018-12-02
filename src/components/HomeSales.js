import React from 'react';
import ProductPrev from './ProductPrev';
import Draggable from "gsap/Draggable";
import {TweenMax} from "gsap/TweenMax";

export default class HomeSales extends React.Component {

    style = {
        backgroundImage: `url(${this.props.thumbnail})`
    }

    componentDidMount() {

        const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        
        Draggable.create("#products", {
            bound: '.home-sales__bound', 
            dragClickables: true,
            type: "x",
            cursor: 'grab',
            onDragEnd: function() {
                let exceeded = this.x > (w/2 + 25);
                let lesser = this.x < 0;
                if (lesser) {
                    TweenMax.to(this.target, 0.5, { x: 0 }); 
                } else if (exceeded) {
                    TweenMax.to(this.target, 0.5, { x: w/2 + 25 }); 
                }
            }
        });
    }

    render() {
        return (
            <div className="home-sales">
                <div className="home-sales__header">
                    <h2 className="heading--primary">پیشنهادات ویژه ماه</h2>
                    <h3 className="sub-heading">چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</h3>
                </div>
                <span className="home-sales__hero"></span>
                <span className="home-sales__bg"></span>
                <div id="products" className="home-sales__products">
                    <ProductPrev  title="نام محصول" category="دسته بندی" price="12.500" thumbnail="img/img-3.jpg" />
                    <ProductPrev  title="نام محصول" category="دسته بندی" price="12.500" thumbnail="img/img-4.jpg" />
                    <ProductPrev  title="نام محصول" category="دسته بندی" price="12.500" thumbnail="img/img-5.jpg" />
                    <ProductPrev  title="نام محصول" category="دسته بندی" price="12.500" thumbnail="img/img-1.png" />
                    <ProductPrev  title="نام محصول" category="دسته بندی" price="12.500" thumbnail="img/img-3.jpg" />
                </div>
                </div>
        );
    }
}