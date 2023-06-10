export interface Profile {

 name:string;
number:string;
city:string;
email:string;
country:string;
address:string;
birthdate:string;
title:string;
jobTitles:Array<string>;
industry:string;
minSalary:{value:number,currency:string};
yearsOfExperience:number;
skills: {
  SkillName: string;
  yearsOfExperience: number;
}[];
currentCareerlevel:string;
jopType:string;
currentEducationalLevel:string;
fieldOfStudy:string;
University:string;
GraduationYear:string;
Grade:string;
languages:Array<string>;
image:string

}
