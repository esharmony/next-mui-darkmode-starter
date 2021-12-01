import { ReactChild, ReactChildren } from 'react';
import Navbar from './navbar';

interface Props {
  children: ReactChild | ReactChildren;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
