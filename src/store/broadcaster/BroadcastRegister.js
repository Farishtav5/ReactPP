import { BehaviorSubject } from "rxjs";

export const Filterchart = new BehaviorSubject("");
export const updateUserList = new BehaviorSubject(0);

export const addTab = new BehaviorSubject({ type: "default" });
