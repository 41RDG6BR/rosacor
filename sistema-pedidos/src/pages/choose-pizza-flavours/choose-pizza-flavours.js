import React, { useState } from 'react'
import styled from 'styled-components'
import t from 'prop-types'
import { Redirect } from 'react-router-dom'

import {
    Card as MaterialCard,
    Grid,
    Typography
} from '@material-ui/core'
import { 
    CardLink,
    Content,
    Divider,
    H4, 
    HeaderContent, 
    PizzasGrid,
    Footer 
} from '../../ui'
import { singularOrPlural, toMoney } from '../../utils'

import { HOME, CHOOSE_PIZZA_QUANTITY } from '../../routes'
import { useCollection } from '../../hooks'

const ChoosePizzaFlavours = ({ location }) => {
    const [checkboxes, setCheckboxes] = useState(() => ({}))
    const pizzasFlavours = useCollection('pizzasFlavours')

    console.log('Log from choose pizza flavours', location)

    if(!location.state) {
        return <Redirect to={HOME} />
    }

    if(!pizzasFlavours) {
        return 'Carregando sabores...'
    }

    if(pizzasFlavours.length === 0){
        return 'Não há dados.'
    }

    const { flavours, id, pizzaSize } = location.state

    const handleChangeCheckbox = (pizzaId) => (e) => {
        console.log(checkboxes)
        if(
            checkboxesChecked(checkboxes).length === flavours &&
            e.target.checked === true
        ) {
            return 
        }

        setCheckboxes((checkboxes)=>{
            return {
                ...checkboxes,
                [pizzaId]: e.target.checked
            }
        })
    }
    
    return (
        <>
            <Content>
                <HeaderContent>
                    <H4>    
                    Escolha até {flavours} {' '} 
                    {singularOrPlural(flavours, 'sabor', 'sabores')}:
                    </H4>    
                </HeaderContent>

                <PizzasGrid>
                    {pizzasFlavours.map((pizza)=>(
                        <Grid item key={pizza.id} xs>
                            <Card checked={!!checkboxes[pizza.id]}>
                                <Label>
                                    <Checkbox 
                                        value=''
                                        checked={!!checkboxes[pizza.id]}
                                        onChange={handleChangeCheckbox(pizza.id)}
                                    />
                                    <Img src={pizza.image} alt={pizza.name} />
                                    <Divider />
                                    <Typography>{pizza.name}</Typography>
                                    <Typography variant='h5'>
                                        {toMoney(pizza.value[id])}
                                    </Typography>
                                </Label>
                            </Card>
                        </Grid>
                    ))}
                </PizzasGrid>
            </Content>

            <Footer 
                buttons={{
                   back: {
                        children: 'Mudar tamanho'
                    },

                   action: {
                        to: {
                            pathname: CHOOSE_PIZZA_QUANTITY,
                            state: {
                                ...location.state,
                                pizzaFlavours: getFlavoursNameAndId({
                                    checkboxes, 
                                    pizzasFlavours
                                }),
                                pizzaSize: pizzaSize,
                            }
                        },
                        children: 'Quantas pizzas?',
                        disabled: checkboxesChecked(checkboxes).length === 0
                    }
                }}
           />
        </>
    )
}

ChoosePizzaFlavours.propTypes = {
    location: t.object.isRequired
}

function checkboxesChecked (checkboxes) {
    return Object.values(checkboxes).filter(Boolean)
}

function getFlavoursNameAndId ({checkboxes, pizzasFlavours}) {
    return Object.entries(checkboxes)
    .filter(([, value]) => !!value)
    .map(([id]) => ({
        id,
        name: pizzasFlavours.find((flavour) => flavour.id === id)
    }))
}

const Card = styled(MaterialCard)`
    && {        
        border: 2px solid transparent; 
        border-color: ${({ theme, checked }) => checked ? theme.palette.primary.light : ''}
    }
`

const Label = styled(CardLink).attrs({
    component: 'label'
})``

const Checkbox = styled.input.attrs({
    type: 'checkbox'
})`
    display: none;
`

const Img = styled.img`
    width: 200px
`
export default ChoosePizzaFlavours