import React from 'react';
import History from './History';
import Modal from './Modal';

export default class Histories extends React.Component {

    state = {
        data : this.props.purchases,
        
        detailedPurchase: {
            id: 23,
            productTitles: ['محصول 1','محصول 2'],
            pruductCounts: [1,2],
            pruductPrices: ['10,000','15,300'],
            totalPrice: '25,300',
            date: '1396/11/05',
            status: 'در حال آماده سازی',
            refrenceCode: '21354535'
        }
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
            console.log(`id is ${id}`);
            this.state.data.forEach(cur => {
                if (cur.id === id) {
                    const titles = cur.products.map(cur => cur.name);
                    const counts = cur.products.map(cur => cur.quantity);
                    const prices = cur.products.map(cur => cur.price);
                    let totalPrice = 0;
                    prices.forEach(cur => totalPrice += cur);
                    console.log(titles);
                    this.setState(() => ({
                        detailedPurchase: {
                            id: id,
                            productTitles: titles,
                            pruductCounts: counts,
                            pruductPrices: prices,
                            totalPrice: totalPrice,
                            date: cur.date,
                            status: cur.status,
                            refrenceCode: cur.transID
                        }
                    }));
                }
            })
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
        console.log(this.state.detailedPurchase.pruductPrices);
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
                <Modal content={<p>sd</p>} querySelector={".history__detail"} content={modalJSX}/>
            </div>
        );
        
    }
}