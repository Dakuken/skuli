export default class User {
  id: string
  userName: string
  isReady: boolean = false
  score : number = 0

  constructor(id: string, userName: string) {
    this.id = id
    this.userName = userName
  }

}
