import React from 'react';

export default class Response extends React.Component {

    closeClickHandler = e => {
        this.props.deleteResponse(this.props.index);
    }

    render() {
        return (
            <div className={"response" + (this.props.type ? ` response--${this.props.type}` : ' response--warning')}>
                <button className="response__close unselectable" onClick={this.closeClickHandler}>x</button>
                <p className="response__message">{this.props.message}</p>
            </div>
        )
    }
}