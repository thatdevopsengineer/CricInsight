import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { Input, InputLabel, FormControl, FormHelperText, Box } from "@mui/material";
import { Button } from "@mui/material";
import { Card, CardContent, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {  Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const CheckoutForm = ({ amount, data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardholderName] = useState("");
  const [paymentError, setPaymentError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setPaymentError(null);
    setLoading(true);

    try {
      if (!elements || !stripe) {
        toast.error("Stripe.js has not loaded yet.");
        setLoading(false);
        return;
      }

      const card = elements.getElement(CardElement);
      if (card == null) {
        return;
      }

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setPaymentError(submitError.message);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/payments/intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount * 100,
            currency: "usd",
            paymentMethodType: "card",
          }),
        }
      );

      if (!res.ok) {
        const errorMessage = `Failed to create Payment: ${res.statusText}`;
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const { client_secret: clientSecret } = await res.json();

      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: cardholderName,
            },
          },
        });

      if (paymentError) {
        setPaymentError(paymentError.message);
        toast.error("Payment Failed");
        return;
      }

      if (paymentIntent.status === "succeeded") {
        toast.success("Payment done Successfully");
        setTimeout(() => {
          navigate("/dashboard/adaptive-learning");
        }, 2000);

      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={3}>
       <ToastContainer
        transition={Zoom}
      />

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="cardHolderName">Card Holder Name</InputLabel>
          <Input
            id="cardHolderName"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="John Doe"
            required
            sx={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              "&:focus": { borderColor: "#3f51b5" },
            }}
          />
        </FormControl>
      </Box>

      <Box mb={3}>
        <FormControl fullWidth variant="outlined">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </FormControl>
      </Box>

      {paymentError && (
        <FormHelperText error>{paymentError}</FormHelperText>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={!stripe || !elements || loading}
        fullWidth
        sx={{
          mt: 3,
          py: 2,
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "none",
          borderRadius: "8px",
          bgcolor: '#030947'
        }}
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </Button>
    </form>
  );
};

const options = {
  business: {
    name: "StarStudent",
  },
  mode: "payment",
  amount: 29,
  currency: "usd",
  appearance: {
    theme: "stripe",
    variables: {
      colorPrimary: "#1A237E",
      fontFamily: "Poppins, sans-serif",
      colorTextPlaceholder: "hsl(235.00 11.11% 78.82%)",
    },
    rules: {
      ".Input": {
        borderColor: " hsl(235.00 11.11% 78.82%)",
      },
    },
  },
};

const PaymentForm = () => {
  const { state } = useLocation();
  let amount = 29;

  options.amount = amount;

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 30,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt="CricInsight"
          sx={{
            width: 60,
            height: 60,
            objectFit: "contain",
            mr: 2,
          }}
        />
        <Box>
          <Typography variant="h5" sx={{
            fontWeight: "600",
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          }}>
            Review & Pay
          </Typography>
          <Typography variant="body2" sx={{ color: "gray", fontSize: "14px" }}>
            Enter your card details below to complete the payment.
          </Typography>
        </Box>
      </Box>

      <CardContent>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm amount={options.amount} data={state} />
        </Elements>
      </CardContent>
    </Box>
  );

};

export default PaymentForm;
