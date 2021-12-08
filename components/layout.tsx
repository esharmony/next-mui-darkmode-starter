import { ReactChild, ReactChildren } from 'react';
import Navbar from './navbar';

interface Props {
  children: ReactChild | ReactChildren;
  loaded: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}
export default function Layout({ children, loaded, theme }: Props) {
  return (
    <>
      <div
        style={{
          display: loaded ? 'none' : 'block',
          background: theme.palette.background.default,
          width: '100%',
          height: '100vh',
        }}
      ></div>
      <div style={{ display: loaded ? 'block' : 'none' }}>
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
}
