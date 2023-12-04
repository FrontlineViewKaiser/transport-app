export class ReviewClass {
    reviewer:string;
    body:string;
    score:number;

    constructor(body, score, reviewer) {
        this.reviewer = reviewer
        this.body = body
        this.score = score
    }
}
