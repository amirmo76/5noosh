import React from 'react';

export default class Navigation extends React.Component {
    state = {
        isLoggedIn: false
    };

    logo = (
        <svg className="navigation__logo" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 250 250'>
            <polygon className='st0' points='128.4,17 189.1,77 166.9,99.6 128.4,62.3 91.1,99.6 68.1,76.6'
            />
            <path className='st0' d='M228.8,117l-29-28.2L174,114.4c-10.7,4.1-16.8,0-16.8,0l-29.8-29.8l-25.9,25.9l38.5,38.5l-17.9,17.9 l-11.3-11.3l6.7-6.7L56.6,88.9L30,114.7c-24.6,29-4.8,55.6-4.8,55.6L76,221.8c19,19.4,36.1,8.3,36.1,8.3l16.5-14.7l10.1,11.1 c21,14.7,35.7,0,35.7,0l56.3-56.7C251,142.4,228.8,117,228.8,117z M202.2,105.1l11.3,11.3l-10.4,10.4l-11.7-11L202.2,105.1z M92.3,129.3l11.1,11.1l-6.5,6.5l28.8,28.8l-11.1,11.1l-28.2-28.2C86.3,158.7,74.4,143.6,92.3,129.3z M33.5,161c0,0-12-19.2,4.5-37 l17.5-17.5l10.2,9.8l-14.3,14.3c0,0-11.1,14.3,0,26.2l29.8,29.8l12.9-12.9l11.7,11.7l-24,24L33.5,161z M115.3,213.1 c-13.1,15.9-26.2,4.4-26.2,4.4l70.1-70.1l-31.9-31.9l-7.6,7.6l-9.5-9.9L128,95.3l39.6,39.6c11.1,14.3,0,25.8,0,25.8L115.3,213.1z M220.7,163.5l-53.1,53.1c0,0-11.3,12.4-23.7,0l-12.8-12.8l10.7-10.7l13.8,13.8l53.2-53.2c0,0,5.8-15.4-3.4-24.4l10.3-10.7l5,5 C220.7,123.6,239.2,144.9,220.7,163.5z'
            />
        </svg>
    );

    render() {
        return (
            <nav className={'navigation' + (this.props.shifted ? ' navigation--shifted' : '')} >
                {this.logo && this.logo}
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <a className="navigation__link">فروشگاه</a>
                    </li>
                    <li className="navigation__item">
                        <a className="navigation__link">پیشنهادات ویژه</a>
                    </li>
                    <li className="navigation__item">
                        <a className="navigation__link">بلاگ</a>
                    </li>
                    <li className="navigation__item">
                        <a className="navigation__link">درباره ما</a>
                    </li>
                    <li className="navigation__item">
                        <a className="navigation__link">ارتباط با ما</a>
                    </li>
                </ul>

                {this.state.isLoggedIn || 
                    <div className="navigation__buttons">
                        <button className="btn btn--secondary">ثبت نام</button>
                        <button className="btn btn--secondary btn--outline">ورود</button>
                    </div>
                }
                
            </nav>
        );
    }
}