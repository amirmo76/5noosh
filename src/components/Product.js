import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Product extends React.Component {

    state = {
        product: {
            id: 1,
            title: "دمنوش",
            shortDesc: "توضیحاتی کوتاه از محصول لورم ایپسوم متنی ساختگی جهت استفاده در طراحی و صنعت چاپ",
            thumbnail: "img/img-1.png",
            price: "15,000",
            category: "دسته بندی",
            body: "%h%عنوان اول در توضیحات کامل%h%%p%لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد%p%%h%عنوان دوم در توضیحات کامل%h%%p%لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد%p%لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد%p%%p%ایپسوم متن ساختگی با تولید سادگی نامفرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد%p%",
            use: "%step%لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را%step%%step%لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را%step%%step%لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را%step%",
            pics: [
                {
                    "id": 1,
                    "picture": "img/img-2.png",
                    "product_id": 1
                },
                {
                    "id": 2,
                    "picture": "img/img-3.jpg",
                    "product_id": 1
                },
                {
                    "id": 3,
                    "picture": "img/img-4.jpg",
                    "product_id": 1
                },
                {
                    "id": 4,
                    "picture": "img/img-5.jpg",
                    "product_id": 1
                }
            ]
        },
        error: false
    }

    componentDidMount() {
        const id = this.props.location.pathname.split('/')[2];

        if (!id){
            this.setState(() => ({error: true}));
            return;  
        } 

        const bind = this;
        axios({
            method: 'get',
            url: '/api/products/' + id
        }).then(function (response) {
            if (response.data.status === 200) {
                const temp = response.data.data;
                
                const item = {
                    id: temp.id,
                    title: temp.name,
                    shortDesc: temp.short_description,
                    thumbnail: temp.logo,
                    price: temp.price,
                    category: temp.category,
                    body: temp.description,
                    use: temp.how_to_use,
                    pics: temp.pictures
                }

                bind.setState(() => ({product: item}));
            } else {
                bind.setState(() => ({error: true}));
            }
        });
    }

    formalizePrice(price) {
        let newP = "" + price;
        // sad
    }

    render(){

        const headings = [];
        this.state.product.body.split('%h%').forEach(cur => {
            if (!cur.includes('%') && cur.length > 0) 
                headings.push(cur)
        });

        const paragraphs = [];
        this.state.product.body.split('%p%').forEach(cur => {
            if (!cur.includes('%') && cur.length > 0) 
                paragraphs.push(cur)
        });

        const steps = [];
        this.state.product.use.split('%step%').forEach(cur => {
            if (!cur.includes('%') && cur.length > 0) 
                steps.push(cur)
        });

        let style1 = {
            backgroundImage: `url(${this.state.product.pics[2].picture})`
        }

        let style2 = {
            backgroundImage: `url(${this.state.product.pics[3].picture})`
        }

        if (this.state.error) {
            return (
                <p>this is a placeholder for 404 page</p>
            );
        }

        return (
            <div className="product">
                <Navigation />
                <span className="product__bg--top"></span>
                {/* <span className="product__bg--mid"></span> */}
                <div className="product__container">

                    <div className="product__nav mg-bottom-lg">

                        <div className="product__cart">
                            <svg className="product__cart-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24.933 24.933'>
                                <defs />
                                <path id='Path_1327' data-name='Path 1327' d='M7.48,19.946A2.493,2.493,0,1,0,9.973,22.44,2.5,2.5,0,0,0,7.48,19.946ZM0,0V2.493H2.493l4.488,9.475L5.236,14.96a4.429,4.429,0,0,0-.249,1.247A2.5,2.5,0,0,0,7.48,18.7H22.44V16.206H7.979a.268.268,0,0,1-.249-.249v-.125l1.122-2.119h9.225A2.274,2.274,0,0,0,20.2,12.466l4.488-8.1a.686.686,0,0,0,.249-.623,1.178,1.178,0,0,0-1.247-1.247H5.236L4.114,0ZM19.946,19.946A2.493,2.493,0,1,0,22.44,22.44,2.5,2.5,0,0,0,19.946,19.946Z'
                                />
                            </svg>
                            <span className="product__cart-number">2</span>
                        </div>

                        <Link to='/shop' className="clickable">
                            <svg className="product__back" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31.11 25.925'>
                                <defs />
                                <path id='Path_1329' data-name='Path 1329' className='cls-1' d='M12.1,45.163V38.25L0,50.348l12.1,12.1V55.36c8.642,0,14.691,2.765,19.012,8.814C29.382,55.533,24.2,46.892,12.1,45.163Z'
                                transform='rotate(180 15.555 32.087)' />
                            </svg>
                        </Link>
                        

                    </div>

                    <div className="product__header">
                        <div className="product__gallery">
                            <img src={this.state.product.thumbnail} className="product__img product__img--main"/>
                            <img src={this.state.product.pics[0].picture} className="product__img product__img--sub-left"/>
                            <img src={this.state.product.pics[1].picture} className="product__img product__img--sub-right"/>
                        </div>
                        <div className="product__info">
                            <h1 className="product__title">{this.state.product.title}</h1>
                            <div className="product__cats">
                                <h3 className="product__cat">{this.state.product.category}</h3>
                            </div>
                            <p className="product__short-desc">{this.state.product.shortDesc}</p>
                            <p className="product__price">
                                <span className="product__price-value">{this.state.product.price}</span>
                                <span className="product__price-unit">تومان</span>
                            </p>
                            <button className="product__button btn--color-animation-blue btn--no-up-animation btn--stretch-x btn btn--fat btn--primary">افزودن به سبد خرید</button>
                        </div>
                    </div>

                    <div className="product__body">
                        <div className="product__desc-gp product__desc-gp--mid">
                            <h2 className="product__subtitle">{headings[0]}</h2>
                            <p className="product__subdesc">{paragraphs[0]}</p>
                            
                        </div>


                        <div className="product__desc-gp product__desc-gp--right">
                            <h2 className="product__subtitle">{headings[1]}</h2>
                            <p className="product__subdesc">{paragraphs[1]}</p>
                        </div>

                        <span className="product__img-bg product__img-bg--left"></span>
                        <span className="product__body-img product__body-img--left" style={style1}></span>

                        <span className="product__img-bg product__img-bg--right"></span>
                        <span className="product__body-img product__body-img--right" style={style2}></span>

                        <div className="product__desc-gp product__desc-gp--left">
                            <p className="product__subdesc">{paragraphs[2]}</p>
                            <p className="product__subdesc">{paragraphs[3]}</p>
                        </div>  
                    </div>

                    <div className="product__uasge">

                        <h2 className="product__uasge-title">نحوه استفاده</h2>

                        {steps.map(cur => 
                            <div className="product__step">
                                <img className="product__comma" src="img/comma.png"/>
                                <p className="product__step-text">{cur}</p>
                            </div>
                        )}
                        
                    </div>
                </div>
                <Footer />
            </div>
        );
    } 
}