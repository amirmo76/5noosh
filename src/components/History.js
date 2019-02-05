import React from 'react';

export default class History extends React.Component {
    render() {
        let status = 'تحویل داده شده';
        switch (this.props.status) {
            case 0:
                status = 'ثبت شده';
                break;
            case 1:
                status = 'در حال آماده سازی';
                break;
            case 2:
                status = 'ارسال محموله';
                break;
            case 3:
                status = 'دریافت محموله';
                break;
        }
        return (
            <div className="history">
                <h3 className="history__title">{this.props.title}</h3>
                <svg className="history__detail" id='Capa_1' xmlns='http://www.w3.org/2000/svg' width='561' height='561'
                viewBox='0 0 561 561'>
                    <path d='M280.5,89.25C153,89.25,43.35,168.3,0,280.5c43.35,112.2,153,191.25,280.5,191.25S517.65,392.7,561,280.5 C517.65,168.3,408,89.25,280.5,89.25z M280.5,408C209.1,408,153,351.9,153,280.5c0-71.4,56.1-127.5,127.5-127.5 c71.4,0,127.5,56.1,127.5,127.5C408,351.9,351.9,408,280.5,408z M280.5,204c-43.35,0-76.5,33.15-76.5,76.5 c0,43.35,33.15,76.5,76.5,76.5c43.35,0,76.5-33.15,76.5-76.5C357,237.15,323.85,204,280.5,204z'
                    id='visibility' />
                </svg>
                <p className="history__status">{status}</p>
                <p className="history__date">{this.props.date}</p>
            </div>
        );
    }
}