import React from 'react';
import History from './History';
import Modal from './Modal';

export default class Histories extends React.Component {

    state = {
        data : [
            {
                id: '25',
                content: 'محصول شماره 1 و محصول شماره 2 و ...',
                date: '1396/11/05',
                status: 3
            },
            {
                id: '37',
                content: 'محصول شماره 1',
                date: '1395/12/23',
                status: 3
            },
            {
                id: '45',
                content: 'سه عدد محصول شماره 5',
                date: '1397/09/21',
                status: 2
            }
        ],

        detailedPurchase: {
            id: '23',
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
            const id = p.id.split('-')[1];
            console.log(id);
        }
    }

    render() {

        let modalJSX = (
            <div className="history-detail">
                <div className="history-detail__container">
                    <p className="history-detail-item">عنوان</p>
                    <p className="history-detail-item">قیمت</p>
                    <p className="history-detail-item">تعداد</p>
                    {
                        this.state.detailedPurchase.productTitles.map(cur => 
                            <p className="history-detail__item history-detail__item--title">{cur}</p>
                        )
                    }   
                    {
                        this.state.detailedPurchase.pruductPrices.map(cur => 
                            <p className="history-detail__item history-detail__item--price">{cur}</p>
                        )
                    }
                    {
                        this.state.detailedPurchase.pruductCounts.map(cur => 
                            <p className="history-detail__item history-detail__item--count">{cur}</p>
                        )
                    } 

                    <div className="history-detail__footer">
                        <p className="history-detail__item">مجموع: {this.state.detailedPurchase.totalPrice}</p>
                        <p className="history-detail__item">تاریخ: {this.state.detailedPurchase.date}</p>
                        <p className="history-detail__item">وضعیت: {this.state.detailedPurchase.status}</p>
                        <p className="history-detail__item">شماره پیگیری: {this.state.detailedPurchase.refrenceCode}</p>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="dashboard__card histories__card" onClick={this.onDetailClickListener}>
                <h2 className="dashboard__card-title">تاریخچه خرید شما</h2>
                {
                    this.state.data.map(cur => 
                        <History title={cur.content} date={cur.date} status={cur.status} id={cur.id}/>)
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