import { gql } from '../../../__generated__';

export const FETCH_ALL_HOLIDAY = gql(`
query GetHolidayDate($year: Int) {
  GetHolidayDate(year: $year) {
    data {
      year
      count
      child {
        id
        holiday_name
        day
        month
        year
        status
        holiday_yearId
      }
    }
  }
}
`);

export const HOLIDAY_YEAR = gql(`
query GetHoliDayYear($year: Int) {
  GetHoliDayYear(year: $year) {
      id
      day
      month
      year
      holiday_name
    }
  }
`);

export const CREATE_HOLIDAY_YEAR = gql(`
mutation CreateHolidayYear($data: [CreateHolidayYears!]) {
  createHolidayYear(data: $data) {
    message
    status
  }
}
`);

export const CREATE_HOLIDAY_DATE = gql(`
mutation CreateAndUpdateHolidayDate($data: [CreateHolidayDate!]) {
  createAndUpdateHolidayDate(data: $data) {
    message
    status
  }
}
`);
