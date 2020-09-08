import React from 'react'
import './Home.css'
import Product from './Product';

function Home() {
    return (
        <div className="home">

            <img className="home__image" src="https://images-na.ssl-images-amazon.com/images/G/01/adlp/builder/BFF-V1-01-Hero-D-5ff78a97-f4d3-4242-9344-c1f478aff592._CB428091778_QL85_V1_.jpg" alt="" />

            <div className="home__row">
                <Product
                    id="12321351"
                    title="The Blue Umbrella"
                    image="https://m.media-amazon.com/images/I/71JZ0neAP1L._AC_UY327_FMwebp_QL65_.jpg"
                    price={75}
                    rating={4}
                />

                <Product
                    id="12321352"
                    title="Apple iPad Pro (12.9-inch, Wi-Fi, 1TB) - Space Grey (4th Generation)"
                    image="https://images-na.ssl-images-amazon.com/images/I/811aBwuSuIL._SL1500_.jpg"
                    price={134900.00}
                    rating={5}
                />

            </div>
            <div className="home__row">
                <Product
                    id="12321353"
                    title="Alpino Natural Peanut Butter Crunch 1 KG (Unsweetened / Gluten Free / Non-GMO / Vegan)"
                    image="https://m.media-amazon.com/images/I/71n6gXQn79L._AC_UL480_FMwebp_QL65_.jpg"
                    price={379}
                    rating={4}
                />

                <Product
                    id="12321354"
                    title="OnePlus 8 Pro (Glacial Green 12GB RAM+256GB Storage)"
                    image="https://images-na.ssl-images-amazon.com/images/I/61n6Ovq6EdL._SL1500_.jpg"
                    price={59999.00}
                    rating={5}
                />

                <Product
                    id="12321355"
                    title="Sony WH-1000XM3 Industry Leading Wireless Noise Cancelling Headphones"
                    image="https://images-na.ssl-images-amazon.com/images/I/61D4Z3yKPAL._SL1500_.jpg"
                    price={24990.00}
                    rating={4}
                />



            </div>
            <div className="home__row">

                <Product
                    id="12321356"
                    title="Furny Castilla L Shape Sofa Set -RHS 6 Seater Sofa (Cream-Brown)"
                    image="https://images-na.ssl-images-amazon.com/images/I/61leoBbyn2L._SL1100_.jpg"
                    price={24449.00}
                    rating={4}
                />
            </div>

        </div>
    )
}

export default Home
