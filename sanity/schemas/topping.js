import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  // Computer Name
  name: 'topping',
  // Display name
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Topping  Name',
      type: 'string',
      description: 'Name of the Topping',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Is this topping suitable for vegetarians',
      options: {
        layout: 'checkbox',
      },
    },
  ],
};
