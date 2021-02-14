import { Component, Input, Output} from '@angular/core';
import covid_country_data from '../data_files/canada_covid19.json';
import covid_ontario_data from '../data_files/ontarioInfo.json';
import  { Canada }  from '../model_classes/canada';
import { Ontario }  from '../model_classes/ontario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
   countryDataList: Canada[]=covid_country_data;
   ontarioDataList: Ontario[]=covid_ontario_data;

dateResult= '2021-01-31';
provinceCanada="Canada";
provinceOntario="Ontario";


    totalCases = 0;
    totalCasesToday = 0;
    totalActiveCases = 0;
    totalRecovered = 0;
    totalDeaths = 0;
    todayDeath = 0;
    testedToday =0;
    totalTested = 0;
    percentagePositive =0;
    peopleTested=0;

//-----------ONTARIO STATUS---------------
    ontarioTotalCases=0;
    resolvedCases =0;
    ontarioDeaths=0;
    ontarioHospitalized=0;
    ontarioIcu=0;
    ontarioVentilator=0;


 constructor(private router: Router)
{
 
this.totalCases =  getTotalCases(this.countryDataList,this.dateResult,this.provinceCanada);
this.totalCasesToday = getTotalCasesToday(this.countryDataList,this.dateResult,this.provinceCanada);
this.totalActiveCases = getActiveCases(this.countryDataList,this.dateResult,this.provinceCanada);
this.totalRecovered=getRecoveredCases(this.countryDataList,this.dateResult,this.provinceCanada);
this.todayDeath = getTodayDeaths(this.countryDataList,this.dateResult,this.provinceCanada);
this.totalDeaths = getTotalDeaths(this.countryDataList,this.dateResult,this.provinceCanada);
this.testedToday = getTestedToday(this.countryDataList,this.dateResult,this.provinceCanada);
this.totalTested =  getTotalTested(this.countryDataList,this.dateResult,this.provinceCanada);
this.percentagePositive = getPercentagePositive(this.countryDataList,this.dateResult,this.provinceCanada);
this.peopleTested =getPeopleTested(this.countryDataList,this.dateResult,this.provinceCanada);
  


//--------Ontario Reports -------------
this.ontarioTotalCases = getOntarioTotalCases(this.ontarioDataList,this.dateResult);
this.resolvedCases = getOntarioResolvedCases(this.ontarioDataList,this.dateResult);
this.ontarioDeaths = getOntarioDeathCases(this.ontarioDataList,this.dateResult);
this.ontarioHospitalized = getOntarioHospitalizedCases(this.ontarioDataList,this.dateResult);
this.ontarioIcu = getOntarioICUCases(this.ontarioDataList,this.dateResult);
this.ontarioVentilator = getOntarioVentilatorCases(this.ontarioDataList,this.dateResult);

}


 
}

function getTotalCasesToday(countryDataList,dateResult,provinceName) {
  var totalCasesToday = 0 ;

  countryDataList.forEach(element => {
    if(element.date==dateResult && element.prname==provinceName)
    {
      totalCasesToday=element.numtoday;
    }
  });

  return totalCasesToday;
}; 

function getTotalCases(countryDataList,dateResult,provinceName) {

 var totalCases = 0 ;
  countryDataList.forEach(element => {
    if(element.date==dateResult && element.prname==provinceName)
      totalCases=element.numtotal;
  });
  return totalCases;

}; 

function getActiveCases(countryDataList,dateResult,provinceName) {

  var activeCases = 0 ;
   countryDataList.forEach(element => {
     if(element.date==dateResult && element.prname==provinceName)
     activeCases=element.numactive;
   });
   return activeCases;
 
 };

function getRecoveredCases(countryDataList,dateResult,provinceName) {

  var recoveredCases = 0 ;
   countryDataList.forEach(element => {
     if(element.date==dateResult && element.prname==provinceName)
     recoveredCases=element.numrecover;
   });
   return recoveredCases;
 
 };

 function getTotalDeaths(countryDataList,dateResult,provinceName) {

  var totalDeaths = 0 ;
   countryDataList.forEach(element => {
     if(element.date==dateResult && element.prname==provinceName)
     totalDeaths=element.numdeaths;
   });
   return totalDeaths;
 
 };

 function getTodayDeaths(countryDataList,dateResult,provinceName)
 {
var todayDeaths=0;
countryDataList.forEach(element => {
  if(element.date==dateResult && element.prname==provinceName)
  todayDeaths=element.numdeathstoday;
});
return todayDeaths;
 }

function getTestedToday(countryDataList,dateResult,provinceName)
 {
var testedToday=0;
countryDataList.forEach(element => {
  if(element.date==dateResult && element.prname==provinceName)
  testedToday=element.numtestedtoday;
});
return testedToday;
 }

 function getTotalTested(countryDataList,dateResult,provinceName)
 {
var totalTested=0;
countryDataList.forEach(element => {
  if(element.date==dateResult && element.prname==provinceName)
  totalTested=element.numtestedtoday;
});
return totalTested;
 }
 
function getPercentagePositive(countryDataList,dateResult,provinceName)
{
var percentagePositive=0;
countryDataList.forEach(element => {
 if(element.date==dateResult && element.prname==provinceName)
 percentagePositive=element.percentactive - element.percentdeath;
});
return percentagePositive;
}

function getPeopleTested(countryDataList,dateResult,provinceName)
{
var peopleTested=0;
countryDataList.forEach(element => {
 if(element.date==dateResult && element.prname==provinceName)
 peopleTested=element.ratetested;
});
return peopleTested;
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