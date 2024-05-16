export class meetingsmodel {
    id: number;
    title: string;
    meetingdate: string;
    starttime: string;
    endtime: string;
    crisisId: number;


    constructor(crisis_id = 0, title = '', meetingdate = '', starttime = '', endtime = '', crisisId = 0) {
        this.id = crisis_id;
        this.title = title;
        this.meetingdate = meetingdate;
        this.starttime = starttime;
        this.endtime = endtime;
        this.crisisId = crisisId;
    }

}