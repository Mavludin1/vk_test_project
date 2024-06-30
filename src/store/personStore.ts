import { makeAutoObservable } from "mobx";
import ApiService from "../api/fetchApi";
import { AllInfoPerson } from "../types/types";

class PersonStore {
  person: AllInfoPerson | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  getPerson = async (id: number) => {
    try {
      const res = await ApiService.loadPerson(id);
      this.person = res;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new PersonStore();
