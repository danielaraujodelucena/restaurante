import { Html, Head, Main, NextScript } from "next/document";

/* 
    Padrão NextJS.

    Define a estrutura das páginas que
    serão renderizadas.

    Esse arquivo é renderizado no servidor, ou seja,
    é possível carregar scripts antes da interatividade
    da página.

    As páginas renderizam no <Main />.
*/

export default function Document() {
    return(
        <Html>
            <Head>

            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}