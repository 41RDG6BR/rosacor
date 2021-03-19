import React from 'react'
import styled from 'styled-components'
import { 
    Link 
} from 'react-router-dom'
import { 
    Grid,
    Paper,
    Button,
 } from '@material-ui/core'
import { 
    Content,
    OrderInfo,
    Title as UiTitle
} from '../../ui'
import FooterCheckout from '../checkout/footer-checkout'
import FormAddress from './form-address'
import { CHECKOUT_CONFIRMATION } from '../../routes'
import { useOrder } from '../../hooks'
import PhoneField from './phone-field'

function Checkout () {
    const { addAddress, addPhone } = useOrder()
    return (
        <>
        <Content>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <Title>Qual o endereço para entrega?</Title>
                    <PaperContainer>
                        <FormAddress onUpdate={addAddress} />
                    </PaperContainer>

                    <Title>Qual o seu telefone?</Title>
                    <PaperContainer>
                        <PhoneField onUpdate={addPhone} />
                    </PaperContainer>
                </Grid>

                <Grid container item xs={12} md={6} direction='column'>
                <Title>Informações do seu pedido</Title>
                    <PaperContainer>
                        <OrderInfo showOptions />
                    </PaperContainer>
                </Grid>
            </Grid>
        </Content>
        <FooterCheckout>
            <Button 
                variant='contained' 
                color='primary'
                component={Link}
                to={CHECKOUT_CONFIRMATION}
            >
                Confirmar dados
            </Button>
        </FooterCheckout>
        </>
    )
}

const Title = styled(UiTitle)`
    && {
        text-align: left;
    }
`

const PaperContainer = styled(Paper)`
    &&{
        flex-grow: 1; 
        margin-bottom: ${({theme}) => theme.spacing(5)}px;
        padding: ${({theme}) => theme.spacing(2)}px;
    }
`

export default Checkout 