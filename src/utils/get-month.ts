import dayjs, { Dayjs } from "dayjs";

function getMonth(month: number = dayjs().month()): Dayjs[][] {
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  let currentMonthCount = 0 - firstDayOfMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix
}

export default getMonth;