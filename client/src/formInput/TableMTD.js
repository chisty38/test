import React, { useMemo } from "react";
import MaterialReactTable, {
  MRT_ToggleDensePaddingButton,
  MRT_FullScreenToggleButton,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleGlobalFilterButton,
} from "material-react-table";
import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintIcon from "@mui/icons-material/Print";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here

const TableMTD = ({ columns, data, isLoading, refresh, Title, enablePagination, renderRowActions, initialState }) => {
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: true,
    headers: columns.map((c) => c.header),
  };
  const csvExporter = new ExportToCsv(csvOptions);
  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      state={{ isLoading: isLoading }}
      enablePagination={enablePagination}
      enableColumnOrdering
      enablePinning
      enableClickToCopy
      enableGrouping
      renderRowActions = {renderRowActions}
      initialState = {initialState}
      muiTableHeadCellProps={{
        //simple styling with the `sx` prop, works just like a style prop in this example
        sx: {
          fontWeight: "bold",
          fontSize: "14px",
          backgroundColor: "#cca677",
          //  color:'white'
        },
      }}
      muiTableBodyProps={{
        sx: (theme) => ({
          "& tr:nth-of-type(odd)": {
            backgroundColor: "#e5eff7",
          },
          "& tr:nth-of-type(even)": {
            backgroundColor: "rgba(140, 165, 211, 0.482)",
          },
        }),
      }}
    //  initialState={{
    //    density: "compact",
    //    //sorting: [{ id: 'name', desc: false }],
    //  }}
      enableColumnResizing
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{
            display: "flex",
            gap: "5rem",
            p: "0.4rem",
            flexWrap: "wrap",
          }}
        >
          <h5 sx={{ alignitem: "center" }}>{Title}</h5>
          {/*<Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export Data
          </Button>*/}
        </Box>
      )}
      renderToolbarInternalActions={({ table }) => (
        <Box>
          <Tooltip arrow title="Download Data">
          <IconButton onClick={() => handleExportRows(table.getRowModel().rows)}>
            <FileDownloadIcon />
          </IconButton>
          </Tooltip>
          
          {/* add custom button to print table  */}
          <Tooltip arrow title="Print">
          <IconButton onClick={() => {window.print();}}>
            <PrintIcon />
          </IconButton>
          </Tooltip>
          <MRT_ToggleGlobalFilterButton table={table} />
          <MRT_ToggleDensePaddingButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
          <MRT_ToggleFiltersButton table={table} />
          <MRT_FullScreenToggleButton table={table} />
          <Tooltip arrow title="Refresh Data">
            <IconButton onClick={refresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          {/* along-side built-in buttons in whatever order you want them */}
        </Box>
      )}
    />
  );
};

export default TableMTD;
