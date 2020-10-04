import { MdLocalPizza as icon } from 'react-icons/md';

export default {
  // Computer Name
  name: 'pizza',
  // Display name
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the Pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Pizza Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Pizza Price',
      type: 'number',
      description: 'Price of the Pizza in pence',
      validation: (Rule) => Rule.required().min(400).max(5000),
      // TODO: Add custom input component
    },
  ],
};
