import React from 'react';

class Slide {
    constructor(
        title='نامشخص',
        desc='نامشخص', 
        imgSrc=null, color='primary', 
        btnText='فروشگاه', 
        btnHref='http://panjnoosh.com') {
            this.title = title;
            this.desc = desc;
            this.imgSrc = imgSrc;
            this.color = color;
            this.btnText = btnText;
            this.btnHref = btnHref;
    }
}

export default class Carousel extends React.Component {
    constructor(props) {
        super(props);

        this.addSlide('دوستی با طبیعت', 'زندگی سالم تر با دارو ها و دمنوش های گیاهی پنج نوش', '/img/img-1.png');
        this.addSlide('داروی جدید سرماخوردگی', 'رفع علائم و پیش گیری از سرماخوردگی', '/img/img-2.png');
        this.addSlide('عنوان یک مقاله', 'توضیحاتی از مقاله در این جا قرار می گیرد', '/img/blog-1.jpg');
        this.addSlide('داروی ضد سرطان', 'تمامی عنوان ها و متن ها نمادین بوده ', '/img/img-5.jpg');
    }

    state = {
        isActive: true,
        slides: [],
        current: 0
    }

    addSlide(
        title='نامشخص',
        desc='نامشخص', 
        imgSrc=null, color='primary', 
        btnText='فروشگاه', 
        btnHref='http://panjnoosh.com') {
            const slide = new Slide(title, desc, imgSrc, color, btnText, btnHref);
            this.state.slides.push(slide);
    }

    slideClickHandler = e => {
        const id = e.target.id.split('-')[1];
        this.setState(prev => ({
            current: id
        }));
        console.log(this.state);
    }
    
    render() {

        let style = {
            backgroundImage: `url(${this.state.slides[this.state.current].imgSrc})`
        }

        return (
            <div className="carousel">
                <h2 className="carousel__title">{this.state.slides[this.state.current].title}</h2>
                <p className="carousel__desc">{this.state.slides[this.state.current].desc}</p>
                <button className={`btn carousel__btn btn--no-up-animation btn--shadow-animation btn--${this.state.slides[this.state.current].color}`}>{this.state.slides[this.state.current].btnText}</button>
                <div className={`carousel__bg carousel__bg--${this.state.slides[this.state.current].color}`}></div>
                <span style={style} src={this.state.slides[this.state.current].imgSrc} alt="carousel picture" className="carousel__img"></span>
                <div className="carousel__slides">
                    {
                        this.state.slides.map((cur, i) => 
                        <h3 id={"slide-" + i} className="carousel__slide" onClick={this.slideClickHandler}>{cur.title}</h3>)
                    }
                </div>
            </div>
        );
    }
}