import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavBar from '../navbar';

export default {
  title: 'Components/NavBar',
  component: NavBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = () => <NavBar />;

export const Primary = Template.bind({});
