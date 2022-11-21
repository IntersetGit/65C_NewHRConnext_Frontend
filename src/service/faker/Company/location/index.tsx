import { faker } from '@faker-js/faker';

export type getCompanylocationType = {
  key : number;
  company_logo?: string;
  company_code: string;
  company_saddress: string;
  company_status: boolean;
  company_name : string;
};

export const getCompanylocation = () => {
  const dataarr: getCompanylocationType[] = [];
  Array.from({ length: 20 }).forEach((e,i) => {
    dataarr.push({
        key : i + 1 ,
        company_code : faker.vehicle.vrm(),
        company_saddress : faker.address.secondaryAddress() + faker.address.buildingNumber() + faker.address.city(),
        company_status : faker.datatype.boolean(),
        company_logo : faker.image.avatar(),
        company_name : faker.company.name()
    });
  });

  return dataarr
};
