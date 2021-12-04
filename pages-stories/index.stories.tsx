import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Index from '../pages';

export default {
  title: 'Pages/Index',
} as ComponentMeta<typeof Index>;

const Template: ComponentStory<typeof Index> = () => {
  return <Index />;
};

export const page = Template.bind({});
