import React from 'react';
import { Link } from 'react-router-dom';

export default class ProductPrev extends React.Component {

    state = {
        slideshow: this.props.slideshow,
        secondary: this.props.secondary
    }

    

    calculatePrice(price, off) {
        return parseInt(price) * 100 / (100 - off);
    }

    stylizePrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    addToCart = e => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = [];
        }
        cart.push(this.props.product);
        const json = JSON.stringify(cart);
        localStorage.setItem('cart', json);
        
        if (this.props.addToCartCallBack) {
            this.props.addToCartCallBack();
        }
    }

    render() {

        const style = {
            backgroundImage: `url(${this.props.product && this.props.product.thumbnail})`
        }

        return (
            <div className={"product-prev" + (this.props.slideshow ? " product-prev--slide-show" : "") + (this.props.slideshow ? (" product-prev--slide-show-" + this.props.slideshow) : "")} onClick={this.props.onClick} slideshow-position={this.props.slideshow}>
                {this.props.product.off &&
                    <svg className="product-prev__off" height='512pt' viewBox='0 0 512 512' width='512pt' xmlns='http://www.w3.org/2000/svg'>
                        <path d='m484.261719 215.410156c-6-4.933594-15.070313-12.390625-16.105469-16.261718-1.160156-4.347657 2.917969-15.28125 5.894531-23.261719 5.765625-15.472657 12.304688-33.007813 3.671875-47.925781-8.738281-15.101563-27.355468-18.203126-43.777344-20.9375-7.824218-1.304688-19.652343-3.273438-22.671874-6.296876-3.023438-3.023437-4.992188-14.847656-6.296876-22.671874-2.734374-16.421876-5.835937-35.039063-20.9375-43.777344-14.917968-8.632813-32.453124-2.09375-47.921874 3.671875-7.984376 2.976562-18.921876 7.050781-23.265626 5.894531-3.871093-1.035156-11.328124-10.105469-16.261718-16.105469-10.691406-13.003906-22.808594-27.738281-40.589844-27.738281s-29.898438 14.734375-40.589844 27.738281c-4.933594 6-12.390625 15.070313-16.261718 16.105469-4.347657 1.160156-15.28125-2.917969-23.261719-5.894531-15.472657-5.765625-33.007813-12.304688-47.925781-3.671875-15.101563 8.738281-18.203126 27.355468-20.9375 43.777344-1.304688 7.824218-3.273438 19.652343-6.296876 22.671874-3.023437 3.023438-14.847656 4.992188-22.671874 6.296876-16.421876 2.734374-35.039063 5.835937-43.777344 20.9375-8.632813 14.917968-2.09375 32.453124 3.671875 47.921874 2.976562 7.984376 7.054687 18.917969 5.894531 23.265626-1.035156 3.871093-10.105469 11.328124-16.105469 16.261718-13.003906 10.691406-27.738281 22.808594-27.738281 40.589844s14.734375 29.898438 27.738281 40.589844c6 4.933594 15.070313 12.390625 16.105469 16.261718 1.160156 4.347657-2.917969 15.28125-5.894531 23.261719-5.765625 15.472657-12.304688 33.007813-3.671875 47.925781 8.738281 15.101563 27.355468 18.203126 43.777344 20.9375 7.824218 1.304688 19.652343 3.273438 22.671874 6.296876 3.023438 3.023437 4.992188 14.847656 6.296876 22.671874 2.734374 16.421876 5.835937 35.039063 20.9375 43.777344 14.917968 8.628906 32.453124 2.09375 47.921874-3.671875 7.984376-2.976562 18.917969-7.054687 23.265626-5.894531 3.871093 1.035156 11.328124 10.105469 16.261718 16.105469 10.691406 13.003906 22.808594 27.738281 40.589844 27.738281s29.898438-14.734375 40.589844-27.738281c4.933594-6 12.390625-15.070313 16.261718-16.105469 4.347657-1.15625 15.28125 2.917969 23.261719 5.894531 15.472657 5.765625 33.007813 12.304688 47.925781 3.671875 15.101563-8.738281 18.203126-27.355468 20.9375-43.777344 1.304688-7.824218 3.273438-19.652343 6.296876-22.671874 3.023437-3.023438 14.847656-4.992188 22.671874-6.296876 16.421876-2.734374 35.039063-5.835937 43.777344-20.9375 8.632813-14.917968 2.09375-32.453124-3.671875-47.921874-2.976562-7.984376-7.054687-18.917969-5.894531-23.265626 1.035156-3.871093 10.105469-11.328124 16.105469-16.261718 13.003906-10.691406 27.738281-22.808594 27.738281-40.589844s-14.734375-29.898438-27.738281-40.589844zm0 0'
                        fill='#ff3c7d' />
                        <path d='m344.769531 167.230469c-5.765625-5.765625-15.121093-5.765625-20.886719 0l-156.652343 156.652343c-5.765625 5.765626-5.765625 15.117188 0 20.886719 2.882812 2.882813 6.664062 4.324219 10.445312 4.324219 3.777344 0 7.558594-1.441406 10.441407-4.324219l156.652343-156.652343c5.765625-5.765626 5.765625-15.117188 0-20.886719zm0 0'
                        fill='#fdd835' />
                        <path d='m484.261719 215.410156c-6-4.933594-15.070313-12.390625-16.105469-16.261718-1.160156-4.347657 2.917969-15.28125 5.894531-23.261719 5.765625-15.472657 12.304688-33.007813 3.671875-47.925781-8.738281-15.101563-27.355468-18.203126-43.777344-20.9375-7.824218-1.304688-19.652343-3.273438-22.671874-6.296876-3.023438-3.023437-4.992188-14.847656-6.296876-22.671874-2.734374-16.421876-5.835937-35.039063-20.9375-43.777344-14.917968-8.632813-32.453124-2.09375-47.921874 3.671875-7.984376 2.976562-18.921876 7.050781-23.265626 5.894531-3.871093-1.035156-11.328124-10.105469-16.261718-16.105469-10.691406-13.003906-22.808594-27.738281-40.589844-27.738281v512c17.78125 0 29.898438-14.734375 40.589844-27.738281 4.933594-6 12.390625-15.070313 16.261718-16.105469 4.347657-1.15625 15.28125 2.917969 23.261719 5.894531 15.472657 5.765625 33.007813 12.304688 47.925781 3.671875 15.101563-8.738281 18.203126-27.355468 20.9375-43.777344 1.304688-7.824218 3.273438-19.652343 6.296876-22.671874 3.023437-3.023438 14.847656-4.992188 22.671874-6.296876 16.421876-2.734374 35.039063-5.835937 43.777344-20.9375 8.632813-14.917968 2.09375-32.453124-3.671875-47.921874-2.976562-7.984376-7.054687-18.917969-5.894531-23.265626 1.035156-3.871093 10.105469-11.328124 16.105469-16.261718 13.003906-10.691406 27.738281-22.808594 27.738281-40.589844s-14.734375-29.898438-27.738281-40.589844zm0 0'
                        fill='#d10050' />
                        <path d='m344.769531 167.230469c-5.765625-5.765625-15.121093-5.765625-20.886719 0l-67.882812 67.882812v41.773438l88.769531-88.769531c5.765625-5.765626 5.765625-15.117188 0-20.886719zm0 0'
                        fill='#fbc02d' />
                        <path d='m195.078125 237.539062c23.410156 0 42.460937-19.050781 42.460937-42.460937 0-23.414063-19.050781-42.460937-42.460937-42.460937-23.414063 0-42.460937 19.046874-42.460937 42.460937 0 23.410156 19.046874 42.460937 42.460937 42.460937zm0 0'
                        fill='#fdd835' />
                        <path d='m316.921875 274.460938c-23.410156 0-42.460937 19.050781-42.460937 42.460937 0 23.414063 19.050781 42.460937 42.460937 42.460937 23.414063 0 42.460937-19.046874 42.460937-42.460937 0-23.410156-19.046874-42.460937-42.460937-42.460937zm0 0'
                        fill='#fbc02d' />
                    </svg>  
                }
                <div className="product-prev__img" style={style}>
                    <div className="product-prev__more">
                        <p className="product-prev__more-text">{this.props.product && this.props.product.shortDesc}</p>
                        <Link to={'/product' + "/" + (this.props.product && this.props.product.id)}>
                            <button className="btn btn--primary btn--no-up-animation btn--shadow-animation">توضیحات بیشتر</button>
                        </Link>
                    </div>
                </div>
                <div className="product-prev__header">
                    <h3 className="product-prev__title">{this.props.product && this.props.product.title}</h3>
                    <a className="product-prev__category">{this.props.product && this.props.product.category}</a>
                </div>
                <div className="product-prev__footer">
                    <span className={"product-prev__price " + (this.props.product.off ? "product-prev__price--off" : "")}>{this.props.product.off ? this.stylizePrice(this.calculatePrice(this.props.product.price, this.props.product.off)) : this.stylizePrice(this.props.product.price)}</span>
                    <span className="product-prev__price-tag">تومان</span>

                    { this.props.product.off && 
                        <div className="product-prev__off-price">
                            <span className="product-prev__price">{this.props.product && this.stylizePrice(this.props.product.price)}</span>
                            <span className="product-prev__price-tag">تومان</span>
                        </div>
                    }
                    
                    {
                        // this.props.homeSales ||
                        <Link to={'/product' + "/" + (this.props.product && this.props.product.id)} className="clickable">
                            <svg className={"product-prev__svg product-prev__svg--back" + (this.props.homeSales ? " no-margin" : "")} id='Capa_1' xmlns='http://www.w3.org/2000/svg' width='459' height='459'
                            viewBox='0 0 459 459'>
                                <path d='M178.5,140.25v-102L0,216.75l178.5,178.5V290.7c127.5,0,216.75,40.8,280.5,130.05C433.5,293.25,357,165.75,178.5,140.25z'
                                id='reply' />
                            </svg>
                        </Link>
                    }

                    {
                        this.props.homeSales ||
                        <svg className="product-prev__svg product-prev__svg--add" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24.933 24.933' onClick={this.addToCart}>
                            <defs />
                            <path id='Path_1327' data-name='Path 1327' d='M7.48,19.946A2.493,2.493,0,1,0,9.973,22.44,2.5,2.5,0,0,0,7.48,19.946ZM0,0V2.493H2.493l4.488,9.475L5.236,14.96a4.429,4.429,0,0,0-.249,1.247A2.5,2.5,0,0,0,7.48,18.7H22.44V16.206H7.979a.268.268,0,0,1-.249-.249v-.125l1.122-2.119h9.225A2.274,2.274,0,0,0,20.2,12.466l4.488-8.1a.686.686,0,0,0,.249-.623,1.178,1.178,0,0,0-1.247-1.247H5.236L4.114,0ZM19.946,19.946A2.493,2.493,0,1,0,22.44,22.44,2.5,2.5,0,0,0,19.946,19.946Z'
                            />
                        </svg>
                    }
                    
                </div>
            </div>
        );
    }
}