import React from 'react';
import Notification from './Notification';

export default class Notifications extends React.Component {

    state = {
        data : [
            {
                id: '25',
                content: 'عنوان هشدار',
                date: '1396/11/05'
            },
            {
                id: '37',
                content: 'عنوان هشدار',
                date: '1395/12/23'
            },
            {
                id: '45',
                content: 'عنوان هشدار',
                date: '1397/09/21'
            }
        ]
    }

    render() {
        return (
            <div className="dashboard__card notifications__card">
                <h2 className="dashboard__card-title mg-bottom-sm">اعلان های شما</h2>
                {
                    this.state.data.map(cur => 
                        <Notification title={cur.content} date={cur.date}/>)
                }
                {
                    this.state.data.length === 0 &&
                    <p className="dashboard__empety">موردی یافت نشد</p>
                }
            </div>
        );
        
    }
}