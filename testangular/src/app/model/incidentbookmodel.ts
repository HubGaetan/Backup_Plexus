export class incidentbookmodel {
    crisisId: number;
    membersId: number;
    title: string;
    content: string;
    messagedate: string;
    isevent: boolean;

    constructor(crisis_id = 0, member_id = 0, title = '', content = '', messagedate = '', isevent = false) {
        this.crisisId = crisis_id;
        this.membersId = member_id;
        this.title = title;
        this.content = content;
        this.messagedate = messagedate;
        this.isevent = isevent;
    }
}