import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import FlipMove from 'react-flip-move'

import { useStateValue } from './StateProvider'
function Checkout() {

    const [{ basket, user }, disptch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad"
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Books/062020/Bookbazaar/Header_showcases._CB407576112_SY500_.jpg" alt="" />



                {basket?.length === 0 ? (
                    <div>
                        <h2>Your shopping basket is empty</h2>
                        <p>
                            You have no items in your cat. To buy one, click on "Add to Cart"
                            next to the item
                        </p>
                    </div>
                ) : (
                        <div>
                            <h3>Hello, {user ? user.email : 'Guest'}</h3>
                            <h2 className="checkout__title">Your shopping Basket</h2>
                            <FlipMove>
                                {basket.map(item => (
                                    <CheckoutProduct
                                        id={item.id}
                                        title={item.title}
                                        image={item.image}
                                        price={item.price}
                                        rating={item.rating}
                                    />
                                ))}
                            </FlipMove>
                            {/* CheckoutProduct */}
                        </div>
                    )}

            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>

        </div>
    )
}

export default Checkout
