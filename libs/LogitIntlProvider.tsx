import { useAsyncEffect } from "@/hooks/useAsyncEffect";
import { useSplashLoading } from "@/hooks/useSplashLoading";
import { useCalendars, useLocales } from "expo-localization";
import React from "react";
import { IntlProvider } from "react-intl";
import {
  fallbackLocale,
  getLocaleToMessages,
  setupPolyfill,
} from "./polyfill-intl";

export const LogitIntlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { timeZone } = useCalendars()[0];

  const [ready, setReady] = React.useState(false);

  const [, setLoading] = useSplashLoading("intl-polyfill");
  const { languageCode: locale } = useLocales()[0];

  const messages = React.useMemo(() => {
    if (!locale) {
      return {};
    }

    return getLocaleToMessages(locale);
  }, [locale]);

  useAsyncEffect(
    async (subscribedRef) => {
      setLoading(true);

      try {
        setReady(false);

        await setupPolyfill(fallbackLocale(locale));

        if (subscribedRef.isMounted()) {
          setReady(true);
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    },
    [locale]
  );

  if (!ready || !timeZone || locale == null) {
    return null;
  }

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
      onError={onError}
    >
      {children}
    </IntlProvider>
  );
};

const onError: React.ComponentProps<typeof IntlProvider>["onError"] = (err) => {
  switch (err.code) {
    case "MISSING_TRANSLATION": {
      console.error(`Missing ${err.descriptor?.id}: `, err.toString());
      break;
    }

    case "FORMAT_ERROR": {
      console.error(`${err.descriptor?.id} has format err: `, err.toString());
      break;
    }

    default: {
      console.error(`${err} has something wrong: `, err.toString());

      break;
    }
  }
};
