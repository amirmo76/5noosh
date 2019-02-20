import React from 'react';
import History from './History';
import Modal from './Modal';
import axios from 'axios';

export default class Histories extends React.Component {

    state = {
        data : [],
        
        detailedPurchase: {
            id: 23,
            productTitles: ['محصول 1','محصول 2'],
            pruductCounts: [1,2],
            pruductPrices: ['10,000','15,300'],
            totalPrice: '25,300',
            date: '1396/11/05',
            status: 'در حال آماده سازی',
            refrenceCode: '21354535'
        },

        querySelector: ''
    }

    activePurchaceTitleMaker(titles) {
        if (titles) {
            let res = '';
            if (titles.length > 2) {
                res = `... ${titles[0]} و ${titles[1]} و`;
            } else {
                titles.forEach(cur => res.length > 2 ? res = res + cur : res =  cur + ' و ');
            }
            return res;
        } 
    }

    getTotalPrice(prices) {
        let sum = 0;
        prices.forEach(cur => sum += cur);
        return sum;
    }

    componentDidMount() {
        const bind = this;
        const token = JSON.parse(localStorage.getItem('token'));

        axios({
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            url: '/api/purchases/'
        }).then(function (response) {
            if (response.status === 200) {
                const purchases = response.data.data.map(cur => {
                    let title = [];
                    cur.purchased_products.forEach(cur => {
                        title.push(cur.name);
                    })

                    const temp = {
                        id: cur.id,
                        status: cur.status,
                        titles: bind.activePurchaceTitleMaker(title),
                        date: cur.created_at,
                        transID: cur.trans_id,
                        products: cur.purchased_products
                    } 

                    return temp;
                });
                bind.setState(() => ({ data: purchases, querySelector: ".history__detail" }));
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    onDetailClickListener = e => {
        let p = e.target;
        let found = false;
        if (p.parentNode.id.includes('history') && p.classList[0] === "history__detail") {
            p = p.parentNode;
            found = true;
        } else if (p.parentNode.parentNode.id.includes('history')) {
            p = p.parentNode.parentNode;
            found = true;
        }
        
        if (found) {
            const id = parseInt(p.id.split('-')[1]);
            
            const bind = this;
            const token = JSON.parse(localStorage.getItem('token'));
            axios({
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                url: '/api/purchases/' + id
            }).then(function (response) {
                if (response.status === 200) {
                    const p = response.data.data;
                    console.log(response.data.data);
                    let detailedPurchase = {
                        id: p.id,
                        productTitles: p.purchased_products.map(cur => cur.name),
                        pruductCounts: p.purchased_products.map(cur => cur.number_of_purchases),
                        pruductPrices: p.purchased_products.map(cur => cur.price),
                        totalPrice: bind.getTotalPrice(p.purchased_products.map(cur => cur.price)),
                        date: p.created_at,
                        status: p.status,
                        refrenceCode: p.trans_id
                    }
                    console.log(p.id);
                    console.log(p.purchased_products.map(cur => cur.name));
                    console.log(p.purchased_products.map(cur => cur.number_of_purchases));
                    console.log(p.purchased_products.map(cur => cur.price));
                    console.log(bind.getTotalPrice(p.purchased_products.map(cur => cur.price)));
                    console.log(p.created_at);
                    console.log(p.status);
                    console.log(p.trans_id);
                    console.log(detailedPurchase)

                    bind.setState(prev => ({
                        detailedPurchase: {
                            id: detailedPurchase.id,
                            productTitles: detailedPurchase.productTitles,
                            pruductCounts: detailedPurchase.pruductCounts,
                            pruductPrices: detailedPurchase.pruductPrices,
                            totalPrice: detailedPurchase.totalPrice,
                            date: detailedPurchase.date,
                            status: detailedPurchase.status,
                            refrenceCode: detailedPurchase.refrenceCode
                        },

                        querySelector: ".history__detail"
                     }), console.log(bind.state.detailedPurchase));
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    getStatus(stat) {
        switch (stat) {
            case 0: 
                return 'ثبت شده';
            case 1:
                return 'در حال آماده سازی';
            case 2:
                return 'ارسال محموله';
            case 3: 
                return 'دریافت محموله'; 
        }
    }

    stylizePrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        let modalJSX = <p>خطا در بارگزاری</p>;
        if (this.state.detailedPurchase.pruductPrices) {
            modalJSX = (
                <div className="history-detail">
                    <div className="history-detail__container">
                        <p className="history-detail-item">عنوان</p>
                        <p className="history-detail-item">قیمت</p>
                        <p className="history-detail-item">تعداد</p>
                        { 
                            this.state.detailedPurchase &&
                            this.state.detailedPurchase.productTitles.map(cur => 
                                <p className="history-detail__item history-detail__item--title">{cur}</p>
                            )
                        }   
                        {
                            this.state.detailedPurchase &&
                            this.state.detailedPurchase.pruductPrices.map(cur => 
                                <p className="history-detail__item history-detail__item--price">{this.stylizePrice(cur)}</p>
                            )
                        }
                        {
                            this.state.detailedPurchase &&
                            this.state.detailedPurchase.pruductCounts.map(cur => 
                                <p className="history-detail__item history-detail__item--count">{cur}</p>
                            )
                        } 

                        <div className="history-detail__footer">
                            <p className="history-detail__item">مجموع: {this.stylizePrice(this.state.detailedPurchase.totalPrice)}</p>
                            <p className="history-detail__item">تاریخ: {this.state.detailedPurchase.date}</p>
                            <p className="history-detail__item">وضعیت: {this.getStatus(this.state.detailedPurchase.status)}</p>
                            <p className="history-detail__item">شماره پیگیری: {this.state.detailedPurchase.refrenceCode}</p>
                        </div>
                    </div>
                </div>
            );
        }


        return (
            <div className="dashboard__card histories__card" onClick={this.onDetailClickListener}>
                <h2 className="dashboard__card-title">تاریخچه خرید شما</h2>
                {
                    this.state.data.map(cur => 
                        <History title={cur.titles} date={cur.date} status={cur.status} id={cur.id}/>)
                }
                {
                    this.state.data.length === 0 &&
                    <p className="dashboard__empety">موردی یافت نشد</p>
                }
                <Modal querySelector={this.state.querySelector} content={modalJSX}/>
            </div>
        );
        
    }
}