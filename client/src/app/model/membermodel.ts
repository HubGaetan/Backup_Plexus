export class membermodel {
    member_id: number;
    name: string;
    firstname: string;
    speciality: string;
    role: string;

    constructor(member_id = 0, name = '', firstname = '', speciality = '', role = '') {
        this.member_id = member_id;
        this.name = name;
        this.firstname = firstname;
        this.speciality = speciality;
        this.role = role;
    }
}