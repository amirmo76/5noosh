import React from 'react';
import ProductPrev from './ProductPrev';
import Draggable from "gsap/Draggable";
import {TweenMax} from "gsap/TweenMax";
import axios from 'axios';

export default class HomeSales extends React.Component {

    state = {
        firstRight: 0,
        moveLimits: undefined,
        position: 0,

        items: [
            {
                id: 1,
                title: 'نام محصول - 1',
                price: 1000,
                category: 'دسته بندی',
                thumbnail: 'img/img-1.png',
                off: 50
            },
            {
                id: 2,
                title: 'نام محصول - 2',
                price: 2000,
                category: 'دسته بندی',
                thumbnail: 'img/img-2.png',
                off: 50
            },
            {
                id: 3,
                title: 'نام محصول - 3',
                price: 3000,
                category: 'دسته بندی',
                thumbnail: 'img/img-3.jpg',
                off: 50
            },
            {
                id: 4,
                title: 'نام محصول - 4',
                price: 4000,
                category: 'دسته بندی',
                thumbnail: 'img/img-4.jpg',
                off: 50
            },
            {
                id: 5,
                title: 'نام محصول - 5',
                price: 8000,
                category: 'دسته بندی',
                thumbnail: 'img/img-5.jpg',
                off: 50
            }
        ]
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
        
        let temp
        Draggable.create("#products", {
            bound: '.home-sales__bound', 
            dragClickables: true,
            type: "x",
            cursor: 'grab',
            onDragStart:function() {
                // console.log(this.x);
            },
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

                // console.log(this.x);
            }
        });

        const moveLimits = document.querySelectorAll('.product-prev').length - 2;
        this.setState(() => ({ moveLimits }));

        const bind = this;
        axios({
            method: 'get',
            url: '/api/sales/home/all'
        }).then(function (response) {
            if (response.data.status === 200) {
                const temp = response.data.data;
                const data = temp.map(cur => {
                    const item = {
                        id: cur.id,
                        title: cur.name,
                        thumbnail: cur.logo,
                        price: cur.price,
                        category: cur.category,
                        off: cur.active_sales.off
                    }
                    console.log(cur.active_sales);
                    return item;
                });
                bind.setState(() => ({items: data}));
            }
        });
    }


    rightClickHandler = e => {
        let canMove = false;
        const newPos = this.state.position + 1;

        if (newPos <= this.state.moveLimits) {
            this.setState(() => ({ position: newPos }));
            canMove = true;
        }
        
        if (canMove) {
            const el = document.getElementById('products');
            const style = window.getComputedStyle(el);
            const right = parseInt(style.getPropertyValue('right'));
            const shift = document.querySelector('.product-prev').clientWidth;
            TweenMax.to(el, 0.75, { right: right - shift}); 
            
            this.checkAfterRightOrLeftClick();
        }
    }


    leftClickHandler = e => {
        let canMove = false;
        const newPos = this.state.position - 1;

        if (newPos >= 0) {
            this.setState(() => ({ position: newPos }));
            canMove = true;
        }
        
        if (canMove) {
            const el = document.getElementById('products');
            const style = window.getComputedStyle(el);
            const right = parseInt(style.getPropertyValue('right'));
            const shift = document.querySelector('.product-prev').clientWidth;
            TweenMax.to(el, 0.75, { right: right + shift}); 

            this.checkAfterRightOrLeftClick();
        }
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
                {
                    this.state.items.map(cur => <ProductPrev product={cur}/>)
                }
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