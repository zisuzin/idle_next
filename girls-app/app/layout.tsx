"use client" 
import { Provider } from "react-redux"; 
import "../app/globals.css";
import { store, persistor } from "../ts/store"; 
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
      </body>
    </html>
  )
}