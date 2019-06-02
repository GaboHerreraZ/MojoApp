export class Chart{
    title:string;
    data:any[];
    columnNames:string[];

    constructor(title:string,data:any[],columnNames:string[]){
        this.title = title;
        this.data = data;
        this.columnNames = columnNames;
    }
}