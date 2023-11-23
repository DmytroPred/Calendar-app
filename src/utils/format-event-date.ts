import dayjs from "dayjs";

function formatEventModalDate(date: string | null): string {
  return dayjs(date).format('dddd, MMMM DD');
}

export default formatEventModalDate;