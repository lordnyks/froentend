
/*
    // "userId": 1,
    // "dateOfCreation": "1999-12-04",
    // "firstName": "",
    // "lastName": "",
    // "expireDate": "1999-12-04",
    // "plateNumber": "AG 82 VVR",
    // "made": "AUDY",
    // "model": "A6",
    // "description": "asd"
*/

export interface ISubscription {
    userId: number,
    email: string,
    dateOfCreation: Date,
    firstName: string,
    lastName: string,
    expireDate: Date,
    plateNumber: string,
    made: string,
    model: string,
    description: string
}
  
