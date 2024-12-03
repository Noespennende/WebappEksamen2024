import * as XLSX from 'xlsx';
import { Occasion } from '@/features/events/types';
import { MonthEnum } from './schema';


type generateExcelReportProps = {
    occasion: Occasion,
}


export function generateExcelReport ({occasion}: generateExcelReportProps) {

    const startDate: Date = new Date(occasion?.date)
    const startYear: number = startDate?.getFullYear()
    const currentYear: number = new Date().getFullYear()

    const rows: string [][] = [[]]

    

    //generate strings for years since the occassion were generated
    for (let year: number = startYear; year <= currentYear; year++){
        console.log("Year in loop:", year);
        const monthCounts: number[] = Array(12).fill(0);
        let total = 0

        // Iterate over the participants to count the number of participants each month
        for (const participant of occasion?.participants) {
            const registerDate = participant.registerDate;;
            if (registerDate.getFullYear() === year) {
                const monthIndex = registerDate.getMonth();
                monthCounts[monthIndex]++;
                total ++ 
            }
        }

        rows.push([year.toString(), ...monthCounts.map(count => count.toString()), total.toString(), `${(occasion.price * total).toString()}`]);
    }
    
    

    const columnNames: string[] = ["År", ...MonthEnum.options, "Samlet antall medlemmer", "Samlet intekt"]
    rows.unshift(columnNames)
    

    const exelSheet = XLSX.utils.aoa_to_sheet(rows)
    const exelBook =  XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(exelBook , exelSheet, 'Report');

    const exelBuffer = XLSX.write(exelBook, { bookType: 'xlsx', type: 'array' });
    const exelFile = new Blob([exelBuffer], {type: 'application/octet-stream'})

    return exelFile
}