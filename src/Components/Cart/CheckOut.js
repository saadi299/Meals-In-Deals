import React from "react";
import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

function CheckOut(props) {
  // const formRef = useRef();

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const EnteredName = nameInputRef.current.value;
    const EnteredStreet = streetInputRef.current.value;
    const EnteredPostal = postalInputRef.current.value;
    const EnteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(EnteredName);
    const enteredStreetIsValid = !isEmpty(EnteredStreet);
    const enteredCityIsValid = !isEmpty(EnteredCity);
    const enteredPostalIsValid = isFiveChars(EnteredPostal);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

      if(!formIsValid){
          return;
      }

      props.onConfirm({
          name:EnteredName,
          street:EnteredStreet,
          postal:EnteredPostal,
          city:EnteredCity
      })

      // formRef.current.reset();
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;

  const postalControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}  >
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please Enter a valid name</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please Enter a valid Street</p>}
      </div>

      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && <p>Please Enter a valid postal number</p>}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please Enter a city name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}
export default CheckOut;
