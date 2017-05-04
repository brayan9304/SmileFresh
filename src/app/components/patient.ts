import {PatientsHistory} from './patientsHistory';

export class Patient{
  id: string;
  firstName : string;
  secondName : string;
  address : string;
  phone : number;
  occupation : string;
  birthdate : string;
  age : number;
  genre : string;
  patientHistory : PatientsHistory;
}
