import { observable, action } from 'mobx';
export interface IApp {
  channelCode?:string;
  isAuthorized?:boolean;
  authorize?: () => void;
}
export default class AppStore implements IApp {
  @observable channelCode = '';
  @observable isAuthorized = false;
  @action authorize() {
    this.isAuthorized = true;
  }
}
