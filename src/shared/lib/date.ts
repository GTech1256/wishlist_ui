import {
  Locale,
  format,
  formatDistanceStrict,
  formatDistanceToNow,
  isPast,
  isValid,
  parse,
  parseISO,
  subDays,
} from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { ru } from "date-fns/locale";

const locale: Locale = ru;

export const stringToDate = (dateString: string, formatString: string = "dd.MM.yyyy"): Date => {
  return parse(dateString, formatString, new Date());
};

export const dateToString = (date: Date = new Date(), formatString: string = "dd.MM.yyyy"): string => {
  return format(date, formatString);
};

export const dateToServer = (date: Date = new Date(), formatString: string = "yyyy-MM-dd"): string => {
  return format(date, formatString);
};

export const stringDateToServer = (dateString: string, formatString: string = "dd.MM.yyyy"): string => {
  return dateToServer(stringToDate(dateString, formatString));
};

export const getISOBakuDateString = () => formatInTimeZone(new Date(), "Asia/Baku", "yyyy-MM-dd'T'HH:mm:ss");

export const serverDateToString = (
  dateString: string | undefined,
  formatString: string = "yyyy-MM-dd",
  toFormat: string = "dd.MM.yyyy"
): string | undefined => {
  return dateString && format(stringToDate(dateString, formatString), toFormat, { locale });
};

export const isValidStringDate = (dateString: string, formatString: string = "dd.MM.yyyy"): boolean => {
  return isValid(stringToDate(dateString, formatString));
};

export const localeDate = (date: Date, formatLocale: string = "d MMMM yyyy"): string => {
  return format(date, formatLocale, { locale });
};

// ISO не учитываем отклонение
export const getISONoDeviation = (dateString: string): string => {
  const match = dateString.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{1,}[.\d]{0,})[+-]\d{2}:\d{2}/);

  return match?.[1] || dateString;
};

export const ISODateToFormat = (dateString: string, formatLocale: string = "d MMMM yyyy"): string => {
  return localeISODate(getISONoDeviation(dateString), formatLocale);
};

export const localeISODate = (dateString: string, formatLocale: string = "d MMMM yyyy"): string => {
  return dateString && format(parseISO(dateString), formatLocale, { locale });
};

export const distanceToDate = (
  startDate: string,
  finishDate: string,
  formatString: string = "dd.MM.yyyy",
  addSuffix = false,
  unit?: any
): string | undefined => {
  if (!startDate || !finishDate) {
    return;
  }

  const finish = stringToDate(finishDate, formatString);
  let start = stringToDate(startDate, formatString);

  if (unit === "day") {
    start = subDays(start, 1);
  }

  return formatDistanceStrict(finish, start, { locale, unit, addSuffix });
};

export const distanceToDateTime = (
  startDate: string,
  startTime = "00:00",
  finishDate: string,
  finishTime = "23:59",
  addSuffix = false
): string | undefined => {
  const start = `${startDate} ${startTime}`;
  const finish = `${finishDate} ${finishTime}`;
  const format = "dd.MM.yyyy HH:mm";

  return distanceToDate(start, finish, format, addSuffix);
};

export const distanceToNow = (dateString: string, formatString: string = "dd.MM.yyyy", addSuffix = false): string => {
  return dateString && formatDistanceToNow(stringToDate(dateString, formatString), { locale, addSuffix });
};

export const distanceToNowTime = (dateString: string, timeString: string, addSuffix = false): string | undefined => {
  const dateTime = `${dateString} ${timeString && timeString.length === 5 ? timeString : "00:00"}`;
  const format = "dd.MM.yyyy HH:mm";

  if (isPast(stringToDate(dateTime, format))) {
    return;
  }

  return distanceToNow(dateTime, format, addSuffix);
};
