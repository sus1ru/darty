import { Helmet } from "react-helmet-async";

export default function SeoHead({ dark, state, currentPlayer }) {
  return (
    <Helmet>
      <title>
        {state.status === "finished"
          ? `🏆 ${state.winner} wins! – Darty`
          : state.status === "playing"
            ? `🎯 ${currentPlayer.name}'s turn (${currentPlayer.score} left) – Darty`
            : "Darty – Dart Game Score Calculator"}
      </title>

      <meta
        name="description"
        content="Darty is a free, real-time dart game score calculator for 301, 501, 701 and 1001 x01 double-out formats. Track legs, undo throws, and play in dark or light mode."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://darty.app/" />
      <meta property="og:site_name" content="Darty" />
      <meta property="og:title" content="Darty – Dart Game Score Calculator" />
      <meta
        property="og:description"
        content="Track every throw in real time. 301 / 501 / 701 / 1001 double-out x01 darts scorer with leg tracking, undo, and dark mode."
      />
      <meta property="og:image" content="https://darty.app/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Darty – Dart Game Score Calculator" />
      <meta
        name="twitter:description"
        content="Track every throw in real time. 301 / 501 / 701 / 1001 double-out x01 darts scorer with leg tracking, undo, and dark mode."
      />
      <meta name="twitter:image" content="https://darty.app/og-image.png" />

      <link rel="canonical" href="https://darty.app/" />
      <meta name="theme-color" content={dark ? "#07110f" : "#eef3ef"} />
    </Helmet>
  );
}
