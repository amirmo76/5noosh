import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

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
        isOpen: false,
        user: {
            id: 1,
            name: 'محمد قاسمی',
            email: 'amir.mohseni7697@gmail.com',
            phone: '09132669877',
            zipCode: '991786542',
            state: 'تهران',
            city: 'تهران',
            profilePic: 'img/pic-5.png',
            address: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است'
        }
    }
    
    //call this to reac cart properly from local storage and it keeps the data
    updateCart = e => {
        const rawItems = JSON.parse(localStorage.getItem('cart'));
        let items = [];
        let price = 0;
        if (rawItems) {
            rawItems.forEach(cur => {
                price += cur.price;
            });
    
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
        }

        this.setState(() => ({ items, price }));
    }

    componentDidMount() {
        const bind = this;
        const token = JSON.parse(localStorage.getItem('token'));
        axios({
            method: 'get',
            url: '/api/users',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }).then(function (response) {
            if (response.status === 200) {
                const temp = response.data.data;
                bind.setState(prev => ({
                    user: {
                        id: temp.id,
                        name: temp.name,
                        email: temp.email,
                        phone: temp.phone,
                        zipCode: temp.zip_code,
                        state: temp.state,
                        city: temp.city,
                        address: temp.address,
                        profilePic: temp.profile_pic
                    },
                    loggedIn: true 
                }));
                bind.setState(() => ({loggedIn: true,}));        
            }
        }).catch(function (error) {
            // bind.setState(() => ({loggedIn: false}));
        });

        this.updateCart();
    }

    toggleInfoAgreement = e => {
        const agreedInfo = !this.state.agreedInfo;
        this.setState(() => ({ agreedInfo }));
    }

    toggleTermsAgreement = e => {
        const agreedTerms = !this.state.agreedTerms;
        this.setState(() => ({ agreedTerms }));
    }

    removeItemHandler = e => {
        let el = e.target;
        let par = el.parentNode;
        while(!par.classList.contains('cart__item')) {
            el = par;
            par = el.parentNode;
        }
        // par is the one
        const id = par.getAttribute("product-id");
        const newArr = JSON.parse(localStorage.getItem('cart')).filter(cur => cur.id != id);
        localStorage.setItem('cart', JSON.stringify(newArr));
        this.updateCart();
    }

    findItemFromLocalStorageById(id) {
        let item;
        JSON.parse(localStorage.getItem('cart')).forEach(cur => {
            if (cur.id == id) {
                item = cur;
            }
        });
        return item;
    }

    plusItemClickHandler = e => {
        let el = e.target;
        let par = el.parentNode;
        while(!par.classList.contains('cart__item')) {
            el = par;
            par = el.parentNode;
        }
        const id = par.getAttribute("product-id");
        const item = this.findItemFromLocalStorageById(id);
        let arr = JSON.parse(localStorage.getItem('cart'));
        arr.push(item);
        localStorage.setItem('cart', JSON.stringify(arr));
        this.updateCart();
    }

    minusItemClickHandler = e => {
        let el = e.target;
        let par = el.parentNode;
        while(!par.classList.contains('cart__item')) {
            el = par;
            par = el.parentNode;
        }
        const id = par.getAttribute("product-id");
        const item = this.findItemFromLocalStorageById(id); 
        let arr = JSON.parse(localStorage.getItem('cart'));
        let index = -1;
        arr.forEach((cur, i) => {
            if (cur.id === item.id) {
                index = i;
            }
        });
        arr.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(arr));
        this.updateCart();  
    }

    deleteAllClickHandler = e => {
        const arr = [];
        localStorage.setItem('cart', JSON.stringify(arr));
        this.updateCart();
    }

    submitPurchase = e => {
        const products = [];
        this.state.items.forEach(cur => {
            const item = {
                id: cur.id,
                quantity: cur.count
            }
            products.push(item);
        });

        console.log(products);

        const bind = this;
        const token = JSON.parse(localStorage.getItem('token'));
        axios({
            method: 'post',
            url: '/api/purchases',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            data: {
                products: products
            }
        }).then(function (response) {
            if (response.status === 200) {
                console.log('submited purchase');     
            }
        }).catch(function (error) {
            console.log(error);
        });        
    }

    render(){
        let imgs = this.state.items.map(cur => {
            const style = {
                backgroundImage: `url(${cur.thumbnail})`
            };
            return style;
        });

        return (
            <div className="cart-page">
                <Navigation />
                <div className="cart">

                    {this.state.items.length > 0 ||
                        <div className="cart__empty-box">
                            <svg className="cart__empty-icon" id='Capa_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 58 58'>
                                <path d='M58,38.5H8v-26h50V38.5z M10,36.5h46v-22H10V36.5z' fill='#556080'
                                />
                                <path d='M9,5.5H4c-0.552,0-1-0.447-1-1s0.448-1,1-1h5c0.552,0,1,0.447,1,1S9.552,5.5,9,5.5z'
                                fill='#556080' />
                                <path d='M9,14.5c-0.552,0-1-0.447-1-1v-9c0-0.553,0.448-1,1-1s1,0.447,1,1v9C10,14.053,9.552,14.5,9,14.5z'
                                fill='#556080' />
                                <path d='M9,48.5c-0.552,0-1-0.447-1-1v-10c0-0.553,0.448-1,1-1s1,0.447,1,1v10C10,48.053,9.552,48.5,9,48.5z'
                                fill='#556080' />
                                <circle cx='19' cy='52.5' r='4' fill='#a5a5a4' />
                                <circle cx='43' cy='52.5' r='4' fill='#a5a5a4' />
                                <path d='M52,48.5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h43c0.552,0,1,0.447,1,1S52.552,48.5,52,48.5z'
                                fill='#556080' />
                                <path d='M57,22.5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h48c0.552,0,1,0.447,1,1S57.552,22.5,57,22.5z'
                                fill='#556080' />
                                <path d='M57,30.5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h48c0.552,0,1,0.447,1,1S57.552,30.5,57,30.5z'
                                fill='#556080' />
                                <path d='M17,38.5c-0.552,0-1-0.447-1-1v-24c0-0.553,0.448-1,1-1s1,0.447,1,1v24 C18,38.053,17.552,38.5,17,38.5z'
                                fill='#556080' />
                                <path d='M25,38.5c-0.552,0-1-0.447-1-1v-24c0-0.553,0.448-1,1-1s1,0.447,1,1v24 C26,38.053,25.552,38.5,25,38.5z'
                                fill='#556080' />
                                <path d='M33,38.5c-0.552,0-1-0.447-1-1v-24c0-0.553,0.448-1,1-1s1,0.447,1,1v24 C34,38.053,33.552,38.5,33,38.5z'
                                fill='#556080' />
                                <path d='M41,38.5c-0.552,0-1-0.447-1-1v-24c0-0.553,0.448-1,1-1s1,0.447,1,1v24 C42,38.053,41.552,38.5,41,38.5z'
                                fill='#556080' />
                                <path d='M49,38.5c-0.552,0-1-0.447-1-1v-24c0-0.553,0.448-1,1-1s1,0.447,1,1v24 C50,38.053,49.552,38.5,49,38.5z'
                                fill='#556080' />
                                <path d='M57,38.5c-0.552,0-1-0.447-1-1v-24c0-0.553,0.448-1,1-1s1,0.447,1,1v24 C58,38.053,57.552,38.5,57,38.5z'
                                fill='#556080' />
                                <circle cx='3' cy='4.5' r='3' fill='#e64c3c' />
                            </svg>
                            <p className="cart__empty">سبد خرید شما خالی است
                            {
                            this.props.location.state &&
                            (this.props.location.state.prevProductID ? 
                            (<NavLink to={"/product/" + this.props.location.state.prevProductID} className="cart__empty-continue">
                            ادامه خرید
                            </NavLink>)
                            :
                            (<NavLink to="/shop" className="cart__empty-continue">
                            ادامه خرید
                            </NavLink>))
                            }
                            </p>
                        </div>
                    }

                    {this.state.items.length > 0 &&
                    <h3 className="cart__info-main-title"> 
                        سبد خرید
                        <svg className="cart__title-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24.933 24.933'>
                            <defs />
                            <path id='Path_1327' data-name='Path 1327' d='M7.48,19.946A2.493,2.493,0,1,0,9.973,22.44,2.5,2.5,0,0,0,7.48,19.946ZM0,0V2.493H2.493l4.488,9.475L5.236,14.96a4.429,4.429,0,0,0-.249,1.247A2.5,2.5,0,0,0,7.48,18.7H22.44V16.206H7.979a.268.268,0,0,1-.249-.249v-.125l1.122-2.119h9.225A2.274,2.274,0,0,0,20.2,12.466l4.488-8.1a.686.686,0,0,0,.249-.623,1.178,1.178,0,0,0-1.247-1.247H5.236L4.114,0ZM19.946,19.946A2.493,2.493,0,1,0,22.44,22.44,2.5,2.5,0,0,0,19.946,19.946Z'
                            />
                        </svg>
                    </h3>}
                    {this.state.items.length > 0 &&
                    <div className="cart__items">
                        {
                            this.state.items.map((cur, i) => {
                                return (
                                    <div className="cart__item" product-id={cur.id}>
                                        <span className="cart__thumbnail" style={imgs[i]}></span>
                                        <p className="cart__item-title">{cur.title}</p>
                                        <div className="cart__count-box">
                                            <span className="cart__operator unselectable" onClick={this.plusItemClickHandler}>+</span>
                                            <span className="cart__count">{cur.count}</span>
                                            <span className="cart__operator unselectable" onClick={this.minusItemClickHandler}>-</span>
                                        </div>
                                        <div className="cart__item-price-box">
                                            <span className="cart__item-price">{cur.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                            <span className="cart__item-unit">تومان</span>
                                        </div>
                                        <span className="cart__remove" onClick={this.removeItemHandler}>X</span>
                                    </div>
                                );
                            })
                        }
                    </div>}
                    { this.state.items.length > 0 &&
                    <div className="cart__footer">
                        <NavLink to="/shop" className="cart__continue-box">
                            <p className="cart__continue-text">ادامه خرید</p>
                            <svg className="cart__continue-back" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31.11 25.925'>
                                <defs />
                                <path id='Path_1329' data-name='Path 1329' className='cls-1' d='M12.1,45.163V38.25L0,50.348l12.1,12.1V55.36c8.642,0,14.691,2.765,19.012,8.814C29.382,55.533,24.2,46.892,12.1,45.163Z'
                                transform='rotate(180 15.555 32.087)' />
                            </svg>
                        </NavLink>
                        <div className="cart__total-box">
                            <p className="cart__total-text">مجموع خرید</p>
                            <span>:</span>
                            <span className="cart__total-price">{this.state.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            <span className="cart__total-unit">تومان</span>
                        </div>
                        <div className="cart__remove-all-box">
                            <svg className="cart__remove-all-icon" id='Layer_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 443 443' onClick={this.deleteAllClickHandler}>
                                <rect x='61.785' y='128' width='60' height='290' />
                                <path d='M211.785,250.65V128h-60v290h44.172c-14.861-21.067-23.602-46.746-23.602-74.43 C172.356,307.145,187.486,274.193,211.785,250.65z'
                                />
                                <path d='M301.785,214.141l0-86.141h-60v100.918C259.731,219.488,280.144,214.141,301.785,214.141z'
                                />
                                <path d='M321.785,38h-83.384V0H125.169v38H41.785v60h280V38z M155.169,30h53.232v8h-53.232V30z'
                                />
                                <path d='M301.785,244.141c-54.826,0-99.429,44.604-99.429,99.429S246.959,443,301.785,443s99.43-44.604,99.43-99.43 S356.611,244.141,301.785,244.141z M355.961,376.533l-21.213,21.213l-32.963-32.963l-32.963,32.963l-21.213-21.213l32.963-32.963 l-32.963-32.963l21.213-21.213l32.963,32.963l32.963-32.963l21.213,21.213l-32.963,32.963L355.961,376.533z'
                                />
                            </svg>
                            <p className="cart__remove-all-text unselectable">حذف همه</p>
                        </div>
                    </div>}
                    {
                        (this.state.loggedIn && this.state.items.length > 0) && 
                        <div className="cart__info-container">
                            <h3 className="cart__info-main-title"> 
                                تایید اطلاعات خرید
                                <svg className="cart__title-icon" viewBox='0 0 496 496' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='m472 16h-73.472656c-3.3125-9.289062-12.113282-16-22.527344-16h-112c-10.414062 0-19.214844 6.710938-22.527344 16h-73.472656c-13.230469 0-24 10.769531-24 24v104h-27.246094c-9.738281 0-19.347656 2.550781-27.792968 7.382812l-43.089844 24.617188h-45.871094v144h53.574219l33.890625 22.59375c9.230468 6.160156 19.976562 9.40625 31.0625 9.40625h25.472656v120c0 13.230469 10.769531 24 24 24h304c13.230469 0 24-10.769531 24-24v-432c0-13.230469-10.769531-24-24-24zm-280 192h16c17.648438 0 32-14.351562 32-32s-14.351562-32-32-32h-16v-80h49.472656c3.3125 9.289062 12.113282 16 22.527344 16h112c10.414062 0 19.214844-6.710938 22.527344-16h49.472656v384h-256zm64-184c0-4.414062 3.585938-8 8-8h112c4.414062 0 8 3.585938 8 8v32c0 4.414062-3.585938 8-8 8h-112c-4.414062 0-8-3.585938-8-8zm-96 16c0-4.414062 3.585938-8 8-8h72v16h-64v96h-16zm-41.472656 296c-7.917969 0-15.589844-2.320312-22.183594-6.71875l-37.917969-25.28125h-42.425781v-112h34.128906l46.773438-26.726562c6.035156-3.449219 12.898437-5.273438 19.851562-5.273438h91.246094c8.824219 0 16 7.175781 16 16s-7.175781 16-16 16h-96v8c0 22.054688-17.945312 40-40 40v16c28.167969 0 51.535156-20.894531 55.433594-48h16.566406v128zm361.472656 136c0 4.414062-3.585938 8-8 8h-304c-4.414062 0-8-3.585938-8-8v-264h16v256h288v-416h-64v-16h72c4.414062 0 8 3.585938 8 8zm0 0'
                                    />
                                    <path d='m272 32h16v16h-16zm0 0' />
                                    <path d='m352 32h16v16h-16zm0 0' />
                                    <path d='m378.984375 369.671875-27-7.710937-.007813-4.058594c14.503907-10.125 24.023438-26.910156 24.023438-45.902344v-16c0-30.871094-25.128906-56-56-56s-56 25.128906-56 56v16c0 18.976562 9.511719 35.753906 24 45.886719v4.082031l-26.992188 7.703125c-17.078124 4.886719-29.007812 20.703125-29.007812 38.472656v23.855469h176v-23.855469c0-17.769531-11.929688-33.585937-29.015625-38.472656zm-98.984375-57.671875v-16c0-22.054688 17.945312-40 40-40s40 17.945312 40 40v16c0 22.054688-17.945312 40-40 40s-40-17.945312-40-40zm55.71875 53.710938-15.71875 20.953124-15.71875-20.953124c4.992188 1.464843 10.261719 2.289062 15.71875 2.289062s10.726562-.824219 15.71875-2.289062zm56.28125 50.289062h-144v-7.855469c0-10.65625 7.160156-20.152343 17.40625-23.082031l27.496094-7.855469 27.097656 36.128907 27.097656-36.128907 27.496094 7.855469c10.246094 2.929688 17.40625 12.425781 17.40625 23.082031zm0 0'
                                    />
                                    <path d='m208 96h16v16h-16zm0 0' />
                                    <path d='m240 96h192v16h-192zm0 0' />
                                    <path d='m256 128h176v16h-176zm0 0' />
                                    <path d='m256 160h176v16h-176zm0 0' />
                                    <path d='m416 192h16v16h-16zm0 0' />
                                    <path d='m256 192h144v16h-144zm0 0' />
                                </svg>
                            </h3>
                            <div className="cart__info-box">
                                <p className="cart__info-title cart__info-title--name">نام و نام خانوادگی</p>
                                <p className="cart__info cart__info--name">{this.state.user.name}</p>
                                <p className="cart__info-title cart__info-title--phone">شماره همراه</p>
                                <p className="cart__info cart__info--phone">{this.state.user.phone}</p>
                                <p className="cart__info-title cart__info-title--state">استان</p>
                                <p className="cart__info cart__info--state">{this.state.user.state}</p>
                                <p className="cart__info-title cart__info-title--city">شهر</p>
                                <p className="cart__info cart__info--city">{this.state.user.city}</p>
                                <p className="cart__info-title cart__info-title--address">آدرس</p>
                                <p className="cart__info cart__info--address">{this.state.user.address}</p>
                                <p className="cart__info-title cart__info-title--zip-code">کد پستی</p>
                                <p className="cart__info cart__info--zip-code">{this.state.user.zipCode}</p>
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
                    {(this.state.items.length > 0 && !this.state.loggedIn) &&
                        <button className="btn btn--green btn--no-radius btn--color-animation-blue btn--no-up-animation btn--stretch-x cart__btn">برای ادامه و ثبت خرید وارد حساب کاربری خود شوید</button>
                    }

                    {(this.state.items.length > 0 && this.state.loggedIn) &&
                        <button className="btn btn--green btn--no-radius btn--color-animation-blue btn--no-up-animation btn--stretch-x cart__btn" onClick={this.submitPurchase}>ثبت سفارش</button>
                    }
                </div>
                <Footer />
            </div>
        )
    } 
}