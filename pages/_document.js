import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Concert+One&display=optional'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Coming+Soon&display=optional'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument