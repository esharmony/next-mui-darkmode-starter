import { ReactChild, ReactChildren } from 'react';
import Navbar from './navbar';

interface Props {
  children: ReactChild | ReactChildren;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <div>
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
}
