export class SupplierClass {
  name: string;
  email: string;
  tel: number;
  from = [];
  to = [];
  goods = [];
  reviews = [];


  constructor(name, email, tel, from, to, goods, reviews) {
    this.name = name;
    this.email = email;
    this.tel = tel;
    this.from = from;
    this.to = to;
    this.goods = goods;
    this.reviews = reviews;

  }
}
