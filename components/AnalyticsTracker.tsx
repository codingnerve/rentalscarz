import Script from "next/script";

export function AnalyticsTracker() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {/* 1. Google Consent Mode v2 Default Script */}
      <Script
        id="google-consent-mode-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Check stored consent
            var storedConsent = null;
            try {
              storedConsent = JSON.parse(localStorage.getItem('rentalscarz_cookie_consent'));
            } catch(e) {}

            var hasAnalytics = storedConsent ? storedConsent.analytics : false;
            var hasMarketing = storedConsent ? storedConsent.marketing : false;

            gtag('consent', 'default', {
              'analytics_storage': hasAnalytics ? 'granted' : 'denied',
              'ad_storage': hasMarketing ? 'granted' : 'denied',
              'ad_user_data': hasMarketing ? 'granted' : 'denied',
              'ad_personalization': hasMarketing ? 'granted' : 'denied',
              'wait_for_update': 500
            });
            gtag('js', new Date());
          `,
        }}
      />

      {/* 2. Google Tag Manager / GA4 Loader (only loads if configured) */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                gtag('config', '${gaId}', {
                  anonymize_ip: true,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
