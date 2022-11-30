import User from "./User"

export default class Room {
  id: string
  name: string
  nbPlayers: number = 10
  nbTimes: number = 7
  nbQuestions: number = 15
  host: User
  users: User[] = []
  constructor(id: string, name: string, host: User) {
    this.id = id;
    this.name = name
    this.host = host
  }

  addUser(user: User) {
    this.users.push(user)
  }
}
