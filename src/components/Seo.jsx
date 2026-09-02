import { Helmet } from "react-helmet-async";

/**
 * Reusable SEO komponenta — postavlja <title> i meta description za trenutnu stranicu.
 *
 * Koristi se ovako, na vrhu svake stranice:
 *
 *   import Seo from "../../components/Seo";
 *   import { useTranslation } from "react-i18next";
 *
 *   const { t } = useTranslation();
 *   <Seo title={t("pocetna.meta_title")} description={t("pocetna.meta_description")} />
 */
function Seo({ title, description, image }) {
  const siteName = "Turistička platforma Han Pijesak";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}

      {/* Open Graph — koristi se za preview kad se link deli */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter/X card */}
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}

export default Seo;