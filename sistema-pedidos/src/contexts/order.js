import React, { createContext, useState } from 'react'
import t from 'prop-types'
import { uuid } from 'uuidv4'
import firebase, { db } from '../services/firebase'
import { useAuth } from '../hooks'

const OrderContext = createContext()

function OrderProvider ({children}) {
    const [pizzas, addPizza] = useState([])
    const [ orderInProgress, setOrderInProgress ] = useState(false)
    const [phone, addPhone] = useState('')
    const [address, addAdress] = useState({})
    const { userInfo } = useAuth()

    function addPizzaToOrder (pizza) {
        if (orderInProgress) {            
           return addPizza((pizzas) => pizzas.concat(newPizza(pizza)))
        }
        setOrderInProgress(true)
        addPizza([pizza])
    }

    function newPizza (pizza) {
        return {
            id: uuid(), 
            ...pizza
        }
    }

    function removePizzaFromOrder (id) {
        console.log('removepizza', id)
        // addPizza((pizzas) => pizzas.filter(p => p.id !== id))
    }

    async function sendOrder () {     
        // console.log('send order', pizzas)
        try {
            await db.collection('orders').add({
                userId: userInfo.user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                address,
                phone,
                pizzas: pizzas.map(pizza => ({
                    size: pizza.pizzaSize,
                    flavours: pizza.pizzaFlavours,
                    quantity: pizza.quantity

                }))
            })
        } catch (e) {
            console.log('erro ao salvar o pedido')
        }
        setOrderInProgress(false)
    }

    return (
        <OrderContext.Provider value={{
            order: {
                pizzas,
                address,
                phone
            },
            addPizzaToOrder,
            removePizzaFromOrder,
            addAdress,
            addPhone,
            sendOrder
        }}>
            {children}
        </OrderContext.Provider>
    )
}

OrderProvider.propTypes = {
    children: t.node.isRequired
}

export { OrderProvider, OrderContext }