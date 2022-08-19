import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Box,
  Link as MuiLink,
  Tooltip,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  TablePagination,
  Modal,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import CrearEmpresa from "./crear-empresa";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
  fontColor: 'black'
};


const ConsultaEmpresas = () => {
  //Implementacion Test
  const [datos, setDatos] = useState<any>();

  const getEmpresas = async () => {
    // const res = await axios.get("http://localhost:3033/api/empresas");
    const res = await axios.get(
      `${import.meta.env.VITE_URL_SERVER}/api/empresas`
    );
    setDatos(res.data.result);
  };

  useEffect(() => {
    getEmpresas();
  }, []);

  //Implementacion MUI
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    <Paper elevation={3}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Box
          sx={{
            display: "flex",
            gap: "2px",
            justifyContent: "flex-end",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <MuiLink>
            <Tooltip title="Añadir">
              <Button
                sx={{ cursor: "pointer" }}
                onClick={handleOpen}
              >
                <Add sx={{ color: "#15cb68", fontSize: "30px" }} />
              </Button>
            </Tooltip>
          </MuiLink>
        </Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography sx={{ fontSize: "20px" }}>
                      Nombre empresa
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ fontSize: "20px" }}>Direccion</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ fontSize: "20px" }}>Acciones</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datos ? (
                  datos.map((empresa: any, i: any) => (
                    <>
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          key={i}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {empresa.nombre_empresa}
                        </TableCell>
                        <TableCell
                          key={i}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {empresa.direccion}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Editar">
                            <MuiLink>
                              <Button
                                onClick={() => {
                                  // router.push({
                                  //   pathname: `referencias/${row.id}/editar`,
                                  // })
                                } }
                              >
                                <Edit sx={{ color: "#ffc327" }} />
                              </Button>
                            </MuiLink>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <Button
                              onClick={() => {
                                // onState(row.id, row.estado);
                              } }
                            >
                              {/* {row.estado === "A" ? (
                      <ToggleOnIcon sx={{ color: "#15cb68" }} />
                    ) : (
                      <ToggleOffIcon sx={{ color: "#db5228" }} />
                    )} */}
                              <Delete sx={{ color: "red" }} />
                            </Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                ) : (
                  <Box pl={5}>
                    <h3>Problema al cargar los datos</h3>
                  </Box>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={datos?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <Box sx={style}>
          <CrearEmpresa />
        </Box>
      </Modal>
    </Paper>
    </>
  );
};

export default ConsultaEmpresas;
