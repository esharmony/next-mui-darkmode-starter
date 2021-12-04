import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavBar from '../navbar';

export default {
  title: 'Components/NavBar',
  component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = () => <NavBar />;

export const navbar = Template.bind({});
