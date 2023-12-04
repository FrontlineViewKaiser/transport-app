export class UserClass {
    profile: JSON;
    favorites = [];
    status: string;
    color:string;
    id: number
  
    constructor(profile, status, color, id) {
      this.profile = profile;
      this.status = status;
      this.color = color
      this.id = id
    }
}
