import React from 'react';

const Testemonials = props => {
    return (
        <div className="testemonials">

            <div className="testemonials__header">
                <h2 className="heading--primary">برخی از مشتریان ما</h2>
                <h3 className="sub-heading">چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</h3>
            </div>
            
            <div className="testemonials__content">
                <div className="testemonial testemonial--primary">
                    <img className="testemonial__img" src="img/person-2.jpg"/>
                    <p className="testemonial__name">نام و نام خانوادگی</p>
                    <h4 className="testemonial__title">کیفیت فوق العاده</h4>
                    <p className="testemonial__text">برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
                </div>

                <div className="testemonial testemonial--tertiary">
                    <img className="testemonial__img" src="img/person-1.jpg"/>
                    <p className="testemonial__name">نام و نام خانوادگی</p>
                    <h4 className="testemonial__title">خوش طعم</h4>
                    <p className="testemonial__text">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                </div>
            </div>
            
        </div>
    );
}

export default Testemonials;