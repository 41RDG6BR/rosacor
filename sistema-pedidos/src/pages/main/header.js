import React from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import  HeaderCommon from './header-common'
import HeaderCheckout from './header-checkout'
import { CHECKOUT } from '../../routes'

import { 
    AppBar, 
    Toolbar as MaterialToolbar
} from '@material-ui/core'

const Header = () => (
        <AppBar>
            <Toolbar>
                <Switch>
                    <Route path={CHECKOUT} component={HeaderCheckout} />
                    <Route component={HeaderCommon} />
                </Switch>
                {/* <HeaderCommon /> */}
            </Toolbar>
        </AppBar>
)

const Toolbar =styled(MaterialToolbar)`
    &&{
        margin: 0 auto;
        max-width: 960px;
        width: 100%;
    }
`
export default Header