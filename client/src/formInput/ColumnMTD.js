import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { BASE_API, MIDDLEWARE } from "../../api/api";
import SearchBoxCardwoBt from "../../AssetComponent/SearchBoxCardwoBt";
import MaterialReactTable from "material-react-table";
import { IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { darken, white } from '@mui/material';
import { Box, Stack  } from '@mui/material';
import TableMTD from "./TableMTD";


const ColumnMTD = ({salesData401, refresh401, isLoading401}) => {
    let totalUnit_401 = 0;
    let totalGross_401 = 0;
    let totalPLA_401= 0;
    let totalTarget_401 = 0;
    let totalFunded_401 = 0;
    let totalOutstanding_401 = 0;
    let count = 0;
    salesData401.map((s)=>
        {
            totalUnit_401 = totalUnit_401 + s.UnitSold;
            totalGross_401 = totalGross_401 + parseInt(s.TOTALCOST);
            totalFunded_401 = totalFunded_401 + s.TOTAL_FUNDED;
            totalOutstanding_401 = totalOutstanding_401 + s.Outstanding;
            totalPLA_401 = totalPLA_401 + s.PLA;
            totalTarget_401 = totalTarget_401 + parseInt(s.Sale_Target);
            count = count + 1;
        })
 const columns_401 = useMemo(
        () => [
          {
            accessorKey: "DEALER_LOCATION", //access nested data with dot notation
            header: "LOCATION",
            size: 200,
            Footer: () => (
                <Stack>
                  <Box color="warning.main">Total 401</Box>
                </Stack>
              ),
          },
          {
            accessorKey: "UnitSold",
            header: "Unit",
            size: 180,
            Footer: () => (
                <Stack>
                  <Box color="warning.main">{totalUnit_401}</Box>
                </Stack>
              ),
          },
          {
            //accessorKey: "TOTALCOST", //normal accessorKey
            accessorFn: (row) => `$${row.TOTALCOST}`,
            header: "Gross",
            size: 180,
            Footer: () => (
                <Stack>
                  <Box color="warning.main">${totalGross_401}</Box>
                </Stack>
              ),
          },
          {
            //accessorKey: "AvgGross",
            accessorFn: (row) => `$${Math.round(row.AvgGross)}`,
            header: "AvgGross",
            size: 180,
            Footer: () => (
                <Stack>
                  <Box color="warning.main">${isNaN(Math.round(totalGross_401 / totalUnit_401)) ? 0 :
                  Math.round(totalGross_401 / totalUnit_401)}</Box>
                </Stack>
              ),
          },
          
          {
            //accessorKey: "FundingPer", //access nested data with dot notation
            accessorFn: (row) => `${row.FundingPer}%`,
            header: "Funding",
            size: 180,
            Footer: () => (
                <Stack>
                  <Box color="warning.main">{isNaN(Math.round(totalFunded_401 / totalUnit_401)) ? 0 :
                  Math.round((totalFunded_401 / totalUnit_401)*100)}%</Box>
                </Stack>
              ),
          },
          {
            //accessorKey: "PLA",
            accessorFn: (row) => `$${Math.round(row.PLA)}`,
            header: "PLA",
            Footer: () => (
                <Stack>
                  <Box color="warning.main">{isNaN(Math.round(totalPLA_401 / count)) ? 0 :
                  Math.round(totalPLA_401 / count)}</Box>
                </Stack>
              ),
          },
          {
            //accessorKey: "Sale_Target", //normal accessorKey
            accessorFn: (row) => `$${Math.round(row.Sale_Target)}`,
            header: "Target",
            Footer: () => (
                <Stack>
                  <Box color="warning.main">${totalTarget_401}</Box>
                </Stack>
              ),
          },
          {
            //accessorKey: "TargerPer",
            accessorFn: (row) => `${row.TargerPer}%`,
            header: "Target%",
            Footer: () => (
                <Stack>
                  <Box color="warning.main">{isNaN(Math.round(totalGross_401 / totalTarget_401)) ? 0 :
                  Math.round((totalGross_401 / totalTarget_401)*100)}%</Box>
                </Stack>
              ),
          },
          {
            accessorKey: "TOTAL_FUNDED", //normal accessorKey
            header: "FUNDED",
            Footer: () => (
                <Stack>
                  <Box color="warning.main">{totalFunded_401}</Box>
                </Stack>
              ),
          },
          {
            accessorKey: "Outstanding",
            header: "Outstanding",
            Footer: () => (
                <Stack>
                  <Box color="warning.main">{totalOutstanding_401}</Box>
                </Stack>
              ),
          },
          
        ],
        []
      )

      return (
        <div className="row">
        < TableMTD 
          columns={columns_401}
          data={salesData401}
          isLoading = {isLoading401} 
          refresh={refresh401} 
          Title='401'
          />  
      </div>
      );
}

export default ColumnMTD

//export const columns_401 = useMemo(
//    () => [
//      {
//        accessorKey: "DEALER_LOCATION", //access nested data with dot notation
//        header: "LOCATION",
//        size: 200,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">Total 401</Box>
//            </Stack>
//          ),
//      },
//      {
//        accessorKey: "UnitSold",
//        header: "Unit",
//        size: 180,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{totalUnit_401}</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "TOTALCOST", //normal accessorKey
//        accessorFn: (row) => `$${row.TOTALCOST}`,
//        header: "Gross",
//        size: 180,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">${totalGross_401}</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "AvgGross",
//        accessorFn: (row) => `$${Math.round(row.AvgGross)}`,
//        header: "AvgGross",
//        size: 180,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">${isNaN(Math.round(totalGross_401 / totalUnit_401)) ? 0 :
//              Math.round(totalGross_401 / totalUnit_401)}</Box>
//            </Stack>
//          ),
//      },
      
//      {
//        //accessorKey: "FundingPer", //access nested data with dot notation
//        accessorFn: (row) => `${row.FundingPer}%`,
//        header: "Funding",
//        size: 180,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{isNaN(Math.round(totalFunded_401 / totalUnit_401)) ? 0 :
//              Math.round((totalFunded_401 / totalUnit_401)*100)}%</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "PLA",
//        accessorFn: (row) => `$${Math.round(row.PLA)}`,
//        header: "PLA",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{isNaN(Math.round(totalPLA_401 / count)) ? 0 :
//              Math.round(totalPLA_401 / count)}</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "Sale_Target", //normal accessorKey
//        accessorFn: (row) => `$${Math.round(row.Sale_Target)}`,
//        header: "Target",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">${totalTarget_401}</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "TargerPer",
//        accessorFn: (row) => `${row.TargerPer}%`,
//        header: "Target%",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{isNaN(Math.round(totalGross_401 / totalTarget_401)) ? 0 :
//              Math.round((totalGross_401 / totalTarget_401)*100)}%</Box>
//            </Stack>
//          ),
//      },
//      {
//        accessorKey: "TOTAL_FUNDED", //normal accessorKey
//        header: "FUNDED",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{totalFunded_401}</Box>
//            </Stack>
//          ),
//      },
//      {
//        accessorKey: "Outstanding",
//        header: "Outstanding",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{totalOutstanding_401}</Box>
//            </Stack>
//          ),
//      },
      
//    ],
//    []
//  )

//  export  const columns_Franchise = useMemo(
//    () => [
//      {
//        accessorKey: "DEALER_LOCATION", //access nested data with dot notation
//        header: "LOCATION",
//        size: 200,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">Total 401</Box>
//            </Stack>
//          ),
//      },
//      {
//        accessorKey: "UnitSold",
//        header: "Unit",
//        size: 180,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{totalUnit_401}</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "TOTALCOST", //normal accessorKey
//        accessorFn: (row) => `$${row.TOTALCOST}`,
//        header: "Gross",
//        size: 180,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">${totalGross_401}</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "AvgGross",
//        accessorFn: (row) => `$${Math.round(row.AvgGross)}`,
//        header: "AvgGross",
//        size: 180,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">${isNaN(Math.round(totalGross_401 / totalUnit_401)) ? 0 :
//              Math.round(totalGross_401 / totalUnit_401)}</Box>
//            </Stack>
//          ),
//      },
      
//      {
//        //accessorKey: "FundingPer", //access nested data with dot notation
//        accessorFn: (row) => `${row.FundingPer}%`,
//        header: "Funding",
//        size: 180,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{isNaN(Math.round(totalFunded_401 / totalUnit_401)) ? 0 :
//              Math.round((totalFunded_401 / totalUnit_401)*100)}%</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "PLA",
//        accessorFn: (row) => `$${Math.round(row.PLA)}`,
//        header: "PLA",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{isNaN(Math.round(totalPLA_401 / count)) ? 0 :
//              Math.round(totalPLA_401 / count)}</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "Sale_Target", //normal accessorKey
//        accessorFn: (row) => `$${Math.round(row.Sale_Target)}`,
//        header: "Target",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">${totalTarget_401}</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "TargerPer",
//        accessorFn: (row) => `${row.TargerPer}%`,
//        header: "Target%",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{isNaN(Math.round(totalGross_401 / totalTarget_401)) ? 0 :
//              Math.round((totalGross_401 / totalTarget_401)*100)}%</Box>
//            </Stack>
//          ),
//      },
//      {
//        accessorKey: "TOTAL_FUNDED", //normal accessorKey
//        header: "FUNDED",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{totalFunded_401}</Box>
//            </Stack>
//          ),
//      },
//      {
//        accessorKey: "Outstanding",
//        header: "Outstanding",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{totalOutstanding_401}</Box>
//            </Stack>
//          ),
//      },
      
//    ],
//    []
//  )

//  export  const columns_Auto = useMemo(
//    () => [
//      {
//        accessorKey: "DEALER_LOCATION", //access nested data with dot notation
//        header: "LOCATION",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">Total </Box>
//            </Stack>
//          ),
//      },
//      {
//        accessorKey: "NewSold",
//        header: "New Unit",
//        size: 150,
//        //muiTableBodyCellProps: {
//        //    align: 'center',
//        //  },
//      },
//      {
//        //accessorKey: "NewGross", //normal accessorKey
//        accessorFn: (row) => `$${row.NewGross}`,
//        header: "New Gross",
//        size: 170,
        
//      },
//      {
//        accessorKey: "UsedSold",
//        header: "Used Unit",
//        size: 150,
//      },
//      {
//        //accessorKey: "UsedGross", //access nested data with dot notation
//        accessorFn: (row) => `$${row.UsedGross}`,
//        header: "Used Gross",
//        size: 170,
//      },
//      {
//        accessorKey: "LeadMTD",
//        header: "Lead MTD",
//        size: 170,
//      },
//      {
//        //accessorKey: "LeadGross", //normal accessorKey
//        accessorFn: (row) => `$${row.LeadGross}`,
//        header: "Lead Gross"
//      },
//      {
//        //accessorKey: "PLA",
//        accessorFn: (row) => `$${row.PLA}`,
//        header: "PLA",
//        size: 150,
//      },
//      {
//        accessorKey: "Conversion", //normal accessorKey
//        header: "Conversion"
//      },
//      {
//        accessorKey: "TotalFunded", //normal accessorKey
//        header: "Funded",
//        size: 150,
//      },
//      {
//        accessorKey: "Outstanding",
//        header: "Outstanding",
//        size: 170,
        
//      },
      
//    ],
//    []
//  )

//  export  const columns_RV = useMemo(
//    () => [
//      {
//        accessorKey: "DEALER_LOCATION", //access nested data with dot notation
//        header: "LOCATION",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">Total </Box>
//            </Stack>
//          ),
//      },
//      {
//        accessorKey: "NewSold",
//        header: "New Unit",
//        size: 150,
//        //muiTableBodyCellProps: {
//        //    align: 'center',
//        //  },
//      },
//      {
//        //accessorKey: "NewGross", //normal accessorKey
//        accessorFn: (row) => `$${row.NewGross}`,
//        header: "New Gross",
//        size: 170,
        
//      },
//      {
//        accessorKey: "UsedSold",
//        header: "Used Unit",
//        size: 150,
//      },
//      {
//        //accessorKey: "UsedGross", //access nested data with dot notation
//        accessorFn: (row) => `$${row.UsedGross}`,
//        header: "Used Gross",
//        size: 170,
//      },
//      {
//        accessorKey: "LeadMTD",
//        header: "Lead MTD",
//        size: 170,
//      },
//      {
//        //accessorKey: "LeadGross", //normal accessorKey
//        accessorFn: (row) => `$${row.LeadGross}`,
//        header: "Lead Gross"
//      },
//      {
//        //accessorKey: "PLA",
//        accessorFn: (row) => `$${row.PLA}`,
//        header: "PLA",
//        size: 150,
//      },
//      {
//        accessorKey: "Conversion", //normal accessorKey
//        header: "Conversion"
//      },
//      {
//        accessorKey: "TotalFunded", //normal accessorKey
//        header: "Funded",
//        size: 150,
//      },
//      {
//        accessorKey: "Outstanding",
//        header: "Outstanding",
//        size: 170,
        
//      },
      
//    ],
//    []
//  )

//  export  const columns_Marine = useMemo(
//    () => [
//      {
//        accessorKey: "DEALER_LOCATION", //access nested data with dot notation
//        header: "LOCATION"
//      },
//      {
//        accessorKey: "NewSold",
//        header: "New Unit"
//      },
//      {
//        accessorKey: "NewGross", //normal accessorKey
//        header: "New Gross"
//      },
//      {
//        accessorKey: "UsedSold",
//        header: "Used Unit"
//      },
//      {
//        accessorKey: "UsedGross", //access nested data with dot notation
//        header: "Used Gross"
//      },
//      {
//        accessorKey: "TotalFunded", //normal accessorKey
//        header: "Funded"
//      },
//      {
//        accessorKey: "Outstanding",
//        header: "Outstanding"
//      }
//    ],
//    []
//  )

//  export const columns_Status = useMemo(
//    () => [
//      {
//        accessorKey: "DEALER_LOCATION", //access nested data with dot notation
//        header: "LOCATION",
//        size: 200,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">Total 401</Box>
//            </Stack>
//          ),
//      },
//      {
//        accessorKey: "UnitSold",
//        header: "Unit",
//        size: 180,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{totalUnit_401}</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "TOTALCOST", //normal accessorKey
//        accessorFn: (row) => `$${row.TOTALCOST}`,
//        header: "Gross",
//        size: 180,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">${totalGross_401}</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "AvgGross",
//        accessorFn: (row) => `$${Math.round(row.AvgGross)}`,
//        header: "AvgGross",
//        size: 180,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">${isNaN(Math.round(totalGross_401 / totalUnit_401)) ? 0 :
//              Math.round(totalGross_401 / totalUnit_401)}</Box>
//            </Stack>
//          ),
//      },
      
//      {
//        //accessorKey: "FundingPer", //access nested data with dot notation
//        accessorFn: (row) => `${row.FundingPer}%`,
//        header: "Funding",
//        size: 180,
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{isNaN(Math.round(totalFunded_401 / totalUnit_401)) ? 0 :
//              Math.round((totalFunded_401 / totalUnit_401)*100)}%</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "PLA",
//        accessorFn: (row) => `$${Math.round(row.PLA)}`,
//        header: "PLA",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{isNaN(Math.round(totalPLA_401 / count)) ? 0 :
//              Math.round(totalPLA_401 / count)}</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "Sale_Target", //normal accessorKey
//        accessorFn: (row) => `$${Math.round(row.Sale_Target)}`,
//        header: "Target",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">${totalTarget_401}</Box>
//            </Stack>
//          ),
//      },
//      {
//        //accessorKey: "TargerPer",
//        accessorFn: (row) => `${row.TargerPer}%`,
//        header: "Target%",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{isNaN(Math.round(totalGross_401 / totalTarget_401)) ? 0 :
//              Math.round((totalGross_401 / totalTarget_401)*100)}%</Box>
//            </Stack>
//          ),
//      },
//      {
//        accessorKey: "TOTAL_FUNDED", //normal accessorKey
//        header: "FUNDED",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{totalFunded_401}</Box>
//            </Stack>
//          ),
//      },
//      {
//        accessorKey: "Outstanding",
//        header: "Outstanding",
//        Footer: () => (
//            <Stack>
//              <Box color="warning.main">{totalOutstanding_401}</Box>
//            </Stack>
//          ),
//      },
      
//    ],
//    []
//  )
