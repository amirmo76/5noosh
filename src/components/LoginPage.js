import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';


export default class LoginPage extends React.Component {

    submitHandler = e => {
        e.preventDefault();
        //-------------CODE GOES HERE----------
        
    }

    render() {
        return (
            <div className="login">
                <Navigation />
                <div className="login__body">
                    <div className="login__hero"></div>
                    <div className="login__box">
                        <form className="login__form">
                            <label className="label label--secondary">ایمیل</label>
                            <input className="input input--secondary mg-bottom-md" type="email" required/>
                            <label className="label label--secondary">رمز عبور</label>
                            <input className="input input--secondary mg-bottom-lg" type="password" required/>
                            <button className="btn btn--fat btn--primary mg-bottom-md" type="submit" onClick={this.submitHandler}>ورود</button>
                            <div className="login__options">
                                <a>حساب کاربری ندارید؟</a>
                                <a>رمز عبور خود را فراموش کرده اید؟</a>
                            </div>
                        </form>
    
                        <div className="login__content">
                            <h2 className="login__title mg-bottom-sm">خوش آمدید</h2>
                            <p className="login__text mg-bottom-md">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</p>
                            <h2 className="login__title mg-bottom-sm">توضیحاتی کوتاه</h2>
                            <p className="login__text">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</p>
                        </div>
                    </div>
                    
                </div>
                <Footer />
            </div>
        );
    }
}