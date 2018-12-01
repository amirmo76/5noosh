import React from 'react';

const ArticlePrev = props => {
    let style = {
        backgroundImage: `url(${props.thumbnail})`
    }

    return (
        <div className="article-prev">
            <div className="article-prev__img" style={style}></div>
            <h2 className="article-prev__title">{props.title}</h2>
            <p className="article-prev__desc">{props.desc}</p>
            <p className="article-prev__details">دو روز پیش توسط میعاد بهشتی</p>
        </div>
    );
}

export default ArticlePrev;