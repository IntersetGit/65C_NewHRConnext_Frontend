import { gql } from '../../../__generated__';

export const HOLIDAY_YEAR = gql(`
query GetHoliDayYear {
    GetHoliDayYear {
      id
      day
      month
      year
      holiday_name
    }
  }
`);