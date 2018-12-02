import React from 'react';
import ProductPrev from './ProductPrev';
import Draggable from "gsap/Draggable";
import {TweenMax} from "gsap/TweenMax";

export default class HomeSales extends React.Component {

    state = {
        firstRight: 0
    }

    style = {
        backgroundImage: `url(${this.props.thumbnail})`
    }
  
    componentDidMount() {
        const el = document.getElementById('products');
        const style = window.getComputedStyle(el);
        const firstRight = parseInt(style.getPropertyValue('right'));
        const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        this.setState(prev => ({
            firstRight: firstRight
        }));

        Draggable.create("#products", {
            bound: '.home-sales__bound', 
            dragClickables: true,
            type: "x",
            cursor: 'grab',
            onDragEnd: function() {
                const newStyle = window.getComputedStyle(el);
                const newRight = parseInt(newStyle.getPropertyValue('right'));

                let exceeded = this.x > (w/2 + 1625 - w - (firstRight - newRight));
                let lesser = this.x < 0 - (firstRight - newRight);
                if (lesser) {
                    TweenMax.to(this.target, 0.5, { x: 0 - (firstRight - newRight) }); 
                } else if (exceeded) {
                    TweenMax.to(this.target, 0.5, { x: w/2 + 1625 - w - (firstRight - newRight)}); 
                }
            }
        });
    }


    rightClickHandler = e => {
        const el = document.getElementById('products');
        const style = window.getComputedStyle(el);
        const right = parseInt(style.getPropertyValue('right'));
        const shift = document.querySelector('.product-prev').clientWidth;
        TweenMax.to(el, 0.75, { right: right - shift}); 

        this.checkAfterRightOrLeftClick();
    }


    leftClickHandler = e => {
        const el = document.getElementById('products');
        const style = window.getComputedStyle(el);
        const right = parseInt(style.getPropertyValue('right'));
        const shift = document.querySelector('.product-prev').clientWidth;
        TweenMax.to(el, 0.75, { right: right + shift}); 

        this.checkAfterRightOrLeftClick();
    }


    checkAfterRightOrLeftClick() {
        const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const el = document.getElementById('products');
        const newStyle = window.getComputedStyle(el);
        const newRight = parseInt(newStyle.getPropertyValue('right'));

        console.log(parseInt(newStyle.getPropertyValue('left')) + w/2);
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
                <div className="home-sales__arrows">
                    <svg className="home-sales__arrow home-sales__arrow--left" onClick={this.leftClickHandler} id='Capa_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31.494 31.494'>
                        <path d='M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554	c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587	c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z'
                        />
                    </svg>
                    <svg className="home-sales__arrow home-sales__arrow--right" onClick={this.rightClickHandler} id='Capa_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31.494 31.494'>
                        <path d='M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554	c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587	c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z'
                        />
                    </svg>
                </div>
            </div>
        );
    }
}