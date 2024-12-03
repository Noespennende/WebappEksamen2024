import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Occasion } from '@/features/events/types';
import { MonthEnum } from './schema';


type generateExcelReportProps = {
    occasion: Occasion,
}


export function generateExcelReport ({occasion}: generateExcelReportProps) {

    const startYear: number = occasion.date.getFullYear()
    const currentYear: number = new Date().getFullYear()

    const rows: string [][] = [[]]

    //generate strings for years since the occassion were generated
    for (let year: number = startYear; year <= currentYear; year++){
        const monthCounts: number[] = Array(12).fill(0);
        let total = 0

        // Iterate over the participants to count the number of participants each month
        for (const participant of occasion.participants) {
            const registerDate = participant.registerDate;;
            if (registerDate.getFullYear() === year) {
                const monthIndex = registerDate.getMonth();
                monthCounts[monthIndex]++;
                total ++ 
            }
        }

        rows.push([year.toString(), ...monthCounts.map(count => count.toString()), total.toString(), `${occasion.price * total}`]);
    }
    
    const columns: string[] = ["År", ...Object.values(MonthEnum), "Samlet antall medlemmer", "Samlet intekt"]
    rows.unshift(columns)

    return rows
}