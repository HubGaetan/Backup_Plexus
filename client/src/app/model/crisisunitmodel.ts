export class crisisunitmodel {
    membersId: number;
    crisisId: number;
    isreferent: boolean;

    constructor(member_id = 0, crisis_id = 0, isreferent = false) {
        this.membersId = member_id;
        this.crisisId = crisis_id;
        this.isreferent = isreferent;
    }
}