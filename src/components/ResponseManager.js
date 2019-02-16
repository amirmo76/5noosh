import React from 'react';
import Response from './Response';

export default class ResponseManager extends React.Component {
    state = {
        // [{
        //     type: 'error' / 'success' / 'warning',
        //     message: 'some text'
        // }]
        responses: this.props.responses
    }

    deleteResponse = index => {
        let responses = this.state.responses;
        responses.splice(index, 1);
        this.setState(() => ({responses}));
    }

    render() {
        if (this.props.responses) {
            return (
                <div className="response-manager">
                    {
                        this.state.responses.map((cur, i) => <Response type={cur.type} message={cur.message} index={i} deleteResponse={this.deleteResponse} />)
                    }
                </div>
            );
        }
        
        return (
            false
        );
    }
} 