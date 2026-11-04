export function loanPayment(principal: number, monthlyPercent: number, months: number) {
 if (![principal,monthlyPercent,months].every(Number.isFinite) || principal<=0 || principal>10000000 || monthlyPercent<0 || monthlyPercent>20 || !Number.isInteger(months) || months<1 || months>360) return null;
 const rate=monthlyPercent/100;
 const monthly=rate===0 ? principal/months : principal*rate/-Math.expm1(-months*Math.log1p(rate));
 return {monthly,total:monthly*months,interest:monthly*months-principal};
}
export function monthlyBudget(income:number,debt:number) {
 if (![income,debt].every(Number.isFinite)||income<=0||income>10000000||debt<0||debt>10000000) return null;
 return {remaining:income-debt,ratio:debt/income*100};
}
