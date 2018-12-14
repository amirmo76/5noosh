import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import axios from 'axios';


export default class Product extends React.Component {

    state = {
        
    }

    render(){
        return (
            <div className="product">
                <Navigation />
                <span className="product__bg--top"></span>
                <span className="product__bg--mid"></span>
                <div className="product__box">
                    <div className="product__header">
                        <div className="product__gallery">
                            <img className="product__img product__img--main"/>
                            <img className="product__img product__img--sub-left"/>
                            <img className="product__img product__img--sub-left"/>
                        </div>
                        <div className="product__info">
                            <h1 className="product__title">عنوان محصول</h1>
                            <h3 className="product__cat">دسته بندی</h3>
                            <h3 className="product__cat">دسته بندی</h3>
                            <h3 className="product__cat">دسته بندی</h3>
                            <p className="product__desc">
                                توضیحاتی کوتاه از محصول لورم ایپسوم متنی ساختگی جهت استفاده در طراحی و صنعت چاپ
                            </p>
                            <span className="product__price">15,000 تومان</span>
                            <button className="product__button btn btn--primary">افزودن به سبد خرید</button>
                        </div>
                    </div>

                    <div className="product__body">
                        <div className="product__desc-gp product__desc-gp">
                            <h2 className="product__subtitle">عنوان اول در توضیحات کامل</h2>
                            <p className="product__subdesc">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد</p>
                        </div>


                        <div className="product__desc-gp product__desc-gp--mid">
                            <h2 className="product__subtitle">عنوان اول در توضیحات کامل</h2>
                            <p className="product__subdesc">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد</p>
                        </div>

                        <span className="product__img-bg--left"></span>
                        <img className="product__img product__img--left"/>

                        <span className="product__img-bg--right"></span>
                        <img className="product__img product__img--rgight"/>

                        <div className="product__desc-gp product__desc-gp--right">
                            <h2 className="product__subtitle">عنوان اول در توضیحات کامل</h2>
                            <p className="product__subdesc">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد</p>
                        </div>  
                    </div>

                    <div className="product__uasge">
                        <div className="product__step">
                            <h2 className="product__subtitle">عنوان اول در توضیحات کامل</h2>
                            <p className="product__subdesc">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد</p>
                        </div>

                        <div className="product__desc-gp product__desc-gp--mid">
                            <h2 className="product__subtitle">عنوان اول در توضیحات کامل</h2>
                            <p className="product__subdesc">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد</p>
                        </div>

                        <div className="product__desc-gp product__desc-gp--right">
                            <h2 className="product__subtitle">عنوان اول در توضیحات کامل</h2>
                            <p className="product__subdesc">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد</p>
                        </div>  
                    </div>
                </div>
                <Footer />
            </div>
        );
    } 
}