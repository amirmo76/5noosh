import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Cart from "./Cart";
import { Link, NavLink } from "react-router-dom";
import ProductPrev from "./ProductPrev";
import axios from "axios";
import { Helmet } from "react-helmet";
import { TimelineLite } from "gsap/TimelineMax";
import { Power2 } from "gsap/EasePack";

export default class SignupPAge extends React.Component {
  state = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    slideshow: true,
    cartNumber: 0,

    items: [
      // {
      //     id: 1,
      //     title: 'دوچرخه',
      //     price: 22500,
      //     category: 'گیاهی',
      //     thumbnail: 'img/img-1.png',
      //     shortDesc: "توضیحاتی کوتاه از محصول لورم ایپسوم متنی ساختگی جهت استفاده در طراحی و صنعت چاپ",
      // },
      // {
      //     id: 2,
      //     title: 'خوراکی',
      //     price: 18100,
      //     category: 'دمنوش',
      //     thumbnail: 'img/img-2.png',
      //     shortDesc: "توضیحاتی کوتاه از محصول لورم ایپسوم متنی ساختگی جهت استفاده در طراحی و صنعت چاپ",
      // },
      // {
      //     id: 3,
      //     title: 'دمنوش گیاهی آرتیشو',
      //     price: 12000,
      //     category: 'دمنوش گیاهی',
      //     thumbnail: 'img/img-3.jpg',
      //     shortDesc: "توضیحاتی کوتاه از محصول لورم ایپسوم متنی ساختگی جهت استفاده در طراحی و صنعت چاپ",
      // }
    ],
    slideShowItems: [
      // {
      //     id: 1,
      //     title: 'دوچرخه',
      //     price: 22500,
      //     category: 'دسته بندی',
      //     thumbnail: 'img/img-1.png',
      //     shortDesc: "توضیحاتی کوتاه از محصول لورم ایپسوم متنی ساختگی جهت استفاده در طراحی و صنعت چاپ",
      // },
      // {
      //     id: 2,
      //     title: 'خوراکی',
      //     price: 18100,
      //     category: 'دسته بندی',
      //     thumbnail: 'img/img-2.png',
      //     shortDesc: "توضیحاتی کوتاه از محصول لورم ایپسوم متنی ساختگی جهت استفاده در طراحی و صنعت چاپ",
      // },
      // {
      //     id: 3,
      //     title: 'بهرام',
      //     price: 12000,
      //     category: 'دسته بندی',
      //     thumbnail: 'img/img-3.jpg',
      //     shortDesc: "توضیحاتی کوتاه از محصول لورم ایپسوم متنی ساختگی جهت استفاده در طراحی و صنعت چاپ",
      // },
      // {
      //     id: 4,
      //     title: 'شکلات',
      //     price: 9000,
      //     category: 'دسته بندی',
      //     thumbnail: 'img/img-4.jpg',
      //     shortDesc: "توضیحاتی کوتاه از محصول لورم ایپسوم متنی ساختگی جهت استفاده در طراحی و صنعت چاپ",
      // },
      // {
      //     id: 5,
      //     title: 'دانشگاه',
      //     price: 8500,
      //     category: 'دسته بندی',
      //     thumbnail: 'img/img-5.jpg',
      //     shortDesc: "توضیحاتی کوتاه از محصول لورم ایپسوم متنی ساختگی جهت استفاده در طراحی و صنعت چاپ",
      // }
    ],
    lookAtResaults: false,
    searchResults: [],
    categoryShow: false,
    lookAtCategory: false,
    categoriesResults: [],
    cartAnimationOn: false
  };

  cartAddAnimation = e => {
    if (!this.state.cartAnimationOn) {
      this.setState(() => ({ cartAnimationOn: true }));
      const cartEl = document.querySelector(".shop__cart-icon");
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

  updateCartNumber = e => {
    if (localStorage.getItem("cart")) {
      const length = JSON.parse(localStorage.getItem("cart")).length;
      this.setState(() => ({ cartNumber: length }), this.cartAddAnimation);
    } else {
      this.setState(() => ({ cartNumber: 0 }));
    }
  };

  goRight = e => {
    let newFirst = this.state.first + 1;
    if (newFirst > 5) {
      newFirst = 1;
    }
    let newSecond = this.state.second + 1;
    if (newSecond > 5) {
      newSecond = 1;
    }
    let newThird = this.state.third + 1;
    if (newThird > 5) {
      newThird = 1;
    }
    let newFourth = this.state.fourth + 1;
    if (newFourth > 5) {
      newFourth = 1;
    }
    let newFifth = this.state.fifth + 1;
    if (newFifth > 5) {
      newFifth = 1;
    }

    this.setState(() => ({
      first: newFirst,
      second: newSecond,
      third: newThird,
      fourth: newFourth,
      fifth: newFifth
    }));
  };

  goLeft = e => {
    let newFirst = this.state.first - 1;
    if (newFirst < 1) {
      newFirst = 5;
    }
    let newSecond = this.state.second - 1;
    if (newSecond < 1) {
      newSecond = 5;
    }
    let newThird = this.state.third - 1;
    if (newThird < 1) {
      newThird = 5;
    }
    let newFourth = this.state.fourth - 1;
    if (newFourth < 1) {
      newFourth = 5;
    }
    let newFifth = this.state.fifth - 1;
    if (newFifth < 1) {
      newFifth = 5;
    }

    this.setState(() => ({
      first: newFirst,
      second: newSecond,
      third: newThird,
      fourth: newFourth,
      fifth: newFifth
    }));
  };

  searchHandler = e => {
    const el = document.getElementById("search");
    if (el.value) {
      this.setState(() => ({ slideshow: false, lookAtResaults: true }));
      // search algorthm goes here

      let res = [];
      if (!this.state.lookAtCategory) {
        this.state.items.forEach(cur => {
          if (cur.title.includes(el.value)) res.push(cur);
        });
      } else {
        this.state.categoriesResults.forEach(cur => {
          if (cur.title.includes(el.value)) res.push(cur);
        });
      }
      this.setState(
        () => ({ searchResults: res }),
        () => {
          console.log(this.state.searchResults);
        }
      );
    } else {
      this.setState(() => ({ slideshow: true, lookAtResaults: false }));
    }
  };

  slideshowProductPrevClickHandler = e => {
    let el = e.target;
    let par = el.parentNode;
    if (el.classList.contains("product-prev")) {
      par = el;
    }
    while (!par.classList.contains("product-prev")) {
      el = par;
      par = el.parentNode;
    }
    // par is the prodect-prev now
    const pos = par.getAttribute("slideshow-position");
    const diff = Math.abs(pos - 3);
    if (pos > 3) {
      for (let i = 0; i < diff; i++) {
        const bind = this;
        setTimeout(function() {
          bind.goLeft();
        }, i * 50);
      }
    } else if (pos < 3) {
      for (let i = 0; i < diff; i++) {
        const bind = this;
        setTimeout(function() {
          bind.goRight();
        }, i * 50);
      }
    }
  };

  categoryToggleClickHandler = e => {
    if (
      e.target.parentNode.classList.contains("shop__right-side") &&
      e.target.classList.contains("shop__cats-icon")
    ) {
      this.setState(prev => ({ categoryShow: !prev.categoryShow }));
    } else if (
      e.target.parentNode.parentNode.classList.contains("shop__right-side") &&
      e.target.parentNode.classList.contains("shop__cats-icon")
    ) {
      this.setState(prev => ({ categoryShow: !prev.categoryShow }));
    }
  };

  categoryCheck = e => {
    const id = this.props.location.pathname.split("/")[2];
    this.setState(() => ({ lookAtCategory: false }));
    if (id) {
      const category = id.replace("-", " ");
      console.log(category);
      this.setState(() => ({ lookAtCategory: true }));

      let res = [];
      this.state.items.forEach(cur => {
        if (cur.category.trim() === category) {
          res.push(cur);
        }
      });
      console.log(res);
      this.setState({ categoriesResults: res });
    }
  };

  componentDidMount = e => {
    const newNode = document.querySelector(".shop__right-side").cloneNode(true);
    document.querySelector(".shop__body").appendChild(newNode);

    const bind = this;
    axios({
      method: "get",
      url: "/api/products/top_selling/all"
    }).then(function(response) {
      if (response.status === 200) {
        const temp = response.data.data;
        const data = temp.map(cur => {
          const item = {
            id: cur.id,
            title: cur.name,
            thumbnail: cur.logo,
            price: cur.price,
            category: cur.category,
            shortDesc: cur.short_description
          };

          return item;
        });
        bind.setState(() => ({ slideShowItems: data }));
      }
    });

    axios({
      method: "get",
      url: "/api/products"
    }).then(function(response) {
      if (response.status === 200) {
        const temp = response.data.data;
        const data = temp.map(cur => {
          const item = {
            id: cur.id,
            title: cur.name,
            thumbnail: cur.logo,
            price: cur.price,
            category: cur.category || "دمنوش گیاهی",
            shortDesc: cur.short_description
          };

          return item;
        });
        bind.setState(() => ({ items: data }), bind.categoryCheck);
      }
    });

    this.updateCartNumber();
    this.categoryCheck();
  };

  render() {
    return (
      <>
        <Helmet>
          <title>پنج نوش | فروشگاه</title>
        </Helmet>
        <div className="shop">
          <Navigation />
          <span className="shop__bg" />
          <div className="shop__body" onClick={this.categoryToggleClickHandler}>
            <div
              className={
                "shop__right-side" +
                (this.state.categoryShow ? " shop__right-side--show" : "")
              }
            >
              <svg
                className="shop__cats-icon"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                width="459"
                height="459"
                viewBox="0 0 459 459"
              >
                <path
                  d="M0,382.5h459v-51H0V382.5z M0,255h459v-51H0V255z M0,76.5v51h459v-51H0z"
                  id="menu"
                />
              </svg>
              <div className="shop__cats-box">
                <h2 className="heading--secondary mg-bottom-md">
                  دسته بندی محصولات
                </h2>

                <div
                  className="shop__cats-gp"
                  onClick={() => {
                    location.reload();
                  }}
                >
                  <ul className="shop__cats">
                    <li className="shop__cat">
                      <Link to="/shop" className="shop__cat-link">
                        همه
                      </Link>
                    </li>
                    <li className="shop__cat">
                      <Link to="/shop/دمنوش-گیاهی" className="shop__cat-link">
                        دمنوش گیاهی
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <svg
                className="shop__bottom-right-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 250 250"
              >
                <polygon
                  className="st0"
                  points="128.4,17 189.1,77 166.9,99.6 128.4,62.3 91.1,99.6 68.1,76.6"
                />
                <path
                  className="st0"
                  d="M228.8,117l-29-28.2L174,114.4c-10.7,4.1-16.8,0-16.8,0l-29.8-29.8l-25.9,25.9l38.5,38.5l-17.9,17.9 l-11.3-11.3l6.7-6.7L56.6,88.9L30,114.7c-24.6,29-4.8,55.6-4.8,55.6L76,221.8c19,19.4,36.1,8.3,36.1,8.3l16.5-14.7l10.1,11.1 c21,14.7,35.7,0,35.7,0l56.3-56.7C251,142.4,228.8,117,228.8,117z M202.2,105.1l11.3,11.3l-10.4,10.4l-11.7-11L202.2,105.1z M92.3,129.3l11.1,11.1l-6.5,6.5l28.8,28.8l-11.1,11.1l-28.2-28.2C86.3,158.7,74.4,143.6,92.3,129.3z M33.5,161c0,0-12-19.2,4.5-37 l17.5-17.5l10.2,9.8l-14.3,14.3c0,0-11.1,14.3,0,26.2l29.8,29.8l12.9-12.9l11.7,11.7l-24,24L33.5,161z M115.3,213.1 c-13.1,15.9-26.2,4.4-26.2,4.4l70.1-70.1l-31.9-31.9l-7.6,7.6l-9.5-9.9L128,95.3l39.6,39.6c11.1,14.3,0,25.8,0,25.8L115.3,213.1z M220.7,163.5l-53.1,53.1c0,0-11.3,12.4-23.7,0l-12.8-12.8l10.7-10.7l13.8,13.8l53.2-53.2c0,0,5.8-15.4-3.4-24.4l10.3-10.7l5,5 C220.7,123.6,239.2,144.9,220.7,163.5z"
                />
              </svg>
            </div>

            <div className="shop__main">
              <div className="shop__nav mg-bottom-md">
                <NavLink
                  to={{ pathname: "/cart", state: { prevProductID: 0 } }}
                  className="shop__cart"
                >
                  <svg
                    className="shop__cart-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24.933 24.933"
                    onClick={this.toggleCart}
                  >
                    <defs />
                    <path
                      id="Path_1327"
                      data-name="Path 1327"
                      d="M7.48,19.946A2.493,2.493,0,1,0,9.973,22.44,2.5,2.5,0,0,0,7.48,19.946ZM0,0V2.493H2.493l4.488,9.475L5.236,14.96a4.429,4.429,0,0,0-.249,1.247A2.5,2.5,0,0,0,7.48,18.7H22.44V16.206H7.979a.268.268,0,0,1-.249-.249v-.125l1.122-2.119h9.225A2.274,2.274,0,0,0,20.2,12.466l4.488-8.1a.686.686,0,0,0,.249-.623,1.178,1.178,0,0,0-1.247-1.247H5.236L4.114,0ZM19.946,19.946A2.493,2.493,0,1,0,22.44,22.44,2.5,2.5,0,0,0,19.946,19.946Z"
                    />
                  </svg>
                  <span className="shop__cart-number">
                    {this.state.cartNumber}
                  </span>
                </NavLink>

                <div className="shop__search">
                  <label className="shop__search-label" htmlFor="search">
                    <svg
                      className="shop__search-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22.179 23.034"
                    >
                      <defs />
                      <path
                        className="cls-1"
                        d="M23.041,22.3l-6.462-6.72a9.14,9.14,0,1,0-.643.586L22.414,22.9a.435.435,0,1,0,.627-.6ZM10.116,17.4a8.263,8.263,0,1,1,8.263-8.263A8.272,8.272,0,0,1,10.116,17.4Z"
                        transform="translate(-.983)"
                      />
                    </svg>
                  </label>

                  <input
                    onChange={this.searchHandler}
                    id="search"
                    type="text"
                    placeholder="جست و جو"
                    className="shop__search-input"
                  />
                </div>
              </div>

              {this.state.slideshow && this.state.slideShowItems.length > 0 && (
                <div className="shop__featured mg-bottom-lg">
                  <h2 className="heading--secondary text-center mg-bottom-sm">
                    پرفروش ترین محصولات
                  </h2>
                  <div className="product-slideshow">
                    <svg
                      onClick={this.goRight}
                      className="product-slideshow__right-arrow"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 26.666 26.666"
                    >
                      <defs />
                      <g
                        id="Group_155"
                        data-name="Group 155"
                        className="cls-1"
                        transform="translate(-192 -524)"
                      >
                        <g
                          id="Ellipse_160"
                          data-name="Ellipse 160"
                          className="cls-2"
                          transform="translate(192 524)"
                        >
                          <circle
                            className="cls-4"
                            cx="13.333"
                            cy="13.333"
                            r="13.333"
                          />
                          <circle
                            className="cls-5"
                            cx="13.333"
                            cy="13.333"
                            r="11.833"
                          />
                        </g>
                        <path
                          id="Path_1323"
                          data-name="Path 1323"
                          className="cls-3"
                          d="M0,0,9.777,9.777H0Z"
                          transform="rotate(45 -536.995 515.456)"
                        />
                      </g>
                    </svg>

                    <div className="product-slideshow__box">
                      <ProductPrev
                        slideshow={this.state.first}
                        product={this.state.slideShowItems[0]}
                        addToCartCallBack={this.updateCartNumber}
                        onClick={this.slideshowProductPrevClickHandler}
                      />
                      <ProductPrev
                        slideshow={this.state.second}
                        product={
                          this.state.slideShowItems[1] ||
                          this.state.slideShowItems[0]
                        }
                        addToCartCallBack={this.updateCartNumber}
                        onClick={this.slideshowProductPrevClickHandler}
                      />
                      <ProductPrev
                        slideshow={this.state.third}
                        product={
                          this.state.slideShowItems[2] ||
                          this.state.slideShowItems[0]
                        }
                        addToCartCallBack={this.updateCartNumber}
                        onClick={this.slideshowProductPrevClickHandler}
                      />
                      <ProductPrev
                        slideshow={this.state.fourth}
                        product={
                          this.state.slideShowItems[1] ||
                          this.state.slideShowItems[0]
                        }
                        addToCartCallBack={this.updateCartNumber}
                        onClick={this.slideshowProductPrevClickHandler}
                      />
                      <ProductPrev
                        slideshow={this.state.fifth}
                        product={
                          this.state.slideShowItems[4] ||
                          this.state.slideShowItems[0]
                        }
                        addToCartCallBack={this.updateCartNumber}
                        onClick={this.slideshowProductPrevClickHandler}
                      />
                    </div>

                    <svg
                      onClick={this.goLeft}
                      className="product-slideshow__left-arrow"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 26.666 26.666"
                    >
                      <defs />
                      <g
                        id="Group_155"
                        data-name="Group 155"
                        className="cls-1"
                        transform="translate(-192 -524)"
                      >
                        <g
                          id="Ellipse_160"
                          data-name="Ellipse 160"
                          className="cls-2"
                          transform="translate(192 524)"
                        >
                          <circle
                            className="cls-4"
                            cx="13.333"
                            cy="13.333"
                            r="13.333"
                          />
                          <circle
                            className="cls-5"
                            cx="13.333"
                            cy="13.333"
                            r="11.833"
                          />
                        </g>
                        <path
                          id="Path_1323"
                          data-name="Path 1323"
                          className="cls-3"
                          d="M0,0,9.777,9.777H0Z"
                          transform="rotate(45 -536.995 515.456)"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              <div className="shop__all">
                {this.state.lookAtResaults ? (
                  this.state.searchResults.length > 0 ? (
                    <h2 className="shop__all-title heading--secondary text-center mg-bottom-sm">
                      نتایج یافت شده
                    </h2>
                  ) : (
                    <h2 className="shop__all-title heading--secondary text-center mg-bottom-sm">
                      نتجه ای یافت نشد
                    </h2>
                  )
                ) : (
                  <h2 className="shop__all-title heading--secondary text-center mg-bottom-sm">
                    همه محصولات
                  </h2>
                )}

                {this.state.lookAtResaults ||
                  (this.state.lookAtCategory
                    ? this.state.categoriesResults.map(cur => (
                        <ProductPrev
                          product={cur}
                          addToCartCallBack={this.updateCartNumber}
                        />
                      ))
                    : this.state.items.map(cur => (
                        <ProductPrev
                          product={cur}
                          addToCartCallBack={this.updateCartNumber}
                        />
                      )))}
                {this.state.lookAtResaults &&
                  this.state.searchResults.map(cur => (
                    <ProductPrev
                      product={cur}
                      addToCartCallBack={this.updateCartNumber}
                    />
                  ))}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}
