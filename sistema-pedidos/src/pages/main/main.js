import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import Header from './header'
import * as routes from '../../routes'

const ChoosePizzaSize = React.lazy(
    ()=> import('../choose-pizza-size')
)
const ChoosePizzaFlavours = React.lazy(
    ()=> import('../choose-pizza-flavours')
)
const ChoosePizzaQuantity = React.lazy(
    ()=> import('../choose-pizza-quantity')
)
const Checkout = React.lazy(
    ()=> import('../checkout')
)
const CheckoutConfirmation = React.lazy(
    ()=> import('../checkout-confirmation')
)
const CheckoutSuccess = React.lazy(
    ()=> import('../checkout/checkout-success')
)

const Main = () => (
    <>
        <Header />
        
        <Spacer />

        <Suspense fallback='Loading...'>
            <Switch>
                <Route 
                    path={routes.HOME} 
                    exact 
                    component={ChoosePizzaSize} 
                />
                <Route 
                    path={routes.CHOOSE_PIZZA_FLAVOURS} 
                    component={ChoosePizzaFlavours} 
                />
                  <Route 
                    path={routes.CHOOSE_PIZZA_QUANTITY} 
                    component={ChoosePizzaQuantity} 
                />
                  <Route 
                    path={routes.CHECKOUT} 
                    exact
                    component={Checkout} 
                />
                  <Route 
                    path={routes.CHECKOUT_CONFIRMATION} 
                    component={CheckoutConfirmation} 
                />
                  <Route 
                    path={routes.CHECKOUT_SUCCESS} 
                    component={CheckoutSuccess} 
                />
            </Switch>
        </Suspense>
    </>
)

const style =(theme)=> ({
        main: theme.mixins.toolbar
    }
)

const Spacer = withStyles(style)(({classes}) => (
    <div className={classes.main}>Conteudo</div>
))

export default Main