import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import {
    IconButton,
    Typography,
    Menu,
    MenuItem
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { AuthContext } from '../../contexts/auth'

function HeaderCommon () {
    const [anchorElement, setAnchorElement] = useState(null)
    const { userInfo, logout } = useContext(AuthContext)
    const userName = userInfo.user.displayName.split(' ')[0]

    const handleOpenMenu = (e) => {
        setAnchorElement(e.target)
    }

    const handleClose = () => {
        setAnchorElement(null)
    }

    return (
        <>
            <LogoContainer>
                    {userName}
                </LogoContainer>

                <Typography color='inherit'>
                    Olá {userName} =)
                </Typography>

                <IconButton color='inherit' onClick={handleOpenMenu}>
                    <AccountCircle />
                </IconButton>

                <Menu 
                    open={Boolean(anchorElement)}
                    onClose={handleClose}
                    anchorEl={anchorElement}
                >
                    <MenuItem onClick={logout}>
                        Sair
                    </MenuItem>  
                </Menu>
        </>
    )
}

const LogoContainer = styled.div`
    flex-grow: 1;
`

export default HeaderCommon