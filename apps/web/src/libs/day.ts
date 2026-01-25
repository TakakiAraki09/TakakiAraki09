import dayjs from "dayjs";
type Args = Parameters<typeof dayjs>[0];
export const day = dayjs;

export const formatDay = ({
  day,
  format,
  defaultValue = '-',
}: { day: Args; format: string, defaultValue?: string }): string => !day ? defaultValue : dayjs(day).format(format);
