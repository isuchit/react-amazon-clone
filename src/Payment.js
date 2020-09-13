import React ,{useState, useEffect} from 'react'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import CurrencyFormat from 'react-currency-format'
import { Link, useHistory } from 'react-router-dom'
import './Payment.css'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { getBasketTotal } from './reducer'
import axios from './axios';
import { db }  from './firebase'
import FlipMove from 'react-flip-move'

function Payment() {

    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(( { paymentIntent }) => {


            //dataBAse push
            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })


             setSucceeded(true);
             setError(null)
             setProcessing(false)

             dispatch({
                 type: 'EMPTY_BASKET'
             })

             history.replace('/orders')
        })

    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message  : "")
    }

    

    return (
        <div className="payment">

            <div className="payment__container">
                <h1>
                    Checkout (
                        
                        {<Link to='/ch eckout'>{basket?.length} items</Link>}
                    )
                </h1>


                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__addImage">
                        <img src="/map.jpg" alt=""/>
                    </div>
                    <br/>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>#39  Residency Road</p>
                        <p>Bengaluru, KA</p>
                    </div>
                   
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
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
                    </div>

                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    
                    <div className="payment__details">
                    <div className="payment__cardImage">
                            <img src="/card.png" alt=""/>
                        </div>
                            <form onSubmit={handleSubmit}>
                                
                                <CardElement onChange={handleChange}/>

                                <div className="payment__priceContainer">
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"₹"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                    </button>
                                </div>

                                {error && <div>{error}</div>}
                            </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Payment
