import dayjs from "dayjs";

function formaCalendarDate(monthNumber: number): string {
  return dayjs(new Date(dayjs().year(), monthNumber)).format('MMMM YYYY');
}

export default formaCalendarDate;