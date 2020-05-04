import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

export default function Form() {

    const initialState = {
        name: '',
        size: '',
        sauce: '',
        toppings: '',
        instructions: ''
    }

    const [pizzaForm, setPizzaForm] = useState(initialState);
    const [post, setPost] = useState([]);
    const [serverError, setServerError] = useState('');
    const [errors, setErrors] = useState(initialState);

    const formSchema = yup.object().shape({
        name: yup.string().required('Please enter a name').min(2),
        size: yup.string().required('Please select a size'),
        sauce: yup.boolean().oneOf([true]),
        toppings: yup.boolean().oneOf([true]),
        instructions: yup.string()
    })

    const validateChange = e => {
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.value)
          .then(valid => {
               setErrors({...errors, [e.target.name]: ''});
          })
          .catch(err => {
              setErrors({...errors, [e.target.name]: err.errors[0]});
          });
    };

   const handleChange = e => {
       e.persist();
       const newPizzaForm = {
           ...pizzaForm, [e.target.name] : 
           e.target.type === 'checkbox' ? e.target.checked :
           e.target.type === 'radio' ? e.target.checked
           : e.target.value
       };
       validateChange(e);
       setPizzaForm(newPizzaForm);
   }

   const onSumbit = e => {
       e.preventDefault();

       axios
       .post('https://reqres.in/api/unknown', pizzaForm)
       .then(res => {
        setPost(res.data);

    setPizzaForm(initialState);
    setServerError(null);
    })
    .catch(err => {
        setServerError(alert('There was a server error'));
    }); 
};

    return (
        <form onSubmit={onSumbit}>
            {serverError ? <p className='error'>{serverError}</p> : null}
            <label htmlFor='name' className='name'>
                Name:
                <input
                    id='name'
                    type='text'
                    minLength='2'
                    name='name'
                    onChange={handleChange}
                    value={pizzaForm.name}
                    data-cy='name'
                    />
                    {errors.name.length > 0 ? <p className='errors'>{errors.name}</p> : null}
            </label>



          <label htmlFor="size">
                <p className='size'>Choice of Size</p>
        <select id="size" name="size" onChange={handleChange}>

          <option value="">--Please choose a size--</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="extralarge">Extra Large</option>

        </select>
        {errors.name.length > 0 ? <p className='errors'>{errors.size}</p> : null}
         </label>

<div className='sauce'>Choice of Sauce </div>

      <label htmlFor='sauce' className='sauce-form'>
             
              <input
                  id='sauce'
                  type='radio'
                  name='sauce'
                  onChange={handleChange}
                  checked={pizzaForm.sauce}
                  value='Original Marinara'
                  />
              <p className='sauce-choice'>Original Marinara</p>  
          </label>
          <label htmlFor='sauce' className='sauce-form'>
            
            <input
                id='sauce'
                type='radio'
                name='sauce'
                onChange={handleChange}
                checked={pizzaForm.sauce}
                value='Garlic Ranch'
                />
               <p className='sauce-choice'>Garlic Ranch</p>  
        </label>
        <label htmlFor='sauce' className='sauce-form'>
            
            <input
                id='sauce'
                type='radio'
                name='sauce'
                onChange={handleChange}
                checked={pizzaForm.sauce}
                value='Alfredo Sauce'
                />
              <p className='sauce-choice'>Alfredo Sauce</p>  
        </label>
        <label htmlFor='sauce' className='sauce-form'>
           
            <input
                id='sauce'
                type='radio'
                name='sauce'
                onChange={handleChange}
                checked={pizzaForm.sauce}
                value='BBQ Sauce'
                />
                <p className='sauce-choice'>BBQ Sauce</p>  
        </label>

  {errors.name.length > 0 ? <p className='errors'>{errors.sauce}</p> : null}

        <div className='toppings'>Add Toppings</div>

        <label htmlFor='toppings' className='top-form'>
            
            <input
                type='checkbox'
                name='toppings'
                onChange={handleChange}
                checked={pizzaForm.toppings}
                value='Pepperoni'
                />
               <p className='top-choice'>Pepperoni</p> 
        </label>

      

        <label htmlFor='toppings' className='top-form'>
            
            <input
                type='checkbox'
                name='toppings'
                onChange={handleChange}
                checked={pizzaForm.toppings}
                value="Sausage"
                />
                <p className='top-choice'>Sausage</p> 
        </label>

        <label htmlFor='toppings' className='top-form'>
            
            <input
                type='checkbox'
                name='toppings'
                onChange={handleChange}
                checked={pizzaForm.toppings}
                value='Bacon'
                />
                <p className='top-choice'>Bacon</p> 
        </label>

        <label htmlFor='toppings' className='top-form'>
            
            <input
                type='checkbox'
                name='toppings'
                onChange={handleChange}
                checked={pizzaForm.toppings}
                value='Olives'
                />
                <p className='top-choice'>Olives</p> 
        </label>

        <label htmlFor="instructions">
        <p className='instructions'>Special Instructions</p>
        <textarea
          id='instructions'
          name="instructions"
          placeholder={`Anything else you'd like to add?`}
          onChange={handleChange}
          value={pizzaForm.instructions}
        />
      </label>

      {errors.name.length > 0 ? <p className='errors'>{errors.toppings}</p> : null}

      <button type='submit' className='formButton'>Add To Order</button>

      <pre className='pre'>{JSON.stringify(post, null, 2)}</pre>

        </form>
    )

}