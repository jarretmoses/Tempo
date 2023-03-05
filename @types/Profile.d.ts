declare namespace Tempo {
  export interface IPosition {
    title: string;
    pay?: string;
  }

  export interface IOwnerFormData {
    companyName: string;
    companyType: string;
    about: string;
    positions: IPosition[];
  }
}
