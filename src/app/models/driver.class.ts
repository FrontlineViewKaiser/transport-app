export class DriverClass {
    name: string;
    email: string;
    tel: number;
    from = [];
    to = [];
    vehicle: string;
    goods = [];
    reviews = [];
  
    constructor(name, email, tel, from, to, vehicle, goods, reviews) {
      this.name = name;
      this.email = email;
      this.tel = tel;
      this.from = from;
      this.to = to;
      this.vehicle = vehicle;
      this.goods = goods;
      this.reviews = reviews;
    }
}
