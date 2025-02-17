import {atom} from "recoil";
export const habitLogsState=atom({
    key:'habitUpdated',
    dafault: [
        { name: "Waterintake", value: 2000, unit: "ml", goal: 3000 },
        { name: "Sleep", value: 8, unit: "hrs", goal: 8 },
        { name: "StepCount", value: 5000, unit: "steps", goal: 10000 },
        { name: "WorkoutDuration", value: 30, unit: "mins", goal: 60 }
    ]
})