import { useContext } from "react";
import { useNavigate } from "react-router";
import "./cart-dropdown.styles.scss";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {
  const { cartItems , setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
 
  const goToCheckOut = () => {
    navigate('/checkout');
    
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} CartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckOut}> GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
