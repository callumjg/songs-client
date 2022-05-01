import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@material-ui/core";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageSpinner from "../components/PageSpinner";
import SongTitle from "../components/SongTitle";
import useServices from "../hooks/useServices";

const formatDate = (date: string) => moment(date).format("Do MMM YYYY");

const ServicesPage = () => {
  const [services, , loading] = useServices();

  const sorted = (services || []).sort((a, b) =>
    moment(a.date).isBefore(moment(b.date)) ? 1 : -1
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();

  return (
    <PageSpinner loading={loading}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Songs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((service, i) => (
                <TableRow key={service.date}>
                  <TableCell>{formatDate(service.date)}</TableCell>
                  <TableCell align="right">
                    {service.songs?.map((songId) => (
                      <div key={songId}>
                        <SongTitle id={songId} />
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={services.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </PageSpinner>
  );
};

export default ServicesPage;
