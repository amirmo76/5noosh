import React from 'react';
import ArticlePrev from './ArticlePrev';
import { Link } from 'react-router-dom';

const HomeArticles = props => {
    return (
        <div className="home-articles">
            <div className="home-articles__header mg-bottom-lg">
                <h2 className="heading--primary">آخرین نوشته های پنج نوش</h2>
                <h3 className="sub-heading">چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                <Link to="/" className="home-articles__all">
                    همه نوشته ها
                </Link>
                </h3>
            </div>
            <svg className="home-articles__bg" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2104 805.109'>
                <defs />
                <path id='Path_922' data-name='Path 922' d='M0,235.635S136.979,65.054,719.962,104.178s769.275,72.849,1023.508-5.869S2104,38.45,2104,38.45V820.929S735.3,875.7,0,806.844Z'
                transform='translate(0 -36.471)' />
            </svg>
            
            

            <div className="home-articles__box">
                <ArticlePrev 
                thumbnail="img/blog-1.jpg"
                title="خوش طعم"
                desc="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است"
                />

                <ArticlePrev 
                thumbnail="img/blog-2.jpg"
                title="خوش طعم"
                desc="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است"
                />

                <ArticlePrev 
                thumbnail="img/blog-3.jpg"
                title="خوش طعم"
                desc="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است"
                />
            </div>
        </div>
    );
}

export default HomeArticles;