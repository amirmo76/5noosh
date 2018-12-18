import React from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
    state = {
        isLoggedIn: this.props.logged
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

        const style = {
            backgroundImage: `url(${this.props.avatar})`
        }


        return (
            <nav className={'navigation' + (this.props.shifted ? ' navigation--shifted' : '')
            + (this.props.light ? ' navigation--light' : '')
            + (this.state.isLoggedIn ? ' navigation--logged' : '')
            + (this.props.transparent ? ' navigation--transparent' : '')} >
                <Link to='/' className="clickable">
                    {this.logo && this.logo}
                </Link>
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <Link className="navigation__link" to="/shop">فروشگاه</Link>
                    </li>
                    <li className="navigation__item">
                        <a className="navigation__link">پیشنهادات ویژه</a>
                    </li>
                    <li className="navigation__item">
                        <a className="navigation__link">بلاگ</a>
                    </li>
                    <li className="navigation__item">
                        <Link className="navigation__link" to="/aboutus">درباره ما</Link>
                    </li>
                    <li className="navigation__item">
                        <a className="navigation__link">ارتباط با ما</a>
                    </li>
                </ul>

                {this.state.isLoggedIn || 
                    <div className="navigation__buttons">
                        <Link to='/signup'>
                            <button className={"btn btn--secondary btn--stretch"
                        + (this.props.light ? " btn--dark" : "")}>
                        ثبت نام</button>                        
                        </Link>
                        <Link to='/login'>
                            <button className={"btn btn--secondary btn--outline"
                        + (this.props.light ? " btn--outline-dark" : "")}>ورود</button>                        
                        </Link>
                    </div>
                }

                {this.state.isLoggedIn &&
                    <div className="navigation__info">
                        <div className="navigation__avatar" style={style}></div>
                        
                        <svg className="navigation__notif" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 25'>
                            <defs />
                            <path id='Path_1341' data-name='Path 1341' d='M24.631,17.866c-2.94-2.941-3.383-4.417-3.383-9.116a8.748,8.748,0,1,0-17.5,0,14.782,14.782,0,0,1-.416,4.641A10.72,10.72,0,0,1,.368,17.866,1.25,1.25,0,0,0,1.252,20H8.188l-.063.625a4.374,4.374,0,1,0,8.748,0L16.811,20h6.937A1.25,1.25,0,0,0,24.631,17.866ZM12.5,23.75a3.125,3.125,0,0,1-3.125-3.125L9.439,20h6.123l.064.625A3.125,3.125,0,0,1,12.5,23.75Zm-11.248-5C5,15,5,12.5,5,8.75a7.5,7.5,0,1,1,15,0c0,3.75,0,6.25,3.749,10Z'
                            />
                        </svg>

                        <svg className="navigation__logout" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22.368 24.1'>
                            <defs />
                            <g id='logout' transform='translate(-17.6)'>
                                <g id='Group_284' data-name='Group 284' transform='translate(17.6)'>
                                    <g id='Group_283' data-name='Group 283'>
                                        <path id='Path_1366' data-name='Path 1366'  d='M119.8,134.026l-.01.01a.374.374,0,0,0-.039.054s0,.01-.01.015-.025.039-.034.059a.017.017,0,0,1,0,.01c-.01.02-.02.039-.03.064,0,0,0,0,0,.01s-.015.044-.025.069c0,0,0,.01,0,.01a.345.345,0,0,0-.015.069.044.044,0,0,1,0,.025c0,.02,0,.039-.01.059a.712.712,0,0,0,0,.167.247.247,0,0,0,.01.059.044.044,0,0,0,0,.025c0,.025.01.044.015.069,0,0,0,.01,0,.01a.387.387,0,0,0,.025.069s0,0,0,.01.02.044.03.064a.017.017,0,0,0,0,.01.367.367,0,0,0,.034.059s0,.01.01.015a.514.514,0,0,0,.039.054l.01.01a.7.7,0,0,0,.059.064l4.865,4.86a.845.845,0,0,0,1.2-1.2l-3.424-3.424H136.1a.844.844,0,1,0,0-1.687H122.488l3.4-3.4a.844.844,0,1,0-1.19-1.2l-4.836,4.836C119.836,133.986,119.816,134.006,119.8,134.026Z'
                                        transform='translate(-119.6 -122.509)' />
                                        <path id='Path_1367' data-name='Path 1367' d='M24.743,22.413h-6.3a.844.844,0,1,0,0,1.687h6.3a4.587,4.587,0,0,0,4.58-4.58V4.58A4.587,4.587,0,0,0,24.743,0H18.549a.844.844,0,1,0,0,1.687h6.193A2.9,2.9,0,0,1,27.636,4.58V19.52A2.9,2.9,0,0,1,24.743,22.413Z'
                                        transform='translate(-6.954)' />
                                    </g>
                                </g>
                            </g>
                        </svg>
                        
                    </div>
                }
                
            </nav>
        );
    }
}