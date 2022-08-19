import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import {
  Grid,
  FormControl,
  TextField,
  MenuItem,
  Stack,
  Button,
  Typography,
} from "@mui/material";

const validaciones = yup.object().shape({
  nombre_empresa: yup.string().required("Campo requerido"),
  direccion: yup.string().required("Campo requerido"),
  Telefono: yup.string().required("Campo requerido"),
  num_documento: yup.string().required("Campo requerido"),
  tipo_documento: yup.string().required("Campo requerido"),
});

const CrearEmpresa = () => {
  const formik = useFormik({
    initialValues: {
      nombre_empresa: "",
      direccion: "",
      Telefono: "",
      num_documento: "",
      tipo_documento: "",
    },
    validationSchema: validaciones,
    onSubmit: (values) => {
      postEmpresa(values);
      // console.log(values);
    },
  });

  const postEmpresa = async (data: any) => {
    const res = await axios.post(`${import.meta.env.VITE_URL_SERVER}/api/empresas`, data);
    console.log(res);     
  };

  return (
    <div>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        style={{ color: "black" }}
        p={1}
      >
        Formulario registro de Empresa
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} columns={1} p={1}>
          <Grid item xs={10} sm={5} md={5}>
            <FormControl fullWidth>
              <TextField
                id="nombre_empresa"
                name="nombre_empresa"
                label="Nombre Empresa"
                value={formik.values.nombre_empresa || ""}
                onChange={formik.handleChange}
                error={
                  formik.touched.nombre_empresa && Boolean(formik.errors.nombre_empresa)
                }
                helperText={formik.touched.nombre_empresa && formik.errors.nombre_empresa}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={10} p={1}>
          <Grid item xs={10} sm={5} md={5}>
            <FormControl fullWidth>
              <TextField
                id="direccion"
                name="direccion"
                label="Direccion"
                value={formik.values.direccion || ""}
                onChange={formik.handleChange}
                error={
                  formik.touched.direccion && Boolean(formik.errors.direccion)
                }
                helperText={formik.touched.direccion && formik.errors.direccion}
              />
            </FormControl>
          </Grid>
          <Grid item xs={10} sm={5} md={5}>
            <FormControl fullWidth>
              <TextField
                id="Telefono"
                name="Telefono"
                label="Telefono"
                value={formik.values.Telefono || ""}
                onChange={formik.handleChange}
                error={
                  formik.touched.Telefono && Boolean(formik.errors.Telefono)
                }
                helperText={formik.touched.Telefono && formik.errors.Telefono}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} columns={10} p={1}>
          <Grid item xs={10} sm={5} md={5}>
            <FormControl fullWidth>
              <TextField
                id="num_documento"
                name="num_documento"
                label="Numero Documento"
                value={formik.values.num_documento || ""}
                onChange={formik.handleChange}
                error={
                  formik.touched.num_documento &&
                  Boolean(formik.errors.num_documento)
                }
                helperText={
                  formik.touched.num_documento && formik.errors.num_documento
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={10} sm={6} md={5}>
            <FormControl fullWidth>
              <TextField
                id="tipo_documento"
                name="tipo_documento"
                label="Tipo Documento"
                select
                value={formik.values.tipo_documento}
                onChange={formik.handleChange}
                error={
                  formik.touched.tipo_documento &&
                  Boolean(formik.errors.tipo_documento)
                }
                helperText={
                  formik.touched.tipo_documento && formik.errors.tipo_documento
                }
              >
                <MenuItem value={"cl6zvn41d0000n9y84os7lur0"}>NIT</MenuItem>
                <MenuItem value={"I"}>CC</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={11} sm={11} p={2}>
          <Stack spacing={2} direction="row">
            <Button fullWidth type="submit" variant="contained">
              Guardar
            </Button>
          </Stack>
        </Grid>
      </form>
    </div>
  );
};

export default CrearEmpresa;
