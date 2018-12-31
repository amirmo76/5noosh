import React from 'react';
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
        price: 0
    }
    
    //call this to reac cart properly from local storage and it keeps the data
    updateCart = e => {
        const rawItems = JSON.parse(localStorage.getItem('cart'));
        let price = 0;
        rawItems.forEach(cur => {
            price += parseInt(cur.price.replace(',', ''));
        });

        const items = [];
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

        this.setState(() => ({ items, price }));
    }

    componentDidMount() {
        this.updateCart();
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
                </div>
            </div>
        )
    } 
}