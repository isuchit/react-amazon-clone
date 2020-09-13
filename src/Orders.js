import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import './Orders.css'
import Order from './Order'
import { useStateValue } from './StateProvider';
import FlipMove from 'react-flip-move'

function Orders() {

    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        } else {
            setOrders([])
        }
    }, [user])


    return (
        <div className="orders">
            <h1>Your Orders</h1>


            <div className="orders__order">
                <FlipMove>
                    {orders?.map(order => (
                        <Order order={order} />
                    ))}
                </FlipMove>
            </div>
        </div>

    )
}

export default Orders
