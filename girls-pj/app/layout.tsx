import { Provider } from "react-redux"; 
import "../app/globals.css";
import store from "../ts/store"; 
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '(G)IDLe site',
    description: '걸그룹 여자아이들 홍보사이트',
  }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
            {children}
        </Provider>
      </body>
    </html>
  )
}