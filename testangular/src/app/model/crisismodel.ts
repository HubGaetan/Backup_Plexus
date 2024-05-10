export class crisismodel {
    crisis_id: number;
    title: string;
    pathToImage: string;
    objective: string;
    description: string;
    startdate: string;
    enddate: string;
    status: string;
    localisation: string[];
    pathToFiles: string[];

    constructor(crisis_id = 0, title = '', pathToImage = '', objective = '', description = '', startdate = '', enddate = '', status = '', localisation = [], pathToFiles = []) {
        this.crisis_id = crisis_id;
        this.title = title;
        this.pathToImage = pathToImage;
        this.objective = objective;
        this.description = description;
        this.startdate = startdate;
        this.enddate = enddate;
        this.status = status;
        this.localisation = localisation;
        this.pathToFiles = pathToFiles;

    }

}