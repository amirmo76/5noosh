import React from 'react';

const Recommended = props => {
    
    let style = {
        backgroundImage: `url(${props.hero})`
    }

    return (
        <div className="recommended">
            <span className="recommended__hero recommended__hero--left" style={style}></span>
            <span className="recommended__hero-bg recommended__hero-bg--left"></span>
            <div className="recommended__product recommended__product--right">
                <img className="recommended__logo" src={props.logo}/>
                <span className="recommended__product-bg recommended__product-bg--left"></span>
                <h2 className="recommended__desc">{props.shortDesc}</h2>
                <div className="recommended__buttons">
                    <button className="recommended__more btn btn--outline-primary">جزئیات بیشتر</button>
                    <button className="recommended__shop btn btn--primary">فروشگاه</button>
                </div>
            </div>
        </div>
    );
}

export default Recommended;