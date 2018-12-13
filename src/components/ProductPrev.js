import React from 'react';

export default class ProductPrev extends React.Component {

    state = {
        slideshow: this.props.slideshow,
        secondary: this.props.secondary
    }

    style = {
        backgroundImage: `url(${this.props.thumbnail})`
    }

    render() {
        return (
            <div className={"product-prev" + (this.props.slideshow ? " product-prev--slide-show" : "") + (this.props.slideshow ? (" product-prev--slide-show-" + this.props.slideshow) : "")}>
                <div className="product-prev__img" style={this.style}></div>
                <div className="product-prev__header">
                    <h3 className="product-prev__title">{this.props.title}</h3>
                    <a className="product-prev__category">{this.props.category}</a>
                </div>
                <div className="product-prev__footer">
                    <span className="product-prev__price">{this.props.price}</span>
                    <span className="product-prev__price-tag">تومان</span>
                    <svg className="product-prev__svg" id='Capa_1' xmlns='http://www.w3.org/2000/svg' width='459' height='459'
                    viewBox='0 0 459 459'>
                        <path d='M178.5,140.25v-102L0,216.75l178.5,178.5V290.7c127.5,0,216.75,40.8,280.5,130.05C433.5,293.25,357,165.75,178.5,140.25z'
                        id='reply' />
                    </svg>
                    <svg className="product-prev__svg" id='Capa_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 491.86 491.86'>
                        <path d='M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69 C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69 s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z'
                        />
                    </svg>
                </div>
            </div>
        );
    }
}