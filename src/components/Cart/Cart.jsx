import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './style'
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';


const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    const classes= useStyles();
    
    const EmptyCart=()=>(
        <Typography variant="subtitle1">There Is Nothing In Your Cart,
        <Link to="/" className={classes.link}>Start Adding Some</Link>
        </Typography>
    )

    const FilledCart =()=>(
        <>
        <Grid container spacing={3}>
            {cart.line_items.map((item)=>(
                <Grid item xs={12} sm={4} key={item.id}>
                   <CartItem item={item} onUpdatecartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                </Grid>
            ))}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol} </Typography>
            <div>
            <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
          <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>

            </div>
        </div>
        </>
    );

    if(!cart.line_items) return 'Loading'

    return (
        <div>
           <Container>
               <div className={classes.toolbar}/>
               <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>
               { !cart.total_items ? <EmptyCart />: <FilledCart />}
               </Container> 
        </div>
    )
}

export default Cart
