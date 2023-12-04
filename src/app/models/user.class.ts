export class UserClass {
    profile: JSON;
    favorites = [];
    color:string;
    id: number
  
    constructor(profile, color, id) {
      this.profile = profile;
      this.color = color
      this.id = id
    }
}
