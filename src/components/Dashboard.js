import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import Histories from './Histories';
import axios from 'axios';


export default class Dashboard extends React.Component {

    DASHBOARD = 0;
    HISTORY = 1;
    NOTIFICATIONS = 2;

    state = {
        editMode: false,
        user: {
            id: 1,
            name: 'محمد قاسمی',
            email: 'amir.mohseni7697@gmail.com',
            phone: '09132669877',
            zipCode: '991786542',
            state: 'تهران',
            city: 'تهران',
            profilePic: 'img/pic-5.png',
            address: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است'
        },
        news: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
        currentPassValid: false,
        currentPassTouched: false,
        newPassValid: false,
        newPassTouched: false,
        newPassConfirmValid: false,
        newPassConfirmTouched: false,
        
        path: this.DASHBOARD,

        activePurchases: [
            {
                id: "2354849",
                titles: ['عنوان محصول اول', 'عنوان محصول دوم'],
                // between 0 to 3
                status: 1
            },
            {
                id: "5851721",
                titles: ['عنوان محصول اول', 'عنوان محصول دوم', 'عنوان محصول سوم'],
                // between 0 to 3
                status: 2
            },
        ]
    }

    changePassClickHandler = e => {
        e.preventDefault();
        if (this.state.currentPassValid && this.state.newPassValid && this.state.newPassConfirmValid) {
            console.log('send request to change password!');
        }
    }

    changePassJSX = (
        <form className="dashboard__change-pass-form">
            <label htmlFor="prev-pass" className="label">رمز عبور فعلی</label>
            <input type="password" className="input input--tertiary mg-bottom-md" id="prev-pass" required/>
            <label htmlFor="new-pass" className="label">رمز عبور جدید</label>
            <input type="password" className="input input--tertiary mg-bottom-md" id="new-pass" required/>
            <label htmlFor="new-pass-confirmation" className="label">تکرار رمز عبور جدید</label>
            <input type="password" className="input input--tertiary mg-bottom-md" id="new-pass-confirmation" required/>
            <button type="submit" class="btn btn--tall btn--no-up-animation btn--outline-dark" onClick={this.changePassClickHandler}>ثبت</button>
        </form>
    )

    editClickHandler = e => {
        this.setState(() => ({editMode: !this.state.editMode}));
    }

    inputOnChangeHandle = e => {
        const value = e.target.value;
        if (e.target.classList.contains('dashboard__info-input--name')) {
            this.setState(prev => ({
                user: {
                    ...prev.user,
                    name: value
                }
            }));
        } else if (e.target.classList.contains('dashboard__info-input--email')) {
            this.setState(prev => ({
                user: {
                    ...prev.user,
                    email: value
                }
            }));
        } else if (e.target.classList.contains('dashboard__info-input--phone')) {
            this.setState(prev => ({
                user: {
                    ...prev.user,
                    phone: value
                }
            }));
        } else if (e.target.classList.contains('dashboard__info-input--zip-code')) {
            this.setState(prev => ({
                user: {
                    ...prev.user,
                    zipCode: value
                }
            }));
        } else if (e.target.classList.contains('dashboard__info-input--address')) {
            this.setState(prev => ({
                user: {
                    ...prev.user,
                    address: value
                }
            }));
        } else if (e.target.classList.contains('dashboard__info-input--state')) {
            this.setState(prev => ({
                user: {
                    ...prev.user,
                    state: value
                }
            }));
        } else if (e.target.classList.contains('dashboard__info-input--city')) {
            this.setState(prev => ({
                user: {
                    ...prev.user,
                    city: value
                }
            }));
        }
    }

    activePurchaceTitleMaker(titles) {
        let res = '';
        if (titles.length > 2) {
            res = `... ${titles[0]} و ${titles[1]} و`;
        } else {
            titles.forEach(cur => res.length > 2 ? res = res + cur : res =  cur + ' و ');
        }
        return res;
    }

    updatePath = e => {
        let path = this.props.location.pathname.split('/')[2];
        switch (path) {
            case undefined:
                path = this.DASHBOARD;
                break;
            case 'notifications':
                path = this.NOTIFICATIONS;
                break;
            case 'histories':
                path = this.HISTORY;
                break;
        }
        this.setState(() => ({ path }));
    }

    componentDidMount() {
        this.updatePath();
    }

    componentWillMount() {
        const bind = this;
        const token = JSON.parse(localStorage.getItem('token'));
        console.log(token);
        axios({
            method: 'get',
            header: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            url: '/api/users/'
        }).then(function (response) {
            if (response.status === 200) {
                const temp = response.data.data;
                
                const item = {
                    id: temp.id,
                    name: temp.name,
                    email: temp.email,
                    phone: temp.phone,
                    zipCode: temp.zip_code,
                    state: temp.state,
                    city: temp.city,
                    address: temp.address,
                    profilePic: temp.profile_pic
                }

                bind.setState(() => ({user: item}));
            } else {
                bind.setState(() => ({error: true}));
            }
        }).catch(function(error) {
            if (error.status === 401)
            return bind.props.history.push('/');
        });
    }

    render(){

        const style = {
            backgroundImage: this.state.user.profilePic
        }

        return (
            <div className="dashboard">
                <Navigation light={true} logged={true} avatar={'img/pic-5.png'}/>
                <div className="news">
                    <p className="news__title">
                    :آخرین اطلاعیه های سایت
                    </p>
                    <p className="news__text">{this.state.news}</p>
                </div>

                <ul className="dashboard__nav">
                    <Link to="/dashboard">
                        <li className="dashboard__nav-item">
                            <svg className="dashboard__nav-icon" id='Capa_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                <path d='M435.143,129.356c-6.796-6.795-17.463-7.797-25.407-2.384c-29.926,20.398-180.03,122.969-196.162,139.1 c-23.394,23.395-23.394,61.459,0,84.854c11.697,11.696,27.063,17.545,42.427,17.545c15.364,0,30.729-5.849,42.427-17.545 c16.131-16.132,118.701-166.236,139.1-196.162C442.939,146.821,441.938,136.153,435.143,129.356z M270.142,322.641 c-7.797,7.799-20.486,7.799-28.283,0c-7.798-7.797-7.799-20.482-0.004-28.28c6.268-6.194,48.885-36.588,101.319-73.035 C306.728,273.76,276.334,316.375,270.142,322.641z'
                                />
                                <path d='M92.231,401.523l-24.69,12.044C49.475,381.325,40,345.338,40,308.499c0-26.991,4.977-52.842,14.06-76.683l28.291,13.57 c2.79,1.338,5.735,1.972,8.636,1.972c7.453,0,14.608-4.185,18.047-11.355c4.776-9.959,0.576-21.906-9.384-26.683l-27.932-13.398 c34.717-56.62,94.784-96.095,164.283-102.505v30.081c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V93.402 c23.828,2.169,46.884,8.237,68.771,18.117c10.065,4.545,21.912,0.066,26.457-9.999c4.545-10.068,0.068-21.913-10-26.458 C328.063,60.091,292.659,52.499,256,52.499c-68.38,0-132.667,26.628-181.02,74.98C26.629,175.832,0,240.119,0,308.499 c0,50.53,14.998,99.674,43.373,142.115c3.822,5.715,10.141,8.886,16.639,8.886c2.954,0,5.946-0.655,8.757-2.026l41-20 c9.928-4.843,14.05-16.816,9.207-26.744C114.133,400.803,102.159,396.682,92.231,401.523z'
                                />
                                <path d='M489.436,203.271c-4.544-10.067-16.387-14.547-26.458-10c-10.067,4.545-14.544,16.39-9.999,26.457 C465.601,247.686,472,277.553,472,308.499c0,36.894-9.506,72.939-27.625,105.218l-25.777-12.275 c-9.971-4.748-21.906-0.515-26.656,9.459c-4.749,9.972-0.514,21.907,9.459,26.656l42,20c2.763,1.315,5.692,1.944,8.588,1.944 c6.5,0,12.82-3.175,16.637-8.886C497.002,408.173,512,359.029,512,308.499C512,271.84,504.408,236.436,489.436,203.271z'
                                />
                            </svg>
                            <span className="dashboard__nav-text">داشبورد</span>
                        </li>
                    </Link>

                    <Link to="/dashboard/histories">
                        <li className="dashboard__nav-item">
                            <svg className="dashboard__nav-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'>
                                <defs />
                                <g id='order' transform='translate(-.001)'>
                                    <path id='Path_1385' data-name='Path 1385' d='M17.728,34.087H15.97V30.539H13.7v3.548H11.945V30.539H9.677v3.548H7.919V30.539H5.652v3.548H3.894V30.539H0V58.75H21.621V30.539H17.728ZM6.087,52.55l-1.91-2.283,1.348-1.128.744.889,1.822-1.633L9.264,49.7Zm0-5.054-1.91-2.284,1.348-1.128.744.889,1.822-1.633L9.264,44.65Zm0-5.054-1.91-2.284L5.525,39.03l.744.889,1.822-1.633L9.264,39.6Zm11.295,9.131h-6.8V49.815h6.8Zm0-5.054h-6.8V44.761h6.8Zm0-5.054h-6.8V39.707h6.8Zm0,0'
                                    transform='translate(0 -28.75)' />
                                    <path id='Path_1386' data-name='Path 1386' d='M66.449,0h1.758V1.789H66.449Zm0,0'
                                    transform='translate(-62.555)' />
                                    <path id='Path_1387' data-name='Path 1387' d='M135.148,0h1.758V1.789h-1.758Zm0,0'
                                    transform='translate(-127.229)' />
                                    <path id='Path_1388' data-name='Path 1388' d='M203.852,0h1.758V1.789h-1.758Zm0,0'
                                    transform='translate(-191.907)' />
                                    <path id='Path_1389' data-name='Path 1389' d='M272.551,0h1.758V1.789h-1.758Zm0,0'
                                    transform='translate(-256.581)' />
                                    <path id='Path_1390' data-name='Path 1390' d='M404.438,26.481h6.3v4.811h-6.3Zm0,0'
                                    transform='translate(-380.74 -24.929)' />
                                    <path id='Path_1391' data-name='Path 1391' d='M404.438,414.55l2.632,4.265h1.038l2.633-4.265v-1.534h-6.3Zm0,0'
                                    transform='translate(-380.74 -388.815)' />
                                    <path id='Path_1392' data-name='Path 1392' d='M404.438,138.59h6.3v14.322h-6.3Zm0,0'
                                    transform='translate(-380.74 -130.469)' />
                                </g>
                            </svg>
                            <span className="dashboard__nav-text">سفارش ها شما</span>
                        </li>
                    </Link>

                    <Link to="/dashboard/notifications">
                        <li className="dashboard__nav-item">
                            <svg className="dashboard__nav-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 25'>
                                <defs />
                                <path id='Path_1341' data-name='Path 1341' d='M24.631,17.866c-2.94-2.941-3.383-4.417-3.383-9.116a8.748,8.748,0,1,0-17.5,0,14.782,14.782,0,0,1-.416,4.641A10.72,10.72,0,0,1,.368,17.866,1.25,1.25,0,0,0,1.252,20H8.188l-.063.625a4.374,4.374,0,1,0,8.748,0L16.811,20h6.937A1.25,1.25,0,0,0,24.631,17.866ZM12.5,23.75a3.125,3.125,0,0,1-3.125-3.125L9.439,20h6.123l.064.625A3.125,3.125,0,0,1,12.5,23.75Zm-11.248-5C5,15,5,12.5,5,8.75a7.5,7.5,0,1,1,15,0c0,3.75,0,6.25,3.749,10Z'
                                />
                            </svg>
                            <span className="dashboard__nav-text">اعلان های شما</span>
                        </li>
                    </Link>

                    <li className="dashboard__nav-item">
                        <svg className="dashboard__nav-icon" viewBox='-15 -35 493.33522 493' xmlns='http://www.w3.org/2000/svg'>
                            <path d='m412.902344-1.105469h-167.617188c-27.550781 0-50.074218 22.824219-50.074218 50.371094v44.515625c0 6.898438 5.59375 12.488281 12.492187 12.488281s12.488281-5.589843 12.488281-12.488281v-44.515625c.035156-13.890625 11.203125-25.191406 25.09375-25.390625h167.617188c13.777344 0 24.617187 11.617188 24.617187 25.390625v322.980469c.164063 13.691406-10.800781 24.921875-24.492187 25.082031h-167.738282c-13.835937-.050781-25.039062-11.25-25.097656-25.082031v-43.585938c0-6.902344-5.589844-12.492187-12.488281-12.492187s-12.492187 5.589843-12.492187 12.492187v43.585938c.074218 27.625 22.449218 49.996094 50.074218 50.0625h167.617188c27.496094-.101563 49.707031-22.484375 49.597656-49.984375v-323.058594c0-27.546875-22.046875-50.371094-49.597656-50.371094zm0 0'
                            />
                            <path d='m42.871094 223.71875h295.601562c6.898438 0 12.492188-5.59375 12.492188-12.492188 0-6.894531-5.59375-12.488281-12.492188-12.488281h-298.375l64.082032-74.074219c4.519531-5.253906 3.957031-13.167968-1.246094-17.734374-5.191406-4.539063-13.078125-4.011719-17.613282 1.175781v.007812l-80.773437 93.035157c-2.976563 2.449218-4.652344 6.136718-4.54296875 9.984374.11718775 3.855469 2.00781275 7.441407 5.12890575 9.707032l80.78125 80.78125c4.878907 4.878906 12.789063 4.878906 17.660157 0 4.816406-4.726563 4.890625-12.453125.167969-17.269532-.054688-.050781-.109376-.105468-.167969-.160156zm0 0'
                            />
                        </svg>
                        <span className="dashboard__nav-text">خروج</span>
                    </li>
                </ul>

                {
                this.state.path === this.DASHBOARD &&
                <div className="dashboard__container">
                    <div className="dashboard__card dashboard__card--info">
                        <h2 className="dashboard__card-title">اطلاعات شخصی</h2>
                        <div onClick={this.editClickHandler} className="dashboard__edit-box">
                            {
                                !this.state.editMode
                                ? (<svg className="dashboard__edit-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 24.878'>
                                    <defs />
                                    <path id='Path_1342' data-name='Path 1342' d='M15.546,5.441l5.086,5.086L7.759,23.4,2.676,18.314Zm8.945-1.227L22.223,1.946a2.251,2.251,0,0,0-3.179,0L16.871,4.119,21.957,9.2,24.491,6.67A1.734,1.734,0,0,0,24.491,4.214ZM.015,25.462a.579.579,0,0,0,.7.688l5.667-1.374L1.3,19.691Z'
                                    transform='translate(-.001 -1.289)' />
                                </svg>)
                                : (<svg className="dashboard__edit-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 89.331 64.278'>
                                    <defs />
                                    <path id='checked_1_'  className='cls-1' d='M32.139,124.109a7.061,7.061,0,0,1-5.01-2.075L2.076,96.98A7.086,7.086,0,0,1,12.1,86.959L32.139,107l45.1-45.1a7.086,7.086,0,1,1,10.02,10.021L37.15,122.034A7.067,7.067,0,0,1,32.139,124.109Z'
                                    transform='translate(0 -59.831)' />
                                </svg>)
                            }
                            
                            {
                                !this.state.editMode
                                ? (<p className="dashboard__edit-text">ویرایش</p>)
                                : (<p className="dashboard__edit-text">ثبت تغییرات</p>)
                            }
                        </div>

                        <form className="dashboard__avatar-form">
                            <label className="dashboard__avatar" style={style} htmlFor="avatar">
                                <svg className="dashboard__avatar-icon" id='Capa_1' xmlns='http://www.w3.org/2000/svg' width='475.078' height='475.077'
                                    viewBox='0 0 475.078 475.077'>
                                        <path d='M467.081,327.767c-5.321-5.331-11.797-7.994-19.411-7.994h-121.91c-3.994,10.657-10.705,19.411-20.126,26.262 c-9.425,6.852-19.938,10.28-31.546,10.28h-73.096c-11.609,0-22.126-3.429-31.545-10.28c-9.423-6.851-16.13-15.604-20.127-26.262 H27.408c-7.612,0-14.083,2.663-19.414,7.994C2.664,333.092,0,339.563,0,347.178v91.361c0,7.61,2.664,14.089,7.994,19.41 c5.33,5.329,11.801,7.991,19.414,7.991h420.266c7.61,0,14.086-2.662,19.41-7.991c5.332-5.328,7.994-11.8,7.994-19.41v-91.361 C475.078,339.563,472.416,333.099,467.081,327.767z M360.025,423.978c-3.621,3.617-7.905,5.428-12.854,5.428 s-9.227-1.811-12.847-5.428c-3.614-3.613-5.421-7.898-5.421-12.847s1.807-9.236,5.421-12.847c3.62-3.613,7.898-5.428,12.847-5.428 s9.232,1.814,12.854,5.428c3.613,3.61,5.421,7.898,5.421,12.847S363.638,420.364,360.025,423.978z M433.109,423.978 c-3.614,3.617-7.898,5.428-12.848,5.428c-4.948,0-9.229-1.811-12.847-5.428c-3.613-3.613-5.42-7.898-5.42-12.847 s1.807-9.236,5.42-12.847c3.617-3.613,7.898-5.428,12.847-5.428c4.949,0,9.233,1.814,12.848,5.428 c3.617,3.61,5.427,7.898,5.427,12.847S436.729,420.364,433.109,423.978z'
                                        />
                                        <path d='M109.632,173.59h73.089v127.909c0,4.948,1.809,9.232,5.424,12.847c3.617,3.613,7.9,5.427,12.847,5.427h73.096 c4.948,0,9.227-1.813,12.847-5.427c3.614-3.614,5.421-7.898,5.421-12.847V173.59h73.091c7.997,0,13.613-3.809,16.844-11.42 c3.237-7.422,1.902-13.99-3.997-19.701L250.385,14.562c-3.429-3.617-7.706-5.426-12.847-5.426c-5.136,0-9.419,1.809-12.847,5.426 L96.786,142.469c-5.902,5.711-7.233,12.275-3.999,19.701C96.026,169.785,101.64,173.59,109.632,173.59z'
                                    />
                                </svg>
                                <span className="dashboard__avatar-text">تصویر جدید</span>
                            </label>
                            <input id="avatar" type="file" className="no-display"/>
                        </form> 

                        
                        <label className="dashboard__label dashboard__label--right">نام و نام خانوادگی</label>

                        {
                            !this.state.editMode
                            ? (<p className="dashboard__info dashboard__info--name">{this.state.user.name}</p>)
                            : (<input type="text" value={this.state.user.name} className="dashboard__info-input dashboard__info-input--name" onChange={this.inputOnChangeHandle}/>)
                        }

                        <label className="dashboard__label dashboard__label--right">آدرس ایمیل</label>

                        {
                            !this.state.editMode
                            ? (<p className="dashboard__info dashboard__info--email">{this.state.user.email}</p>)
                            : (<input type="email" value={this.state.user.email} className="dashboard__info-input dashboard__info-input--email" onChange={this.inputOnChangeHandle}/>)
                        }

                        <label className="dashboard__label dashboard__label--left">استان</label>

                        {
                            !this.state.editMode
                            ? (<p className="dashboard__info dashboard__info--state">{this.state.user.state}</p>)
                            : (<input type="text" value={this.state.user.state} className="dashboard__info-input dashboard__info-input--state" onChange={this.inputOnChangeHandle}/>)
                        }
                        
                        <label className="dashboard__label dashboard__label--right">شماره موبایل</label>
                        
                        {
                            !this.state.editMode
                            ? (<p className="dashboard__info dashboard__info--phone">{this.state.user.phone}</p>)
                            : (<input type="phone" value={this.state.user.phone} className="dashboard__info-input dashboard__info-input--phone" onChange={this.inputOnChangeHandle}/>)
                        }

                        <label className="dashboard__label dashboard__label--left">شهر</label>
                        
                        {
                            !this.state.editMode
                            ? (<p className="dashboard__info dashboard__info--city">{this.state.user.city}</p>)
                            : (<input type="text" value={this.state.user.city} className="dashboard__info-input dashboard__info-input--city" onChange={this.inputOnChangeHandle}/>)
                        }
                        
                        <label className="dashboard__label dashboard__label--right">کد پستی</label>
                        
                        {
                            !this.state.editMode
                            ? (<p className="dashboard__info dashboard__info--zip-code">{this.state.user.zipCode}</p>)
                            : (<input type="text" value={this.state.user.zipCode} className="dashboard__info-input dashboard__info-input--zip-code" onChange={this.inputOnChangeHandle}/>)
                        }
                        
                        <label className="dashboard__label dashboard__label--right">آدرس</label>
                        
                        {
                            !this.state.editMode
                            ? (<p className="dashboard__info dashboard__info--address">{this.state.user.address}</p>)
                            : (<input type="text" value={this.state.user.address} className="dashboard__info-input dashboard__info-input--address" onChange={this.inputOnChangeHandle}/>)
                        }

                        <div className="dashboard__pass-box" id="change-pass">
                            <svg className="dashboard__pass-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                                <defs />
                                <path id='Path_1368' data-name='Path 1368' d='M18.116,1.884A6.442,6.442,0,0,0,7.431,8.426L.173,15.684A.585.585,0,0,0,0,16.1v3.315A.586.586,0,0,0,.587,20H3.9a.585.585,0,0,0,.414-.172L5.144,19a.586.586,0,0,0,.168-.482l-.1-.89,1.234-.116a.585.585,0,0,0,.528-.528l.116-1.234.89.1a.577.577,0,0,0,.457-.144.587.587,0,0,0,.2-.438V14.179H9.7a.585.585,0,0,0,.414-.172l1.5-1.483A6.345,6.345,0,0,0,18.116,11,6.452,6.452,0,0,0,18.116,1.884ZM16.458,6.028a1.758,1.758,0,1,1,0-2.486A1.759,1.759,0,0,1,16.458,6.028Z'
                                transform='translate(-.001 .001)' />
                            </svg>

                            <p className="dashboard__pass-text">تغییر رمز عبور</p>
                        </div>

                        
                        
                    </div>

                    <div className="dashboard__card dashboard__card--notifs">
                        <h2 className="dashboard__card-title dashboard__card-title--light mg-bottom-md">آخرین اعلان های شما</h2>
                        <div className="dashboard__notifs-container">
                            <div className="dashboard__notif-container">
                                <p className="dashboard__notif-text">سفارش شما ارسال شده است</p>
                                <p className="dashboard__notif-date">امروز ساعت 22:10</p>
                            </div>

                            <div className="dashboard__notif-container">
                                <p className="dashboard__notif-text">سفارش شما با موفقیت ثبت شد</p>
                                <p className="dashboard__notif-date">دیروز ساعت 20:50</p>
                            </div>
                        </div>
                        <Link to="/dashboard/notifications" className="margin-top-auto">
                            <button className="btn btn--stretch-x btn--no-up-animation btn--outline">مشاهده همه</button>
                        </Link>
                    </div>


                    <div className="dashboard__card dashboard__card--history">
                        <h2 className="dashboard__card-title mg-bottom-md">سفارش های شما</h2>
                        <div className="dashboard__orders-container">
                            <div className="dashboard__order-container">
                                <p className="dashboard__order-text">لورم ایپسوم متنی ساختگی جهت استفاده</p>
                                <p className="dashboard__order-state">در حال بررسی</p>
                            </div>

                            <div className="dashboard__order-container">
                                <p className="dashboard__order-text">طراحان و چاپگرها و متون بلکه روزنامه و مجله</p>
                                <p className="dashboard__order-state">ارسال شده</p>
                            </div>

                            <div className="dashboard__order-container">
                                <p className="dashboard__order-text">در ستون و سطرآنچنان</p>
                                <p className="dashboard__order-state">تحویل داده شده</p>
                            </div>

                            <div className="dashboard__order-container">
                                <p className="dashboard__order-text">که لازم است و برای شرایط فعلی تکنولوژی</p>
                                <p className="dashboard__order-state">تحویل داده شده</p>
                            </div>

                            <div className="dashboard__order-container">
                                <p className="dashboard__order-text">مورد نیاز و کاربردهای متنوع با هدف</p>
                                <p className="dashboard__order-state">تحویل داده شده</p>
                            </div>

                            <div className="dashboard__order-container">
                                <p className="dashboard__order-text">هبود ابزارهای کاربردی می باشد</p>
                                <p className="dashboard__order-state">تحویل داده شده</p>
                            </div>
                        </div>
                        <Link to="/dashboard/histories">
                            <button className="btn btn--stretch-x btn--no-up-animation btn--outline-dark">مشاهده همه</button>
                        </Link>
                    </div>

                    {/* <div className="dashboard__card dashboard__card--history">

                    </div> */}

                    {
                        this.state.activePurchases.map(cur => (
                        <div className="dashboard__card dashboard__card--status">
                            <h2 className="dashboard__card-title">#وضعیت سفارش شماره {cur.id}</h2>
                            <h2 className="dashboard__card-subtitle">{this.activePurchaceTitleMaker(cur.titles)}</h2>
                            <div className="dashboard__status-container">

                                <div className={"dashboard__status-box" + (cur.status >= 0 ? ' dashboard__status-box--active' : '')}>
                                    <svg className="dashboard__status-svg" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 146 146'>
                                        <defs />
                                        <g id='Group_306' data-name='Group 306' transform='translate(-1452 -1269)'>
                                            <circle className="dashboard__status-circle" id='Ellipse_163' data-name='Ellipse 163' cx='73'
                                            cy='73' r='73' transform='translate(1452 1269)' />
                                            <path id='checked_1_' data-name='checked (1)' d='M32.139,124.109a7.061,7.061,0,0,1-5.01-2.075L2.076,96.98A7.086,7.086,0,0,1,12.1,86.959L32.139,107l45.1-45.1a7.086,7.086,0,1,1,10.02,10.021L37.15,122.034A7.067,7.067,0,0,1,32.139,124.109Z'
                                            transform='translate(1480 1250.169)' />
                                        </g>
                                    </svg>
                                    <p className="dashboard__status-title">
                                        ثبت شده
                                    </p>
                                </div>

                                <div className={"dashboard__status-box" + (cur.status >= 1 ? ' dashboard__status-box--active' : '')}>
                                    <svg className="dashboard__status-svg" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 170.824 170.907'>
                                    <defs />
                                    <g id='Group_307' data-name='Group 307' transform='translate(-1129.018 -1261.093)'>
                                        <path className="dashboard__status-circle" id='Path_1365' data-name='Path 1365' d='M73,0A73,73,0,1,1,0,73,73,73,0,0,1,73,0Z'
                                        transform='translate(1148 1269)' />
                                        <g id='execution' transform='translate(1128.903 1261.094)'>
                                            <g id='Group_248' data-name='Group 248' transform='translate(.115)'>
                                                <g id='Group_247' data-name='Group 247'>
                                                    <path id='Path_1343' data-name='Path 1343' d='M72.169,30.615l-4.98-2.2c-.226-.836-.471-1.628-.744-2.391l2.768-4.766a2.857,2.857,0,0,0,.022-2.823,37.886,37.886,0,0,0-4.855-6.786,2.834,2.834,0,0,0-2.765-.878l-5.239,1.2q-.916-.731-1.912-1.41l-.507-5.546a2.854,2.854,0,0,0-1.644-2.327A36.232,36.232,0,0,0,44.5.064a2.839,2.839,0,0,0-2.748.931L38.091,5.24H35.9L32.238.995A2.835,2.835,0,0,0,29.49.064a36.271,36.271,0,0,0-7.817,2.625,2.854,2.854,0,0,0-1.644,2.33l-.507,5.543c-.661.452-1.3.923-1.912,1.41l-5.24-1.2a2.831,2.831,0,0,0-2.765.878A37.825,37.825,0,0,0,4.75,18.438a2.857,2.857,0,0,0,.022,2.823L7.54,26.027c-.273.764-.518,1.555-.744,2.391l-4.981,2.2a2.854,2.854,0,0,0-1.7,2.611v7.753a2.853,2.853,0,0,0,1.7,2.611l4.98,2.2c.226.836.471,1.628.744,2.391L4.772,52.943a2.857,2.857,0,0,0-.022,2.823A37.886,37.886,0,0,0,9.6,62.553a2.842,2.842,0,0,0,2.765.878l5.239-1.2q.916.731,1.912,1.41l.507,5.546a2.854,2.854,0,0,0,1.644,2.327,36.231,36.231,0,0,0,7.817,2.625,2.845,2.845,0,0,0,2.748-.931l3.656-4.244h2.2l3.656,4.244a2.849,2.849,0,0,0,2.163.992,2.786,2.786,0,0,0,.585-.061,36.271,36.271,0,0,0,7.817-2.625,2.854,2.854,0,0,0,1.644-2.33l.507-5.543c.661-.452,1.3-.923,1.912-1.41l5.24,1.2a2.838,2.838,0,0,0,2.765-.878,37.825,37.825,0,0,0,4.855-6.786,2.857,2.857,0,0,0-.022-2.823l-2.768-4.766c.273-.764.518-1.555.744-2.391l4.98-2.2a2.854,2.854,0,0,0,1.7-2.611V33.226A2.851,2.851,0,0,0,72.169,30.615ZM68.162,39.12,63.606,41.13A2.858,2.858,0,0,0,61.978,43.1a26.229,26.229,0,0,1-1.321,4.233,2.857,2.857,0,0,0,.167,2.525l2.611,4.5A32.36,32.36,0,0,1,61.2,57.48L56.27,56.352a2.829,2.829,0,0,0-2.528.641,26.042,26.042,0,0,1-3.5,2.589A2.851,2.851,0,0,0,48.9,61.747l-.479,5.237a31.567,31.567,0,0,1-3.489,1.184L41.56,64.25a2.856,2.856,0,0,0-2.163-.992H34.587a2.857,2.857,0,0,0-2.163.992l-3.375,3.918a31.612,31.612,0,0,1-3.492-1.184l-.479-5.242a2.857,2.857,0,0,0-1.338-2.162,25.724,25.724,0,0,1-3.5-2.586,2.831,2.831,0,0,0-2.528-.641l-4.933,1.129a32.421,32.421,0,0,1-2.232-3.119l2.611-4.5a2.858,2.858,0,0,0,.167-2.525A26.23,26.23,0,0,1,12.007,43.1a2.857,2.857,0,0,0-1.628-1.973L5.822,39.12V35.085l4.557-2.009A2.858,2.858,0,0,0,12.007,31.1a26.23,26.23,0,0,1,1.321-4.233,2.857,2.857,0,0,0-.167-2.525l-2.611-4.5a32.356,32.356,0,0,1,2.232-3.119l4.933,1.129a2.84,2.84,0,0,0,2.528-.641,26.042,26.042,0,0,1,3.5-2.589,2.851,2.851,0,0,0,1.338-2.165l.479-5.237a31.566,31.566,0,0,1,3.489-1.184l3.375,3.918a2.856,2.856,0,0,0,2.163.992H39.4a2.858,2.858,0,0,0,2.163-.992l3.375-3.918a31.612,31.612,0,0,1,3.492,1.184l.479,5.242a2.857,2.857,0,0,0,1.338,2.162,25.724,25.724,0,0,1,3.5,2.586,2.838,2.838,0,0,0,2.528.641L61.2,16.724a32.358,32.358,0,0,1,2.232,3.119l-2.611,4.5a2.858,2.858,0,0,0-.167,2.525A26.23,26.23,0,0,1,61.977,31.1a2.857,2.857,0,0,0,1.628,1.973l4.557,2.009V39.12Z'
                                                    transform='translate(-.115 -.001)' />
                                                </g>
                                            </g>
                                            <g id='Group_250' data-name='Group 250' transform='translate(17.015 17.124)'>
                                                <g id='Group_249' data-name='Group 249'>
                                                    <path id='Path_1344' data-name='Path 1344' d='M67.468,48.005A19.977,19.977,0,1,0,87.445,67.982,19.977,19.977,0,0,0,67.468,48.005Zm0,34.246A14.269,14.269,0,1,1,81.737,67.982,14.269,14.269,0,0,1,67.468,82.251Z'
                                                    transform='translate(-47.491 -48.005)' />
                                                </g>
                                            </g>
                                            <g id='Group_252' data-name='Group 252' transform='translate(108.522 -.001)'>
                                                <g id='Group_251' data-name='Group 251'>
                                                    <path id='Path_1345' data-name='Path 1345' d='M364.721,25.552l-3.941-1.739c-.153-.552-.32-1.081-.5-1.6l2.2-3.785a2.862,2.862,0,0,0,.022-2.826,32.256,32.256,0,0,0-4.108-5.738,2.834,2.834,0,0,0-2.762-.878l-4.147.947q-.611-.477-1.254-.925l-.4-4.4a2.849,2.849,0,0,0-1.644-2.33A30.9,30.9,0,0,0,341.564.062a2.835,2.835,0,0,0-2.748.931l-2.9,3.372h-1.393l-2.9-3.372a2.831,2.831,0,0,0-2.748-.931,30.884,30.884,0,0,0-6.619,2.221,2.849,2.849,0,0,0-1.644,2.33l-.4,4.4q-.644.447-1.254.925L314.8,8.989a2.84,2.84,0,0,0-2.762.878,32.042,32.042,0,0,0-4.105,5.741,2.857,2.857,0,0,0,.022,2.823l2.194,3.782q-.268.773-.5,1.6l-3.941,1.739a2.851,2.851,0,0,0-1.7,2.611v6.46a2.851,2.851,0,0,0,1.7,2.611l3.941,1.739c.153.552.32,1.081.5,1.6l-2.2,3.785a2.862,2.862,0,0,0-.022,2.826,32.237,32.237,0,0,0,4.108,5.738,2.838,2.838,0,0,0,2.765.878l4.141-.95c.407.32.828.63,1.257.928l.4,4.4a2.849,2.849,0,0,0,1.644,2.33,30.9,30.9,0,0,0,6.619,2.221,2.843,2.843,0,0,0,2.748-.931l2.9-3.372h1.393l2.9,3.372a2.849,2.849,0,0,0,2.163.992,2.786,2.786,0,0,0,.585-.061,30.877,30.877,0,0,0,6.619-2.221,2.849,2.849,0,0,0,1.644-2.33l.4-4.4q.644-.447,1.254-.925l4.147.947a2.839,2.839,0,0,0,2.762-.878,32.261,32.261,0,0,0,4.108-5.738,2.862,2.862,0,0,0-.022-2.826l-2.2-3.785c.178-.515.346-1.045.5-1.6l3.941-1.739a2.851,2.851,0,0,0,1.7-2.611v-6.46A2.851,2.851,0,0,0,364.721,25.552Zm-4.005,7.213-3.514,1.55a2.844,2.844,0,0,0-1.63,1.979,21.309,21.309,0,0,1-1.076,3.442,2.863,2.863,0,0,0,.167,2.528l2.032,3.5q-.69,1.07-1.488,2.085l-3.824-.875a2.824,2.824,0,0,0-2.522.641,21.125,21.125,0,0,1-2.848,2.1,2.857,2.857,0,0,0-1.343,2.168l-.371,4.075c-.766.3-1.536.563-2.3.781l-2.614-3.035a2.855,2.855,0,0,0-2.163-.992h-4.008a2.857,2.857,0,0,0-2.163.992l-2.614,3.035c-.766-.217-1.536-.479-2.3-.781l-.371-4.075a2.856,2.856,0,0,0-1.343-2.168,20.942,20.942,0,0,1-2.846-2.1,2.871,2.871,0,0,0-2.528-.644l-3.821.875c-.532-.672-1.028-1.368-1.488-2.082l2.032-3.5a2.864,2.864,0,0,0,.167-2.528,21.32,21.32,0,0,1-1.076-3.442,2.845,2.845,0,0,0-1.63-1.979l-3.514-1.55V30.023l3.514-1.55a2.844,2.844,0,0,0,1.63-1.979,21.469,21.469,0,0,1,1.076-3.447,2.857,2.857,0,0,0-.167-2.525l-2.029-3.5c.457-.711.953-1.407,1.485-2.082l3.824.875a2.838,2.838,0,0,0,2.522-.641,21.125,21.125,0,0,1,2.848-2.1,2.857,2.857,0,0,0,1.343-2.168l.371-4.075c.766-.3,1.536-.563,2.3-.781l2.614,3.035a2.856,2.856,0,0,0,2.163.992h4.008a2.856,2.856,0,0,0,2.163-.992L342,6.046c.766.217,1.536.479,2.3.781l.371,4.075a2.856,2.856,0,0,0,1.343,2.168,21.127,21.127,0,0,1,2.848,2.1,2.833,2.833,0,0,0,2.522.641l3.824-.875q.8,1.012,1.488,2.085l-2.032,3.5a2.864,2.864,0,0,0-.167,2.528,21.32,21.32,0,0,1,1.076,3.442,2.845,2.845,0,0,0,1.63,1.979l3.514,1.55Z'
                                                    transform='translate(-304.007 .001)' />
                                                </g>
                                            </g>
                                            <g id='Group_254' data-name='Group 254' transform='translate(125.461 17.124)'>
                                                <g id='Group_253' data-name='Group 253'>
                                                    <path id='Path_1346' data-name='Path 1346' d='M365.76,48.005a14.269,14.269,0,1,0,14.269,14.269A14.269,14.269,0,0,0,365.76,48.005Zm0,22.831a8.562,8.562,0,1,1,8.562-8.562A8.561,8.561,0,0,1,365.76,70.836Z'
                                                    transform='translate(-351.491 -48.005)' />
                                                </g>
                                            </g>
                                            <g id='Group_256' data-name='Group 256' transform='translate(85.833 85.942)'>
                                                <g id='Group_255' data-name='Group 255'>
                                                    <path id='Path_1347' data-name='Path 1347' d='M323.1,275.74l-4.136-.87c-.17-.716-.362-1.433-.577-2.143l3.172-2.843a2.852,2.852,0,0,0,.722-3.244,42.883,42.883,0,0,0-5.242-8.98,2.864,2.864,0,0,0-3.172-.995l-3.988,1.31c-.507-.538-1.034-1.064-1.572-1.572l1.31-3.985a2.853,2.853,0,0,0-.992-3.169A42.71,42.71,0,0,0,299.642,244a2.868,2.868,0,0,0-3.244.722l-2.843,3.174c-.711-.217-1.427-.41-2.143-.58l-.87-4.136a2.855,2.855,0,0,0-2.793-2.266h-9.732a2.854,2.854,0,0,0-2.792,2.266l-.87,4.136c-.716.17-1.433.362-2.143.577l-2.843-3.172a2.867,2.867,0,0,0-3.244-.722,42.883,42.883,0,0,0-8.98,5.242,2.855,2.855,0,0,0-.995,3.172l1.31,3.988c-.538.507-1.065,1.034-1.572,1.572l-3.985-1.31a2.871,2.871,0,0,0-3.169.992,42.71,42.71,0,0,0-5.248,8.982,2.852,2.852,0,0,0,.722,3.244l3.174,2.843c-.217.711-.41,1.427-.58,2.143l-4.136.87a2.855,2.855,0,0,0-2.266,2.792v9.732a2.854,2.854,0,0,0,2.266,2.793l4.136.87c.17.716.362,1.433.577,2.143l-3.172,2.843a2.852,2.852,0,0,0-.722,3.244,42.883,42.883,0,0,0,5.242,8.98,2.864,2.864,0,0,0,3.172.995l3.988-1.31c.507.538,1.034,1.064,1.572,1.572l-1.31,3.985a2.853,2.853,0,0,0,.992,3.169,42.711,42.711,0,0,0,8.982,5.248,2.844,2.844,0,0,0,3.244-.722l2.843-3.174c.711.217,1.427.41,2.143.58l.87,4.136a2.855,2.855,0,0,0,2.792,2.266h9.732a2.854,2.854,0,0,0,2.792-2.266l.87-4.136c.716-.17,1.433-.362,2.143-.577l2.843,3.172a2.845,2.845,0,0,0,3.244.722,42.884,42.884,0,0,0,8.98-5.242,2.855,2.855,0,0,0,.995-3.172l-1.31-3.988c.538-.507,1.064-1.034,1.572-1.572l3.985,1.31a2.862,2.862,0,0,0,3.169-.992,42.711,42.711,0,0,0,5.248-8.982,2.852,2.852,0,0,0-.722-3.244l-3.174-2.843c.217-.711.41-1.427.58-2.143l4.136-.87a2.855,2.855,0,0,0,2.266-2.793v-9.732A2.855,2.855,0,0,0,323.1,275.74Zm-3.442,10.209-3.693.778a2.854,2.854,0,0,0-2.221,2.285,31.041,31.041,0,0,1-1.341,4.975,2.852,2.852,0,0,0,.783,3.091l2.993,2.681a37.5,37.5,0,0,1-2.522,4.3l-3.771-1.24a2.865,2.865,0,0,0-3.071.867,31.164,31.164,0,0,1-3.651,3.654,2.86,2.86,0,0,0-.864,3.069l1.24,3.768a37.264,37.264,0,0,1-4.3,2.522l-2.684-2.993a2.868,2.868,0,0,0-3.094-.783,30.734,30.734,0,0,1-4.969,1.341,2.854,2.854,0,0,0-2.285,2.221l-.778,3.693h-5.1l-.778-3.693a2.854,2.854,0,0,0-2.285-2.221,31.045,31.045,0,0,1-4.975-1.341h0a2.874,2.874,0,0,0-3.091.783l-2.681,2.993a37.5,37.5,0,0,1-4.3-2.522l1.24-3.771a2.859,2.859,0,0,0-.867-3.071,31.171,31.171,0,0,1-3.654-3.651,2.867,2.867,0,0,0-3.069-.864l-3.768,1.24a37.256,37.256,0,0,1-2.522-4.3l2.993-2.684a2.856,2.856,0,0,0,.783-3.094,30.732,30.732,0,0,1-1.341-4.969,2.854,2.854,0,0,0-2.221-2.285l-3.693-.778v-5.1l3.693-.778a2.854,2.854,0,0,0,2.221-2.285,31.042,31.042,0,0,1,1.341-4.975,2.852,2.852,0,0,0-.783-3.091l-2.993-2.681a37.494,37.494,0,0,1,2.522-4.3l3.771,1.24a2.865,2.865,0,0,0,3.071-.867,31.171,31.171,0,0,1,3.651-3.654,2.86,2.86,0,0,0,.864-3.069l-1.24-3.768a37.259,37.259,0,0,1,4.3-2.522l2.684,2.993a2.863,2.863,0,0,0,3.094.783,30.733,30.733,0,0,1,4.969-1.341,2.854,2.854,0,0,0,2.285-2.221l.778-3.693h5.1l.778,3.693a2.854,2.854,0,0,0,2.285,2.221,31.03,31.03,0,0,1,4.975,1.341,2.857,2.857,0,0,0,3.091-.783l2.681-2.993a37.493,37.493,0,0,1,4.3,2.522L302.3,256.4a2.859,2.859,0,0,0,.867,3.071,31.171,31.171,0,0,1,3.654,3.651,2.879,2.879,0,0,0,3.069.864l3.768-1.24a37.255,37.255,0,0,1,2.522,4.3l-2.993,2.684a2.856,2.856,0,0,0-.783,3.094,30.734,30.734,0,0,1,1.341,4.969,2.854,2.854,0,0,0,2.221,2.285l3.693.778Z'
                                                    transform='translate(-240.402 -240.916)' />
                                                </g>
                                            </g>
                                            <g id='Group_258' data-name='Group 258' transform='translate(102.631 102.74)'>
                                                <g id='Group_257' data-name='Group 257'>
                                                    <path id='Path_1348' data-name='Path 1348' d='M313.176,288.005A25.685,25.685,0,1,0,338.86,313.69,25.685,25.685,0,0,0,313.176,288.005Zm0,45.661a19.977,19.977,0,1,1,19.977-19.977A20,20,0,0,1,313.176,333.667Z'
                                                    transform='translate(-287.491 -288.005)' />
                                                </g>
                                            </g>
                                            <g id='Group_260' data-name='Group 260' transform='translate(79.8 31.394)'>
                                                <g id='Group_259' data-name='Group 259'>
                                                    <rect id='Rectangle_169' data-name='Rectangle 169' width='22.831'
                                                    height='5.708' />
                                                </g>
                                            </g>
                                            <g id='Group_262' data-name='Group 262' transform='translate(14.162 77.055)'>
                                                <g id='Group_261' data-name='Group 261'>
                                                    <path id='Path_1349' data-name='Path 1349' d='M104.9,263.4a2.852,2.852,0,0,0-1.5-1.5h0l-19.977-8.562a2.852,2.852,0,0,0-3.977,2.622v5.708H45.2V216H39.491v48.515a2.852,2.852,0,0,0,2.851,2.854h37.1v5.708a2.852,2.852,0,0,0,2.85,2.854h0a2.812,2.812,0,0,0,1.123-.231l19.977-8.562A2.852,2.852,0,0,0,104.9,263.4Zm-19.747,5.355v-8.467l9.877,4.233Z'
                                                    transform='translate(-39.491 -216.004)' />
                                                </g>
                                            </g>
                                            <g id='Group_264' data-name='Group 264' transform='translate(114.882 118.034)'>
                                                <g id='Group_263' data-name='Group 263'>
                                                    <path id='Path_1350' data-name='Path 1350' d='M344.489,330.88,332.221,345.6l-6.352-6.351-4.035,4.035,8.562,8.562a2.845,2.845,0,0,0,2.018.836c.042,0,.086,0,.128,0a2.858,2.858,0,0,0,2.065-1.023l14.269-17.123Z'
                                                    transform='translate(-321.834 -330.88)' />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                    <p className="dashboard__status-title">
                                    در حال آماده سازی
                                    </p>
                                </div>

                                <div className={"dashboard__status-box" + (cur.status >= 2 ? ' dashboard__status-box--active' : '')}>
                                    <svg className="dashboard__status-svg" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 146 146'>
                                        <defs />
                                        <g id='Group_308' data-name='Group 308' transform='translate(-822 -1269)'>
                                            <circle className="dashboard__status-circle" id='Ellipse_165' data-name='Ellipse 165' cx='73'
                                            cy='73' r='73' transform='translate(822 1269)' />
                                            <g id='shipped' transform='translate(842 1217.279)'>
                                                <g id='Group_266' data-name='Group 266' transform='translate(0 94.062)'>
                                                    <g id='Group_265' data-name='Group 265'>
                                                        <path id='Path_1351' data-name='Path 1351' d='M7.393,120l2.735-10.02A1.553,1.553,0,0,1,8.819,108.5v-1.616c0-3.508,3.116-6.361,6.945-6.361H28.221V97.192a3.287,3.287,0,0,1,3.418-3.13h63.5a3.287,3.287,0,0,1,3.418,3.13v27.465a1.66,1.66,0,0,1-3.307,0V97.192a.106.106,0,0,0-.11-.1h-63.5a.106.106,0,0,0-.11.1v27.466a1.66,1.66,0,0,1-3.307,0v-1.717H8.706a5.384,5.384,0,0,0-5.139,3.433H8.709a1.589,1.589,0,0,1,1.654,1.515v3.231a4.984,4.984,0,0,1-5.181,4.746H3.307v6.664H7.631a10.462,10.462,0,0,1,9.9-6.462,10.462,10.462,0,0,1,9.9,6.462h.8V131.12a1.66,1.66,0,0,1,3.307,0v11.41H65.838a10.81,10.81,0,0,1,19.795,0h9.505a.106.106,0,0,0,.11-.1V139.1H88.083a1.521,1.521,0,1,1,0-3.029h15.875a1.521,1.521,0,1,1,0,3.029h-5.4v3.332a3.287,3.287,0,0,1-3.418,3.13H86.205c0,.034,0,.067,0,.1,0,5.289-4.7,9.593-10.473,9.593s-10.473-4.3-10.473-9.593c0-.034,0-.067,0-.1H28c0,.034,0,.067,0,.1,0,5.289-4.7,9.593-10.473,9.593s-10.473-4.3-10.473-9.593c0-.034,0-.067,0-.1h-5.4A1.589,1.589,0,0,1,0,144.045V127.889A8.245,8.245,0,0,1,7.393,120Zm20.828-16.449H15.764a3.5,3.5,0,0,0-3.638,3.332v.1h16.1Zm0,16.358v-9.9H13.528l-2.7,9.9Zm47.514,32.312c3.951,0,7.166-2.944,7.166-6.563s-3.215-6.563-7.166-6.563-7.166,2.944-7.166,6.563S71.784,152.224,75.736,152.224Zm-58.207,0c3.951,0,7.166-2.944,7.166-6.563s-3.215-6.563-7.166-6.563-7.166,2.944-7.166,6.563S13.577,152.224,17.528,152.224ZM3.307,132.837H5.181a1.8,1.8,0,0,0,1.874-1.717V129.4H3.307v3.433Z'
                                                        transform='translate(0 -94.062)' />
                                                    </g>
                                                </g>
                                                <g id='Group_268' data-name='Group 268' transform='translate(72.318 142.53)'>
                                                    <g id='Group_267' data-name='Group 267'>
                                                        <path id='Path_1352' data-name='Path 1352' d='M131.684,350.6a3.142,3.142,0,1,1-3.418,3.13A3.287,3.287,0,0,1,131.684,350.6Z'
                                                        transform='translate(-128.267 -350.597)' />
                                                    </g>
                                                </g>
                                                <g id='Group_270' data-name='Group 270' transform='translate(14.111 142.53)'>
                                                    <g id='Group_269' data-name='Group 269'>
                                                        <path id='Path_1353' data-name='Path 1353' d='M413.873,350.6a3.142,3.142,0,1,1-3.418,3.13A3.287,3.287,0,0,1,413.873,350.6Z'
                                                        transform='translate(-410.455 -350.597)' />
                                                    </g>
                                                </g>
                                                <g id='Group_272' data-name='Group 272' transform='translate(35.277 136.068)'>
                                                    <g id='Group_271' data-name='Group 271'>
                                                        <path id='Path_1354' data-name='Path 1354' d='M206.881,316.393h24.694a1.521,1.521,0,1,1,0,3.029H206.881a1.521,1.521,0,1,1,0-3.029Z'
                                                        transform='translate(-205.227 -316.393)' />
                                                    </g>
                                                </g>
                                                <g id='Group_274' data-name='Group 274' transform='translate(77.61 129.605)'>
                                                    <g id='Group_273' data-name='Group 273'>
                                                        <path id='Path_1355' data-name='Path 1355' d='M18.756,282.188H39.922a1.521,1.521,0,1,1,0,3.029H18.756a1.521,1.521,0,1,1,0-3.029Z'
                                                        transform='translate(-17.102 -282.188)' />
                                                    </g>
                                                </g>
                                                <g id='Group_276' data-name='Group 276' transform='translate(49.278 108.602)'>
                                                    <g id='Group_275' data-name='Group 275'>
                                                        <path id='Path_1356' data-name='Path 1356' d='M169.637,171.466a1.42,1.42,0,0,0-2.062,0l-12.969,13.469-6.746-7.007a1.42,1.42,0,0,0-2.062,0,1.556,1.556,0,0,0,0,2.142l7.778,8.078a1.42,1.42,0,0,0,2.062,0l14-14.54A1.556,1.556,0,0,0,169.637,171.466Z'
                                                        transform='translate(-145.37 -171.023)' />
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <p className="dashboard__status-title">
                                    ارسال محموله
                                    </p>
                                </div>

                                <div className={"dashboard__status-box" + (cur.status >= 3 ? ' dashboard__status-box--active' : '')}>
                                    <svg className="dashboard__status-svg" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 146 146'>
                                        <defs />
                                        <g id='Group_309' data-name='Group 309' transform='translate(-495 -1269)'>
                                            <circle className="dashboard__status-circle" id='Ellipse_166' data-name='Ellipse 166' cx='73'
                                            cy='73' r='73' transform='translate(495 1269)' />
                                            <g id='product' transform='translate(519.501 1288)'>
                                                <path id='Path_1357' data-name='Path 1357' d='M124.961,60h38.257a3.157,3.157,0,0,1,3.188,3.188v38.47a3.158,3.158,0,0,1-3.188,3.188H124.961a3.157,3.157,0,0,1-3.188-3.188V63.188A3.157,3.157,0,0,1,124.961,60Zm0,0'
                                                transform='translate(-96.676 -47.248)' />
                                                <path id='Path_1358' data-name='Path 1358' d='M.867,245.654l14.665,27.991A22.313,22.313,0,0,0,35.3,285.633H62.015L74.13,297.705a3.425,3.425,0,0,0,2.232.893,3.463,3.463,0,0,0,2.3-.893l15.941-15.9a3.273,3.273,0,0,0,0-4.526L75.724,258.406a15.868,15.868,0,0,0-11.286-4.654H31.281a2.765,2.765,0,0,0-2.423,4.081c1.4,2.742,3.06,5.93,3.634,6.95A3.18,3.18,0,0,0,35.3,266.5h21.68a3.188,3.188,0,0,1,0,6.376H35.3s-6.758-1.977-8.416-5.1L17.063,249.1A15.147,15.147,0,0,0,3.672,241a3.13,3.13,0,0,0-2.678,1.53,3.055,3.055,0,0,0-.127,3.124Zm0,0'
                                                transform='translate(0 -189.777)' />
                                                <path id='Path_1363' data-name='Path 1363' d='M236.337,6.376V0a9.551,9.551,0,0,0-9.564,9.564V22.317a3.188,3.188,0,0,0,6.376,0V9.564A3.157,3.157,0,0,1,236.337,6.376Zm0,0'
                                                transform='translate(-188.924)' />
                                                <path id='Path_1364' data-name='Path 1364' d='M226.773,6.376V0c5.775,0,10.435,4.272,10.435,9.564V22.317a3.492,3.492,0,0,1-6.957,0V9.564A3.31,3.31,0,0,0,226.773,6.376Zm0,0'
                                                transform='translate(-179.359)' />
                                            </g>
                                        </g>
                                    </svg>
                                    <p className="dashboard__status-title">
                                    دریافت محموله
                                    </p>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                    <Modal triggerID={'change-pass'} content={this.changePassJSX}/>

                </div>
                }

                {
                    this.state.path === this.HISTORY &&
                    <div className="histories__container">
                        <Histories />
                    </div>
                }

                {
                    this.state.path === this.NOTIFICATIONS &&
                    <div className="notifications__container">
                        <Notifications />     
                    </div>
                }
                
                <Footer />
            </div>
        );
    } 
}