export class meetingsmodel {
    id: number;
    title: string;
    meetingdate: string;
    starttime: string;
    endtime: string;
    localisation: string;
    isvisio: boolean;
    crisisId: number;


    constructor(id = 0, title = '', meetingdate = '', starttime = '', endtime = '', localisation = '', isvisio = false, crisisId = 0) {
        this.id = id;
        this.title = title;
        this.meetingdate = meetingdate;
        this.starttime = starttime;
        this.endtime = endtime;
        this.localisation = localisation;
        this.isvisio = isvisio;
        this.crisisId = crisisId;
    }

}