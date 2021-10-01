import { useContext } from "react";
import CartContext from "../../Store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const reducer = (currentAmount, item) => {   //const reducer = (previousValue, currentValue) => previousValue + currentValue;
    return currentAmount + item.amount;
  };
  const numberOfCartItems = cartCtx.items.reduce(reducer, 0);
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
