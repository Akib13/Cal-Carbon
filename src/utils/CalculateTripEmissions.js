export function CalculateTripEmissions(method, emissions, distance, passengers, consumption, fuelEmissions){
    let finalEmissions = 0;
    console.log(method, emissions, distance, passengers, consumption, fuelEmissions);
    switch(method){
    case 'bus':
    case 'train':
    case 'plane':
        finalEmissions = distance * emissions;
        break;
    case 'walk':
    case 'bike':
        break;
    default:
        finalEmissions = distance * emissions / passengers + distance * consumption * fuelEmissions / passengers;
        break;
    }

    console.log("FINAL EMISSIONS: ", finalEmissions);
    return (finalEmissions / 1000).toFixed(2);
}