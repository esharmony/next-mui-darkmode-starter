import { ReactChild, ReactChildren } from 'react';
import Navbar from './navbar';

interface Props {
  children: ReactChild | ReactChildren;
  loaded: string;
}
export default function Layout({ children, loaded }: Props) {
  return (
    <div style={{ display: loaded }}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
