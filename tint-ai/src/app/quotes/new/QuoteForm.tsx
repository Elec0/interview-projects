"use client";


import { createQuote } from "./actions";
import { Path, useForm } from "react-hook-form";
import { useTransition } from "react";

type QuoteFormProps = {};

export type QuoteFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    numberCars: number;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zip: string;
};

export type NewQuoteFormState = {
    message: string;
    errors: Partial<Record<Path<QuoteFormValues>, string>>;
};

export const QuoteForm = ({}: QuoteFormProps) => {
    const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors } } = useForm<QuoteFormValues>({
    reValidateMode: 'onChange'
  });

  const onSubmit = handleSubmit(data => {
    startTransition(() => {
      createQuote(data as unknown as QuoteFormValues);
    });
  });

  return (
    <form onSubmit={onSubmit}>
    <div className="form-field">
        <label htmlFor="firstName">First Name</label>
        <input
        {...register("firstName", { required: "This field is required" })}
        id="firstName"
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
    </div>

    <div className="form-field">
        <label htmlFor="lastName">Last Name</label>
        <input
        {...register("lastName", { required: "This field is required" })}
        id="lastName"
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
    </div>

    <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
        type="email"
        {...register("email", { required: "This field is required" })}
        id="email"
        />
        {errors.email && <span>{errors.email.message}</span>}
    </div>

    <div className="form-field">
        <label htmlFor="numberCars">Number of Cars</label>
        <input
        type="number"
        {...register("numberCars", { required: "This field is required" })}
        id="numberCars"
        />
        {errors.numberCars && <span>{errors.numberCars.message}</span>}
    </div>

    <div className="form-field">
        <label htmlFor="addressLine1">Address Line 1</label>
        <input
        {...register("addressLine1", {
            required: "This field is required",
        })}
        id="addressLine1"
        />
        {errors.addressLine1 && <span>{errors.addressLine1.message}</span>}
    </div>

    <div className="form-field">
        <label htmlFor="addressLine2">Address Line 2</label>
        <input {...register("addressLine2")} id="addressLine2" />
    </div>

    <div className="form-field">
        <label htmlFor="city">City</label>
        <input
        {...register("city", { required: "This field is required" })}
        id="city"
        />
        {errors.city && <span>{errors.city.message}</span>}
    </div>

    <div className="form-field">
        <label htmlFor="state">State</label>
        <input
        {...register("state", { required: "This field is required" })}
        id="state"
        />
        {errors.state && <span>{errors.state.message}</span>}
    </div>

    <div className="form-field">
        <label htmlFor="zip">ZIP Code</label>
        <input
        {...register("zip", { required: "This field is required" })}
        id="zip"
        />
        {errors.zip && <span>{errors.zip.message}</span>}
    </div>
    
    <button type="submit" disabled={isPending}>Submit</button>
    </form>
  );
};
