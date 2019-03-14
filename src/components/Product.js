import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { TimelineLite } from "gsap/TimelineMax";
import { Power2 } from "gsap/EasePack";

export default class Product extends React.Component {
  state = {
    title: "پنج نوش",
    // product: {
    //   id: 1,
    //   title: "دمنوش گیاهی قند خون",
    //   shortDesc: "(دمنوش گیاهی (دارچین ، شنبلیله و برگ زیتون",
    //   thumbnail: "img/product-1.jpg",
    //   price: 8000,
    //   category: "دمنوش گیاهی",
    //   body:
    //     "%h%دارچین ادویه ای با بیش از 40 خواص حفاظت کننده بدن%h%%p%دارچین و برگ زیتون از دیرباز در طب سنتی جایگاه ویژه ای در سلامت بدن داشته اند. دمنوش گیاهی پنج نوش ترکیبی اسستثنایی از گیاهان سنتی با پایه دارچین می باشد که فواید زیادی در سلامت بدن ، تقویت سیستم ایمنی و کنترل قند خون دارد.%p%%h%ترکیبی کامل از گیاهان سنتی دارویی%h%%p%دمنوش گیاهی دارچین،شنبلیله و برگ زیتون ترکیبی کامل از گیاهان سنتی دارویی است که با تقویت اثر یکدیگر در کاهش قند خون نقش عمده ای ایفا می کند.%p%با افزایش ترشح انسولین و کاهش مقاومت سلول ها به انسولین و تسهیل ورود گلوکز به داخل سلول ها پس از 3 هفته از شروع مصرف بدون حذف داروهای تجویز شده توسط پزشک ، در کسانی که قندخون بدکنترل دارند نتیجه رضایت بخشی خواهد داشت.%p%",
    //   use: "",
    //   pics: [
    //     {
    //       id: 3,
    //       location: "img/pic-15.jpg",
    //       product_id: 1
    //     },
    //     {
    //       id: 4,
    //       location: "img/pic-14.jpg",
    //       product_id: 1
    //     }
    //   ]
    // },
    product: {
      id: 1,
      title: "دمنوش گیاهی آرتیشو",
      shortDesc:
        "دم نوش گیاهی آرتیشو (تونیک کبد)  مشتمل بر پنج دارو از سری دم نوش های صنایع تولیدی پنج نوش رفسنجان می باشد",
      thumbnail: "img/artisho.jpg",
      price: 6500,
      category: "دمنوش گیاهی",
      body:
        "%h%سم زدایی و پاکسازی کبد%h%%p%این محصول به منظور سم زدایی و پاک سازی کبد از کلیه سموم تهیه گردیده است. گیاهان این دمنوش از موثر ترین گیاهان دارویی موجود در دنیا می باشند که به جهت پاکسازی کبد از سموم و درمان کبد چرب فرموله شده است. گیاه آرتیشو علاوه بر کاهش سطوح چربی خون دارای خاصیت (hepato protective) است که از اکسیداسیون LPL  و پراکسیداسیون جلوگیری نموده و فعالیت گلوتاتیون پراکسیداز را افزایش می دهد ، از این رو نقش ارزنده ای در درمان کبد چرب دارد.%p%%h%درمان کننده کبد چرب%h%%p%کاسنی گیاه مورد علاقه دانشمند بزرگ طب بو علی سینا ، گیاه دیگر این محصول می باشد که دافع صفرا بوده و تصفیه کننده خون و شست و شو دهنده ی کبد است و طبیعتی سرد از دیدگاه طب سنتی دارد. کاسنی کاهنده ی چربی های خون است و مطالعات متعددی بر تاثیر آن بر هیستولوژی و بافت کبد و جلوگیری از تخریب آن دارد که در سال 2011 در pharmacognosy magazine  به چاپ رسیده است%p%کاسنی گیاه مورد علاقه دانشمند بزرگ طب بو علی سینا ، گیاه دیگر این محصول می باشد که دافع صفرا بوده و تصفیه کننده خون و شست و شو دهنده ی کبد است و طبیعتی سرد از دیدگاه طب سنتی دارد. کاسنی کاهنده ی چربی های خون است و مطالعات متعددی بر تاثیر آن بر هیستولوژی و بافت کبد و جلوگیری از تخریب آن دارد که در سال 2011 در pharmacognosy magazine  به چاپ رسیده است%p%%p%سایر گیاهان موجود در این دمنوش نیز تقویت کننده اثرات این محصول بوده و ترکیبی منحصر به فرد برای سلامتی این ارگان حیاتی که بیشتر از 500 عملکرد در بدن انسان دارد ، ایجاد نموده است%p%",
      use: "",
      pics: [
        {
          id: 3,
          location: "img/pic-12.jpg",
          product_id: 1
        },
        {
          id: 4,
          location: "img/pic-13.jpg",
          product_id: 1
        }
      ]
    },
    cartNumber: 0,
    error: false,
    cartAnimationOn: false
  };

  updateCartNumber = e => {
    if (localStorage.getItem("cart")) {
      const length = JSON.parse(localStorage.getItem("cart")).length;
      this.setState(() => ({ cartNumber: length }));
    } else {
      this.setState(() => ({ cartNumber: 0 }));
    }
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    const bind = this;
    axios({
      method: "get",
      url: "/api/products/" + params.id
    }).then(function(response) {
      if (response.status === 200) {
        const temp = response.data.data;

        const item = {
          id: temp.id,
          title: temp.name,
          shortDesc: temp.short_description,
          thumbnail: temp.logo,
          price: temp.price,
          category: temp.category,
          body: temp.description || bind.state.product.body,
          use: temp.how_to_use || bind.state.product.use,
          pics: temp.pictures
        };
        bind.setState(() => ({ product: item, title: temp.name }));
      } else {
        bind.setState(() => ({ error: true }));
      }
    });

    this.updateCartNumber();
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    const {
      match: { params }
    } = this.props;

    const bind = this;
    if (bind.state.item && params.id !== bind.state.item.id) {
      axios({
        method: "get",
        url: "/api/products/" + params.id
      }).then(function(response) {
        if (response.status === 200) {
          const temp = response.data.data;

          const item = {
            id: temp.id,
            title: temp.name,
            shortDesc: temp.short_description,
            thumbnail: temp.logo,
            price: temp.price,
            category: temp.category,
            body: temp.description || bind.state.product.body,
            use: temp.how_to_use || bind.state.product.use,
            pics: temp.pictures
          };
          bind.setState(() => ({ product: item, title: temp.name }));
        } else {
          bind.setState(() => ({ error: true }));
        }
      });
    }
  }

  cartAddAnimation = e => {
    if (!this.state.cartAnimationOn) {
      this.setState(() => ({ cartAnimationOn: true }));
      const cartEl = document.querySelector(".product__cart-icon");
      const currentColor = window
        .getComputedStyle(cartEl)
        .getPropertyValue("fill");

      var tl = new TimelineLite();
      tl.add(
        TweenLite.to(cartEl, 0.2, {
          rotation: "+=30",
          ease: Power2.easeIn
        })
      );
      tl.add(
        TweenLite.to(cartEl, 0.2, {
          rotation: "-=45",
          ease: Power2.easeIn
        })
      );
      tl.add(
        TweenLite.to(cartEl, 0.2, {
          rotation: "+=15",
          ease: Power2.easeIn,
          delay: 0.1,
          onComplete: () => this.setState(() => ({ cartAnimationOn: false }))
        })
      );
    }
  };

  addToCartClickHandler = e => {
    const item = {
      id: this.state.product.id,
      title: this.state.product.title,
      price: this.state.product.price,
      category: this.state.product.category,
      thumbnail: this.state.product.thumbnail,
      shortDesc: this.state.product.shortDesc
    };

    let arr = JSON.parse(localStorage.getItem("cart"));
    if (!arr) {
      arr = [];
    }
    arr.push(item);
    localStorage.setItem("cart", JSON.stringify(arr));
    this.updateCartNumber();
    this.cartAddAnimation();
  };

  render() {
    const headings = [];
    this.state.product.body.split("%h%").forEach(cur => {
      if (!cur.includes("%") && cur.length > 0) headings.push(cur);
    });

    const paragraphs = [];
    this.state.product.body.split("%p%").forEach(cur => {
      if (!cur.includes("%") && cur.length > 0) paragraphs.push(cur);
    });

    const steps = [];
    this.state.product.use.split("%step%").forEach(cur => {
      if (!cur.includes("%") && cur.length > 0) steps.push(cur);
    });

    let style1 = {
      backgroundImage: `url(${this.state.product.pics[0].location})`
    };

    let style2 = {
      backgroundImage: `url(${this.state.product.pics[1].location})`
    };

    if (this.state.error) {
      return false;
    }

    return (
      <>
        <Helmet>
          <title>{this.state.title}</title>
        </Helmet>
        <div className="product">
          <Navigation />
          <span className="product__bg--top" />
          <div className="product__container">
            <div className="product__nav mg-bottom-lg">
              <div className="product__cart">
                <Link
                  to={{
                    pathname: "/cart",
                    state: { prevProductID: this.state.product.id }
                  }}
                >
                  <svg
                    className="product__cart-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24.933 24.933"
                  >
                    <defs />
                    <path
                      id="Path_1327"
                      data-name="Path 1327"
                      d="M7.48,19.946A2.493,2.493,0,1,0,9.973,22.44,2.5,2.5,0,0,0,7.48,19.946ZM0,0V2.493H2.493l4.488,9.475L5.236,14.96a4.429,4.429,0,0,0-.249,1.247A2.5,2.5,0,0,0,7.48,18.7H22.44V16.206H7.979a.268.268,0,0,1-.249-.249v-.125l1.122-2.119h9.225A2.274,2.274,0,0,0,20.2,12.466l4.488-8.1a.686.686,0,0,0,.249-.623,1.178,1.178,0,0,0-1.247-1.247H5.236L4.114,0ZM19.946,19.946A2.493,2.493,0,1,0,22.44,22.44,2.5,2.5,0,0,0,19.946,19.946Z"
                    />
                  </svg>
                </Link>
                <span className="product__cart-number">
                  {this.state.cartNumber}
                </span>
              </div>

              <Link to="/shop" className="clickable">
                <svg
                  className="product__back"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 31.11 25.925"
                >
                  <defs />
                  <path
                    id="Path_1329"
                    data-name="Path 1329"
                    className="cls-1"
                    d="M12.1,45.163V38.25L0,50.348l12.1,12.1V55.36c8.642,0,14.691,2.765,19.012,8.814C29.382,55.533,24.2,46.892,12.1,45.163Z"
                    transform="rotate(180 15.555 32.087)"
                  />
                </svg>
              </Link>
            </div>

            <div className="product__header">
              <div className="product__gallery">
                <img
                  src={this.state.product.thumbnail}
                  className="product__img product__img--main"
                />
                {/* {this.state.product.pics.length > 2 && (
                  <img
                    src={this.state.product.pics[2].location}
                    className="product__img product__img--sub-left"
                  />
                )}

                {this.state.product.pics.length > 3 && (
                  <img
                    src={this.state.product.pics[3].location}
                    className="product__img product__img--sub-right"
                  />
                )} */}
              </div>
              <div className="product__info">
                <h1 className="product__title">{this.state.product.title}</h1>
                <div className="product__cats">
                  <h3 className="product__cat">
                    {this.state.product.category}
                  </h3>
                </div>
                <p className="product__short-desc">
                  {this.state.product.shortDesc}
                </p>
                <p className="product__price">
                  <span className="product__price-value">
                    {this.state.product.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  <span className="product__price-unit">تومان</span>
                </p>
                <button
                  className="product__button btn--color-animation-blue btn--no-up-animation btn--stretch-x btn btn--fat btn--primary"
                  onClick={this.addToCartClickHandler}
                >
                  افزودن به سبد خرید
                </button>
              </div>
            </div>

            <div className="product__body">
              <div className="product__desc-gp product__desc-gp--mid">
                <h2 className="product__subtitle">{headings[0]}</h2>
                <p className="product__subdesc">{paragraphs[0]}</p>
              </div>

              <div className="product__desc-gp product__desc-gp--right">
                <h2 className="product__subtitle">{headings[1]}</h2>
                <p className="product__subdesc">{paragraphs[1]}</p>
              </div>

              <span
                className="product__body-img product__body-img--left"
                style={style1}
              />
              <span
                className="product__body-img product__body-img--right"
                style={style2}
              />

              <span className="product__img-bg product__img-bg--left" />
              <span className="product__img-bg product__img-bg--right" />

              <div className="product__desc-gp product__desc-gp--left">
                <p className="product__subdesc">{paragraphs[2]}</p>
                <p className="product__subdesc">{paragraphs[3]}</p>
              </div>
            </div>

            {this.state.use && (
              <div className="product__uasge">
                <h2 className="product__uasge-title">نحوه استفاده</h2>

                {steps.map(cur => (
                  <div className="product__step">
                    <img className="product__comma" src="img/comma.png" />
                    <p className="product__step-text">{cur}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Footer />
        </div>
      </>
    );
  }
}
