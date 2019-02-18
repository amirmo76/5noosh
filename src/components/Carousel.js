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

        this.addSlide('هدیه سلامتی', 'با دمنوش های گیاهی پنج نوش سلامتی را از طبیعت هدیه بگیرید', '/img/pic-9.jpg');
        this.addSlide('دمنوش آرتیشو', 'سم زدایی و پاکسازی و احیای سلول های کبد', '/img/pic-11.jpg', 'primary', 'خرید محصول', '/product/2');
    }

    state = {
        isActive: true,
        slides: [],
        current: 0,
        isCompressed: false
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

    screenChangeHandler = e => {
        if (window.innerWidth < 1250) {
            this.setState(() => ({isCompressed: true}));
        } else {
            this.setState(() => ({isCompressed: false}));
        }
    }

    componentDidMount() {
        this.screenChangeHandler();
        window.addEventListener("resize", this.screenChangeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.screenChangeHandler);
    }
    
    render() {

        let style = {
            backgroundImage: `url(${this.state.slides[this.state.current].imgSrc})`
        }

        return (
            <div className="carousel">
                {
                    this.state.isCompressed ? (
                        <a href={this.state.slides[this.state.current].btnHref}>
                            <h2 className="carousel__title carousel__title--link">{this.state.slides[this.state.current].title}</h2>
                        </a>
                    ) : (
                        <h2 className="carousel__title">{this.state.slides[this.state.current].title}</h2>
                    )
                }
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