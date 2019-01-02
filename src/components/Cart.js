import React from 'react';
import axios from 'axios';
import {TimelineMax} from "gsap/TimelineMax";

export default class Cart extends React.Component {

    // ****EACH ELEMENT OF THE ITEMS HAS:
    // -category
    // -count
    // -id
    // -price
    // -title
    // -thumbnail
    // ***PRICE IS
    // total price of the cart
    state = {
        items: [],
        price: 0,
        loggedIn: true,
        agreedInfo: false,
        agreedTerms: false,
        isOpen: false
    }
    
    //call this to reac cart properly from local storage and it keeps the data
    updateCart = e => {
        const rawItems = JSON.parse(localStorage.getItem('cart'));
        let price = 0;
        rawItems.forEach(cur => {
            price += parseInt(cur.price.replace(',', ''));
        });

        let items = [];
        rawItems.forEach(cur => {
            let foundIndex = -1;
            items.forEach((cur2, i2) => {
                if (cur2.id === cur.id) 
                    foundIndex = i2;
            });

            if (foundIndex > -1) {
                items[foundIndex].count = items[foundIndex].count + 1;
            } else {
                cur.count = 1;
                items.push(cur);  
            }
        });

        // items = [];
        this.setState(() => ({ items, price }));
    }

    componentDidMount() {
        this.updateCart();
        if (this.props.heightCallback) {
            const height = this.getHeight();
            this.props.heightCallback(height);
        }
    }

    toggleInfoAgreement = e => {
        const agreedInfo = !this.state.agreedInfo;
        this.setState(() => ({ agreedInfo }));
    }

    toggleTermsAgreement = e => {
        const agreedTerms = !this.state.agreedTerms;
        this.setState(() => ({ agreedTerms }));
    }

    getHeight() {
        const height = document.querySelector('.cart').getBoundingClientRect().height;
        return height;
    }

    toggle = e => {
        const isOpen = !this.state.isOpen;
        this.setState(!isOpen);

        if (isOpen) {

        } else {
            
        }
    }

    render(){
        let imgs = this.state.items.map(cur => {
            const style = {
                backgroundImage: `url(${cur.thumbnail})`
            };
            return style;
        });

        return (
            <div className="cart">

                <svg className="cart__cart-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24.933 24.933'>
                    <defs />
                    <path id='Path_1327' data-name='Path 1327' d='M7.48,19.946A2.493,2.493,0,1,0,9.973,22.44,2.5,2.5,0,0,0,7.48,19.946ZM0,0V2.493H2.493l4.488,9.475L5.236,14.96a4.429,4.429,0,0,0-.249,1.247A2.5,2.5,0,0,0,7.48,18.7H22.44V16.206H7.979a.268.268,0,0,1-.249-.249v-.125l1.122-2.119h9.225A2.274,2.274,0,0,0,20.2,12.466l4.488-8.1a.686.686,0,0,0,.249-.623,1.178,1.178,0,0,0-1.247-1.247H5.236L4.114,0ZM19.946,19.946A2.493,2.493,0,1,0,22.44,22.44,2.5,2.5,0,0,0,19.946,19.946Z'
                    />
                </svg>

                <div className="cart__header">
                    <svg className="cart__return" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31.11 25.925'>
                        <defs />
                        <path id='Path_1329' data-name='Path 1329' className='cls-1' d='M12.1,45.163V38.25L0,50.348l12.1,12.1V55.36c8.642,0,14.691,2.765,19.012,8.814C29.382,55.533,24.2,46.892,12.1,45.163Z'
                        transform='rotate(180 15.555 32.087)' />
                    </svg>
                    <span className="cart__return-text">
                        ادامه خرید
                    </span>
                </div>

                {this.state.items.length > 0 ||
                    <p className="cart__empty">سبد خرید شما خالی می باشد</p>
                }
                {this.state.items.length > 0 &&
                <div className="cart__items">
                    {
                        this.state.items.map((cur, i) => {
                            return (
                                <div className="cart__item">
                                    <span className="cart__thumbnail" style={imgs[i]}></span>
                                    <p className="cart__item-title">{cur.title}</p>
                                    <div className="cart__count-box">
                                        <span className="cart__operator">+</span>
                                        <span className="cart__count">{cur.count}</span>
                                        <span className="cart__operator">-</span>
                                    </div>
                                    <div className="cart__item-price-box">
                                        <span className="cart__item-price">{cur.price}</span>
                                        <span className="cart__item-unit">تومان</span>
                                    </div>
                                    <span className="cart__remove">X</span>
                                </div>
                            );
                        })
                    }
                </div>}
                { this.state.items.length > 0 &&
                <div className="cart__footer">
                    <div className="cart__continue-box">
                        <p className="cart__continue-text">ادامه خرید</p>
                        <svg className="cart__continue-back" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31.11 25.925'>
                            <defs />
                            <path id='Path_1329' data-name='Path 1329' className='cls-1' d='M12.1,45.163V38.25L0,50.348l12.1,12.1V55.36c8.642,0,14.691,2.765,19.012,8.814C29.382,55.533,24.2,46.892,12.1,45.163Z'
                            transform='rotate(180 15.555 32.087)' />
                        </svg>
                    </div>
                    <div className="cart__total-box">
                        <p className="cart__total-text">مجموع خرید</p>
                        <span>:</span>
                        <span className="cart__total-price">69,000</span>
                        <span className="cart__total-unit">تومان</span>
                    </div>
                </div>}
                {
                    (this.state.loggedIn && this.state.items.length > 0) && 
                    <div className="cart__info-container">
                        <h3 className="cart__info-main-title"> 
                            تایید اطلاعات خرید
                        </h3>
                        <div className="cart__info-box">
                            <p className="cart__info-title cart__info-title--name">نام و نام خانوادگی</p>
                            <p className="cart__info cart__info--name">امیر محسنی مقدم</p>
                            <p className="cart__info-title cart__info-title--phone">شماره همراه</p>
                            <p className="cart__info cart__info--phone">09032512281</p>
                            <p className="cart__info-title cart__info-title--state">استان</p>
                            <p className="cart__info cart__info--state">خراسان رضوی</p>
                            <p className="cart__info-title cart__info-title--city">شهر</p>
                            <p className="cart__info cart__info--city">مشهد</p>
                            <p className="cart__info-title cart__info-title--address">آدرس</p>
                            <p className="cart__info cart__info--address">قاضی طباطبایی 10 - مجتمع فیروزه - فاز 5</p>
                            <p className="cart__info-title cart__info-title--zip-code">کد پستی</p>
                            <p className="cart__info cart__info--zip-code">99125789</p>
                        </div>

                        <div className="cart__agreement">
                            <span className={"cart__checkbox" + (this.state.agreedInfo ? " cart__checkbox--checked" : "")} onClick={this.toggleInfoAgreement}></span>
                            <p className="cart__agreement-text">(اطلاعات بالا مورد تایید بنده می باشد. (در غیر این صورت می توانید در پنل کاربری خود آن ها را ویرایش کنید</p>
                        </div>  
                        <div className="cart__agreement">
                            <span className={"cart__checkbox" + (this.state.agreedTerms ? " cart__checkbox--checked" : "")} onClick={this.toggleTermsAgreement}></span>
                            <p className="cart__agreement-text">.ضمن مطالعه قوانین و مقررات سایت موافقت خود را با آن ها اعلام می کنم</p>
                        </div>
                    </div>
                }
                {this.state.items.length > 0 &&
                    <button className="btn btn--green btn--no-radius btn--color-animation-blue btn--no-up-animation btn--stretch-x cart__btn">برای ادامه و ثبت خرید وارد حساب کاربری خود شوید</button>
                }
            </div>
        )
    } 
}