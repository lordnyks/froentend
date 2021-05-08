// {
//   "password": "$2a$10$e6EjOazPGWohSUuWaNgJnukAYWyOj9iYBEyjM.0ZtUWk0r.RzJfMa",
//   "email": "lordnyks@gmail.com",
//   "username": "lordnyks@gmail.com",
//   "profile": {
//       "id": 1,
//       "firstName": "Nicusor",
//       "lastName": "Vlads",
//       "phoneNumber": "0755123463",
//       "address": {
//           "county": null,
//           "city": null,
//           "townShip": null,
//           "village": null,
//           "street": null,
//           "gateNumber": null
//       },
//       "dateOfBirth": "1999-12-03T22:00:00.000+00:00",
//       "gender": "masculin",
//       "age": null,
//       "personalIdentificationNumber": null
//   }
// }

import { IAddress } from "./IAddress";

export interface IProfile {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: IAddress;
  dateOfBirth?: Date;
  gender?: string;
  age?: number;
  personalIdentificationNumber?: string;
}
