import { Component } from '@angular/core';
import covid_vaccine_data from '../data_files/vaccine_doses.json';
import  { VaccineDoses }  from '../model_classes/vaccine_doses';
import { Ontario }  from '../model_classes/ontario';
import covid_ontario_data from '../data_files/ontarioInfo.json';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  vaccineDataList: VaccineDoses[]=covid_vaccine_data;


//-----------ONTARIO STATUS---------------
ontarioTotalCases=0;
resolvedCases =0;
ontarioDeaths=0;
ontarioHospitalized=0;
ontarioIcu=0;
ontarioVentilator=0;
ontarioDataList: Ontario[]=covid_ontario_data;

dateResult= '2021-01-31';
  constructor() {
    //showFollowUpMessage();
    //--------Ontario Reports -------------
this.ontarioTotalCases = getOntarioTotalCases(this.ontarioDataList,this.dateResult);
this.resolvedCases = getOntarioResolvedCases(this.ontarioDataList,this.dateResult);
this.ontarioDeaths = getOntarioDeathCases(this.ontarioDataList,this.dateResult);
this.ontarioHospitalized = getOntarioHospitalizedCases(this.ontarioDataList,this.dateResult);
this.ontarioIcu = getOntarioICUCases(this.ontarioDataList,this.dateResult);
this.ontarioVentilator = getOntarioVentilatorCases(this.ontarioDataList,this.dateResult);
  }


  getReportData() { 
    console.log('Clicked on List');
   
  }


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