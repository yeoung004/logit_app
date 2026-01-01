//@ts-nocheck

import "intl";
import "react-intl";

import "@formatjs/intl-datetimeformat/polyfill-force";
import "@formatjs/intl-displaynames/polyfill-force";
import "@formatjs/intl-getcanonicallocales/polyfill-force";
import "@formatjs/intl-locale/polyfill-force";
import "@formatjs/intl-numberformat/polyfill-force";
import "@formatjs/intl-pluralrules/polyfill-force";

import "@formatjs/intl-datetimeformat/add-all-tz";

// import default
import "@formatjs/intl-datetimeformat/locale-data/en";
import "@formatjs/intl-numberformat/locale-data/en";

import en from '@/assets/intl/en.json';
import ko from '@/assets/intl/ko.json';


// dayjs polyfill
import dayjs from "dayjs";

const APP_LOCALE_TYPE_LIST = ["en", "ko"] as const;
export type AppLocaleType = (typeof APP_LOCALE_TYPE_LIST)[number];

export async function setupPolyfill(locale: AppLocaleType) {
  // This platform already supports Intl.Locale
  const importPromise: Promise<any>[] = [];

  switch (locale) {
    case "en": {
      // use default
      importPromise.push(import("@formatjs/intl-pluralrules/locale-data/en"));
      importPromise.push(import("@formatjs/intl-displaynames/locale-data/en"));

      // dayjs
      dayjs.locale(await import("dayjs/locale/en"));
      break;
    }

    case "ko": {
      importPromise.push(import("@formatjs/intl-pluralrules/locale-data/ko"));
      importPromise.push(import("@formatjs/intl-numberformat/locale-data/ko"));
      importPromise.push(
        import("@formatjs/intl-datetimeformat/locale-data/ko")
      );
      importPromise.push(import("@formatjs/intl-displaynames/locale-data/ko"));

      // dayjs
      dayjs.locale(await import("dayjs/locale/ko"));
      break;
    }
  }

  await Promise.all(importPromise);
}

export function fallbackLocale(locale?: string | null): AppLocaleType {
  return (
    APP_LOCALE_TYPE_LIST.find(
      (v) => v.toLowerCase() === locale?.toLowerCase()
    ) ?? APP_LOCALE_TYPE_LIST[0]
  );
}

export const getLocaleToMessages = (locale: string) => {
  switch (locale) {
    case "en":
      return en;
    case "ko":
      return ko;
  }
};
