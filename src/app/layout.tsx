import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nano Ponce Fit - Baja entre 5 y 15 kilogramos de grasa con mi metodo ERF para adultos ocupados",
  description: "Nano Ponce Fit - Baja entre 5 y 15 kilogramos de grasa con mi metodo ERF para adultos ocupados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Meta Pixel Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* Meta Pixel NoScript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=PIXEL_ID&ev=PageView&noscript=1"
          />
        </noscript>

      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
