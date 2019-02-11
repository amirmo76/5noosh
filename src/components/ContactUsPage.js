import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import axios from 'axios';

export default class ContactUsPage extends React.Component {

    state = {
        emailTouched: false,
        emailValid: false,
        nameTouched: false,
        nameValid: false,
        textTouched: false,
        textValid: false,
        address: 'آدرس شرکت',
        email: 'example@example.com',
        phone: '999-633458',
        text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
        error: '',
        success: ''
    }

    submitHandler = e => {
        e.preventDefault();
        //-------------CODE GOES HERE----------s
        const bind = this;
        if(this.state.nameValid && this.state.emailValid && this.state.textValid) {
            axios({
                method: 'post',
                url: '/api/contact_us',
                data: {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    body: document.getElementById('text').value
                }
            }).then(function (response){
                if (response.data.status === 200) {
                    //ok
                    bind.setState(() => ({error: ''}));
                    bind.setState(() => ({success: 'پیام شما با موفقیت ارسال شد!'}));
                } else {
                    bind.setState(() => ({error: response.data.errors}));
                }
            });
        } else {
            bind.setState(() => ({error: 'ورودی های خود را کنترل کنید'}));
        }
    }

    nameChangeHandler = e => {
        this.setState(() => ({
            nameTouched: true
        }));

        const re = /^[آ-ی ء چ]+$/;
        const result = re.test(String(document.getElementById('name').value));

        this.setState(() => ({
            nameValid: result
        }));
    }

    emailChangeHandler = e => {
        this.setState(() => ({
            emailTouched: true
        }));

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = re.test(String(document.getElementById('email').value).toLowerCase());

        this.setState(() => ({
            emailValid: result
        }));
    }

    textChangeHandler = e => {
        this.setState(() => ({
            textTouched: true
        }));

        const result = document.getElementById('text').value.length > 0;

        this.setState(() => ({
            textValid: result
        }));

        console.log(this.state);
    }

    errorCloseHandler = e => {
        this.setState(() => ({error: ''}));
    }

    successCloseHandler = e => {
        console.log('suc close')
        this.setState(() => ({success: ''}));
    }

    render(){

        return (
            <div className="contactus">
                <Navigation transparent shifted/>
                <div className="contactus__bg-top"></div>
                <div className="contactus__body">
                    <div className="contactus__form-box">
                        {
                            this.state.success &&
                            <div className="contactus__success">
                                <p className="contactus__success-text">{this.state.success}</p>
                                <svg className="contactus__success-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21.9 21.9' onClick={this.successCloseHandler}>
                                    <path d='M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0 c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4 s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3 s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7 s-0.1-0.5-0.3-0.7L14.1,11.3z'
                                    />
                                </svg>
                            </div>
                        }
                        
                        {
                            this.state.error &&
                            <div className="contactus__error">
                                <p className="contactus__error-text">{this.state.error}</p>
                                <svg className="contactus__error-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21.9 21.9' onClick={this.errorCloseHandler}>
                                    <path d='M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0 c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4 s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3 s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7 s-0.1-0.5-0.3-0.7L14.1,11.3z'
                                    />
                                </svg>
                            </div>
                        }
                        
                        <h2 className="contactus__heading mg-bottom-md">پیام خود را برای ما ارسال کنید</h2>
                        <form className="contactus__form">
                            <label htmlFor="name" className="label label--secondary">نام</label>
                            <input id="name" className={"input input--secondary mg-bottom-md " + (this.state.nameTouched && (this.state.nameValid ? "input--valid" : "input--unvalid"))} type="name" onChange={this.nameChangeHandler} required/>
                            <span className={"error" + ((!this.state.nameValid && this.state.nameTouched) ? ' error--show' : '')}>نام خود را به فارسی وارد کنید</span>

                            <label htmlFor="email" className="label label--secondary">ایمیل</label>
                            <input id="email" className={"input input--secondary mg-bottom-md " + (this.state.emailTouched && (this.state.emailValid ? "input--valid" : "input--unvalid"))} type="email" onChange={this.emailChangeHandler} required/>
                            <span className={"error" + ((!this.state.emailValid && this.state.emailTouched) ? ' error--show' : '')}>ایمیل وارد شده معتبر نیست</span>

                            <label htmlFor="text" className="label label--secondary">متن پیام</label>
                            <textarea id="text" className={"input input--secondary input--textarea mg-bottom-md "  + (this.state.textTouched && (this.state.textValid ? "input--valid" : "input--unvalid"))} onChange={this.textChangeHandler} required></textarea>
                            <span className={"error" + ((!this.state.textValid && this.state.textTouched) ? ' error--show' : '')}>این فیلد نباید خالی باشد</span>

                            <button onClick={this.submitHandler} type="submit" className="mg-top-sm btn btn--stretch-x btn--fat btn--outline mg-bottom-md">ارسال</button>
                        </form>
                    </div>

                    <div className="contactus__info-box">
                        <h2 className="contactus__heading contactus__heading--small">ارتباط با ما</h2>
                        <p className="contactus__text">{this.state.text}</p>
                        <div className="contactus__info-container">
                            <svg className="contactus__info-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21.988 30.357'>
                                <defs />
                                <path data-name='Path 1043' d='M81.567,0A11.007,11.007,0,0,0,70.573,10.994c0,7.523,9.839,18.568,10.258,19.034a.99.99,0,0,0,1.473,0c.419-.467,10.258-11.511,10.258-19.034A11.007,11.007,0,0,0,81.567,0Zm0,16.526A5.531,5.531,0,1,1,87.1,10.994,5.538,5.538,0,0,1,81.567,16.526Z'
                                transform='translate(-70.573)' />
                            </svg>
                            <h3 className="contactus__info contactus__info--address">{this.state.address}</h3>
                        </div>

                        <div className="contactus__info-container">
                            <svg className="contactus__info-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.842 20.304'>
                                <defs />
                                <g data-name='Group 119'>
                                    <path data-name='Path 1041' d='M2.48,61.078q.49.346,2.956,2.055t3.778,2.631q.144.1.613.44t.779.548q.31.209.75.469a4.351,4.351,0,0,0,.829.389,2.285,2.285,0,0,0,.721.13h.029a2.287,2.287,0,0,0,.721-.13,4.355,4.355,0,0,0,.829-.389q.44-.26.75-.469t.779-.548q.469-.339.613-.44,1.326-.923,6.749-4.687A6.85,6.85,0,0,0,25.135,59.3a3.808,3.808,0,0,0,.707-2.177,2.327,2.327,0,0,0-2.307-2.307H2.307A2.059,2.059,0,0,0,.6,55.57,2.911,2.911,0,0,0,0,57.444a3.368,3.368,0,0,0,.793,1.969A7.158,7.158,0,0,0,2.48,61.078Z'
                                    transform='translate(0 -54.82)' />
                                    <path data-name='Path 1042' d='M24.4,185.692q-4.729,3.2-7.181,4.975-.822.605-1.334.944a8.232,8.232,0,0,1-1.363.692,4.15,4.15,0,0,1-1.586.353h-.029a4.151,4.151,0,0,1-1.586-.353,8.237,8.237,0,0,1-1.363-.692q-.512-.339-1.334-.944-1.947-1.428-7.167-4.975A7.639,7.639,0,0,1,0,184.437v11.45a2.221,2.221,0,0,0,.678,1.63,2.221,2.221,0,0,0,1.63.678H23.534a2.314,2.314,0,0,0,2.307-2.308v-11.45A7.951,7.951,0,0,1,24.4,185.692Z'
                                    transform='translate(0 -177.89)' />
                                </g>
                            </svg>
                            <h3 className="contactus__info contactus__info--email">{this.state.email}</h3>
                        </div>

                        <div className="contactus__info-container">
                            <svg className="contactus__info-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.744 25.728'>
                                <defs />
                                <path data-name='Path 1044' d='M25.733,20.492a1.244,1.244,0,0,1-.382,1.09l-3.625,3.6a2.04,2.04,0,0,1-.64.463,2.647,2.647,0,0,1-.777.245q-.027,0-.164.014t-.354.014a12.564,12.564,0,0,1-1.676-.177,12.73,12.73,0,0,1-2.834-.872,23.792,23.792,0,0,1-3.8-2.085,28.347,28.347,0,0,1-4.524-3.816,29.865,29.865,0,0,1-3.161-3.6,25.632,25.632,0,0,1-2.017-3.175A17.1,17.1,0,0,1,.631,9.55,14.026,14.026,0,0,1,.114,7.506,6.75,6.75,0,0,1,0,6.157q.027-.491.027-.545a2.649,2.649,0,0,1,.245-.777,2.042,2.042,0,0,1,.463-.64L4.365.57A1.2,1.2,0,0,1,5.237.188a1.017,1.017,0,0,1,.627.2,1.9,1.9,0,0,1,.463.5L9.244,6.429a1.326,1.326,0,0,1,.136.954,1.7,1.7,0,0,1-.463.872L7.581,9.591a.455.455,0,0,0-.1.177.673.673,0,0,0-.041.2,4.921,4.921,0,0,0,.491,1.308,12.009,12.009,0,0,0,1.008,1.594,17.7,17.7,0,0,0,1.935,2.167,18.053,18.053,0,0,0,2.18,1.949,12.591,12.591,0,0,0,1.594,1.022,4.238,4.238,0,0,0,.981.4l.341.068a.65.65,0,0,0,.177-.041.455.455,0,0,0,.177-.1l1.553-1.581a1.67,1.67,0,0,1,1.145-.436,1.424,1.424,0,0,1,.736.164h.027l5.26,3.107A1.371,1.371,0,0,1,25.733,20.492Z'
                                transform='translate(.001 -.189)' />
                            </svg>
                            <h3 className="contactus__info contactus__info--phone">{this.state.phone}</h3>
                        </div>

                        <div className="contactus__socials-container">
                            <svg className="contactus__social-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26.861 23.608'>
                                <defs />
                                <path d='M6.463,13.68,9.8,22.031l4.349-4.349,7.457,5.927L26.861,0,0,11.189ZM19.185,6.774l-8.222,7.5L9.94,18.133,8.048,13.4Zm0,0'
                                transform='translate(0 -.001)' />
                            </svg>
                            <svg className="contactus__social-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11.141 23.828'>
                                <defs />
                                <path data-name='Path 1047' d='M102.459,68.635V66.716A1.006,1.006,0,0,1,103.5,65.58h2.683V61.5H102.5c-4.1,0-5.012,3.018-5.012,4.993v2.142H95.1V73.4h2.4V85.328h4.769V73.4h3.54l.149-1.882.279-2.906h-3.782Z'
                                transform='translate(-95.1 -61.5)' />
                            </svg>
                            <svg className="contactus__social-icon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 29.627 23.688'>
                                <defs />
                                <path data-name='Path 1045' d='M90.727,76.807a13.058,13.058,0,0,1-3.48.951,6.045,6.045,0,0,0,2.691-3.318A12.394,12.394,0,0,1,86.063,75.9,6.122,6.122,0,0,0,81.609,74a6.046,6.046,0,0,0-6.078,5.962,6.493,6.493,0,0,0,.186,1.369A17.257,17.257,0,0,1,63.188,75.09a5.9,5.9,0,0,0,1.856,7.981,5.745,5.745,0,0,1-2.738-.742v.07a5.587,5.587,0,0,0,.418,2.158,6.063,6.063,0,0,0,4.454,3.689,6.208,6.208,0,0,1-1.6.232,4.623,4.623,0,0,1-1.137-.139A6.143,6.143,0,0,0,70.1,92.514a12.315,12.315,0,0,1-7.54,2.552q-.731,0-1.462-.07a17.452,17.452,0,0,0,9.3,2.691A16.875,16.875,0,0,0,87.27,84.3a16.159,16.159,0,0,0,.394-3.619v-.766a11.812,11.812,0,0,0,3.062-3.109Z'
                                transform='translate(-61.1 -74)' />
                            </svg>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    } 
}