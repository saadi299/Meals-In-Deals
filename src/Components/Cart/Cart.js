import { useContext, useState } from "react";
import React from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";
const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckOut(true);
  };
  let message = null;
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-a4f0f-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onHideCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span></span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckOut onCancel={props.onHideCart} onConfirm={submitOrderHandler} />
      )}
      {message}
      {!isCheckOut && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Submitting Order...</p>
  const didSubmitModalContent = <React.Fragment>
    <p> Order Successfully Placed</p>
    <button onClick={props.onHideCart} >
        Close
      </button>
  </React.Fragment>



  return <Modal onClose={props.onHideCart}>
    {!isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && !didSubmit && isSubmittingModalContent}
    {didSubmit &&  !isSubmitting && didSubmitModalContent } 
  </Modal>;
};
export default Cart;
