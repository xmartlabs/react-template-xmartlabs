import { Helmet } from "@vuer-ai/react-helmet-async";

export interface MetaHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const DEFAULT_TITLE = "Xmartlabs Template";
const DEFAULT_DESCRIPTION =
  "Xmartlabs React Template - A modern React boilerplate built with Vite";

const MetaHead = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
  noindex = false,
  nofollow = false,
}: MetaHeadProps) => {
  const robotsContent = `${noindex ? "noindex" : "index"}, ${nofollow ? "nofollow" : "follow"}`;

  const meta = {
    ogTitle: ogTitle ?? title,
    ogDescription: ogDescription ?? description,
    ogUrl: ogUrl ?? (typeof window !== "undefined" ? window.location.href : ""),
    twitterTitle: twitterTitle ?? ogTitle ?? title,
    twitterDescription: twitterDescription ?? ogDescription ?? description,
    twitterImage: twitterImage ?? ogImage,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      {meta.ogTitle && <meta property="og:title" content={meta.ogTitle} />}
      {meta.ogDescription && (
        <meta property="og:description" content={meta.ogDescription} />
      )}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {meta.ogUrl && <meta property="og:url" content={meta.ogUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      {meta.twitterTitle && (
        <meta name="twitter:title" content={meta.twitterTitle} />
      )}
      {meta.twitterDescription && (
        <meta name="twitter:description" content={meta.twitterDescription} />
      )}
      {meta.twitterImage && (
        <meta name="twitter:image" content={meta.twitterImage} />
      )}
    </Helmet>
  );
};

export { MetaHead };
