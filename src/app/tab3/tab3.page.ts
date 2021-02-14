import { Component, Output ,EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import covid_vaccine_data from '../data_files/vaccine_doses.json';
import  { VaccineDoses }  from '../model_classes/vaccine_doses';
import covid_ontario_data from '../data_files/ontarioInfo.json';
import {Tab1Page} from '../tab1/tab1.page';
import { Ontario }  from '../model_classes/ontario';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {   


  data:any;
  vaccineDataList: VaccineDoses[]=covid_vaccine_data;
  vaccineData : VaccineDoses;
  ontarioDataList: Ontario[]=covid_ontario_data;

dateResult= '2021-01-31';
//-----------ONTARIO STATUS---------------
ontarioTotalCases=0;
resolvedCases =0;
ontarioDeaths=0;
ontarioHospitalized=0;
ontarioIcu=0;
ontarioVentilator=0;

  constructor(private route: ActivatedRoute) {
    this.data=this.route.snapshot.params.date;
   this.vaccineData =  getSpecificDateVaccineData(this.vaccineDataList,this.data);

   //--------Ontario Reports -------------
this.ontarioTotalCases = getOntarioTotalCases(this.ontarioDataList,this.dateResult);
this.resolvedCases = getOntarioResolvedCases(this.ontarioDataList,this.dateResult);
this.ontarioDeaths = getOntarioDeathCases(this.ontarioDataList,this.dateResult);
this.ontarioHospitalized = getOntarioHospitalizedCases(this.ontarioDataList,this.dateResult);
this.ontarioIcu = getOntarioICUCases(this.ontarioDataList,this.dateResult);
this.ontarioVentilator = getOntarioVentilatorCases(this.ontarioDataList,this.dateResult);
  }



}
 function  getSpecificDateVaccineData(vaccineDataList, dateResult) : VaccineDoses{
   var data = new VaccineDoses();
  vaccineDataList.forEach(element => {
    if(element.report_date==dateResult)
    {
      console.log('This is the data I have fetched'+element.previous_day_doses_administered);
      data=element;
    }
    
  });
return data;

}

//-------------- Ontario Details ------------------
function getOntarioTotalCases(ontarioDataList,dateResult)
{
var totalCases=0;
ontarioDataList.forEach(element => {
 if(element.Reported_Date==dateResult)
 totalCases=element.Total_Cases;
 
});
console.log('TOTAL CASES '+totalCases);
return totalCases;
}

function getOntarioResolvedCases(ontarioDataList,dateResult)
{
var resolvedCases=0;
ontarioDataList.forEach(element => {
 if(element.Reported_Date==dateResult)
 resolvedCases=element.Resolved;
});
console.log('RESOLVED CASES '+resolvedCases);
return resolvedCases;
}

function getOntarioDeathCases(ontarioDataList,dateResult)
{
var deathCases=0;
ontarioDataList.forEach(element => {
 if(element.Reported_Date==dateResult)
 deathCases=element.Deaths;
});
console.log('DEATH CASES '+deathCases);

return deathCases;
}


function getOntarioHospitalizedCases(ontarioDataList,dateResult)
{
var hospitalizedCases=0;
ontarioDataList.forEach(element => {
 if(element.Reported_Date==dateResult)
 hospitalizedCases=element.Number_of_patients_hospitalized_with_COVID_19;
});
console.log('HOPITALIZED CASES '+hospitalizedCases);

return hospitalizedCases;
}


function getOntarioICUCases(ontarioDataList,dateResult)
{
var icuCases=0;
ontarioDataList.forEach(element => {
 if(element.Reported_Date==dateResult)
 {

  icuCases=element.Number_of_patients_in_ICU_with_COVID_19;

 }
});

return icuCases;
}


function getOntarioVentilatorCases(ontarioDataList,dateResult)
{
  
var ventilatorCases=0;
ontarioDataList.forEach(element => {
 if(element.Reported_Date==dateResult)
 ventilatorCases=element.Number_of_patients_in_ICU_on_a_ventilator_with_COVID_19;
});

console.log('VENTILATOR CASES '+ventilatorCases);

return ventilatorCases;
}