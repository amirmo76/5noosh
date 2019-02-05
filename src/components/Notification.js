import React from 'react';

export default class Notification extends React.Component {
    render() {
        return (
            <div className="notification">
                <h3 className="notification__title">{this.props.title}</h3>
                <p className="notification__date">{this.props.date}</p>
            </div>
        );
    }
}