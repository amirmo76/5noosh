import React from 'react';
import History from './History';

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
        ]
    }

    render() {
        return (
            <div className="dashboard__card histories__card">
                <h2 className="dashboard__card-title">تاریخچه خرید شما</h2>
                {
                    this.state.data.map(cur => 
                        <History title={cur.content} date={cur.date} status={cur.status}/>)
                }
                {
                    this.state.data.length === 0 &&
                    <p className="dashboard__empety">موردی یافت نشد</p>
                }
            </div>
        );
        
    }
}