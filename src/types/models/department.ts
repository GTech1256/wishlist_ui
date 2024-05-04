import { DepartmentType } from "types/enums/department";

export interface Department {
  id: string;
  lat: number;
  lng: number;
  num: number;
  type: DepartmentType;
  name: string;
  address: string;
  phone: string;
  workSchedule: string;
}
