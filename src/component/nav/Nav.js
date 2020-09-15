import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';


const Nav = () => {
    return (
        <Grid>  
             <Paper>
                <MenuList>
                    <Link to="/firstpage">
                    <MenuItem>Страница 1</MenuItem>
                    </Link>
                    <Link to="/secondpage">
                    <MenuItem>Страница 2 </MenuItem>
                    </Link>
                </MenuList>
             </Paper>
        </Grid>
       
    )
}

export default Nav;