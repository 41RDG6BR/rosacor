import React, { useContext } from 'react'
import styled from 'styled-components'
import { 
    Card,
    Grid,
    Typography
} from '@material-ui/core'
import { 
    CardLink,
    Content,
    Divider, 
    H3, 
    H4, 
    PizzasGrid
} from '../../ui'
import { singularOrPlural } from '../../utils'
import { AuthContext } from '../../contexts/auth'

import { CHOOSE_PIZZA_FLAVOURS } from '../../routes'
import { useCollection } from '../../hooks'

const ChoosePizzaSize = () => {
    const { userInfo } = useContext(AuthContext)
    // const [pizzasSizes, setPizzaSizes] = useState([])
    const pizzasSizes = useCollection('pizzasSizes')
    const userName = userInfo.user.displayName.split(' ')[0]

    if(!pizzasSizes) {
        return 'Carregando tamanhos...'
    }

    if(pizzasSizes.length === 0){
        return 'Não há dados.'
    }

    return (
        <Content>
            <Grid container direction='column' alignItems='center'>
                <H3>    
                O que vai ser hoje, {userName}? =)
                </H3>    

                <H4>    
                Escolha o pedido
                </H4>    
            </Grid>

            <PizzasGrid>
                {pizzasSizes.map((pizza)=>(
                    <Grid item key={pizza.id} xs>
                        <Card>
                            <CardLink to={{
                                pathname: CHOOSE_PIZZA_FLAVOURS,
                                state: {
                                    ...pizza,
                                    pizzaSize: pizza, 
                                }
                            }}>
                                <PizzaText>{pizza.size}cm</PizzaText>

                                <Divider />

                                <Typography variant='h5'>{pizza.name}</Typography>
                                <Typography>
                                    {pizza.slices} fatias, {' '}
                                    {pizza.flavours} {' '}
                                    {singularOrPlural(pizza.flavours, 'sabor', 'sabores')}
                                </Typography>
                            </CardLink>
                        </Card>
                    </Grid>
                ))}
            </PizzasGrid>
        </Content>
    )
}

// const Pizza = styled.div`
//     align-items: center;
//     background: ${({theme}) => theme.palette.common.white};
//     border: 1px solid ${({theme}) => theme.palette.grey.A100};
//     border-radius: 50%;
//     display: flex;
//     height: 200px;
//     justify-content: center;
//     width: 200px;
//     z-index: 1;
// `

const PizzaText = styled(Typography).attrs({
    variant: 'h5'
})`
    && {
        align-items: center;
        background: ${({theme}) => theme.palette.common.white};
        border-radius: 50%;
        display: flex;
        height: 80px;
        justify-content: center;
        width: 80px;
    }
`

export default ChoosePizzaSize