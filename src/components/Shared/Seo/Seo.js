import Head from "next/head";

export function Seo(props) {
  const {
    title = "OVO Shop",
    description = "Tus prendas favoritas al mejor precio",
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}
