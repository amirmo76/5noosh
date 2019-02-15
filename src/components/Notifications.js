import React from 'react';
import Notification from './Notification';

export default class Notifications extends React.Component {

    state = {
        data : this.props.notifications
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