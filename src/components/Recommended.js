import React from 'react';
import {TweenMax} from "gsap/TweenMax";

export default class Recommended extends React.Component {
    
    float = e => {
        const bind = this;
        window.addEventListener('scroll', function() {
            const el = document.getElementById('recommended-' + bind.props.id);
            const top = el.getBoundingClientRect().top;
            const height = el.getBoundingClientRect().height;
            let on = (top > 0 - 50) && (top < height + 50);
            // if (bind.props.id === 2) {
            //     on = (top - height > 0 - 50) && (top < height + 50);
            // } 
            if (on) {
                TweenMax.to(el, .2, {top: (top - height) /8 + "px"});
            }

        });
    }

    componentDidMount() {
        console.log(document.getElementById('recommended-' + this.props.id).getBoundingClientRect().top);
    }

    render () {

        let style = {
            backgroundImage: `url(${this.props.hero})`
        }

        this.float();

        return (
            <div className={"recommended " + (this.props.direction && "recommended--rtl")}>
                <span id={"recommended-" + this.props.id} className={"recommended__hero recommended__hero--left " + (this.props.landscape && "recommended__hero--landscape")} style={style}></span>
                <span className={"recommended__hero-bg recommended__hero-bg--left " + (this.props.landscape && "recommended__hero-bg--landscape")}></span>
                <div className="recommended__product recommended__product--right">
                    <img className="recommended__logo" src={this.props.logo}/>
                    <span className="recommended__product-bg recommended__product-bg--left"></span>
                    <h2 className="recommended__desc">{this.props.shortDesc}</h2>
                    <div className="recommended__buttons">
                        <button className="recommended__more btn btn--outline-primary">جزئیات بیشتر</button>
                        <button className="recommended__shop btn btn--primary">فروشگاه</button>
                    </div>
                </div>
            </div>
        );
    }
}
