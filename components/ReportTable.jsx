import React from "react";
import AboutPage from "./About";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

function ReportTable({ title, paras, rows, columns, width = "50%" }) {
  return (
    <>
      <AboutPage title={title} paras={paras} />
      <Box
        className="mx-auto mb-8 h-96"
        sx={{
          width,
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            justifyContent: "center !important",
          },
          "& .MuiDataGrid-cell.MuiDataGrid-cell--textLeft, & .MuiDataGrid-cell.MuiDataGrid-cell--textRight":
            {
              textAlign: "center !important",
            },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}

export default ReportTable;
