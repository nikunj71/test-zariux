'use client';

import DashboardCard from '@/app/components/shared/DashboardCard';
import { getScanList, getScanStatus } from '@/store/toolsSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { IconDownload, IconSearch } from '@tabler/icons-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScanViewModel from '../ScanView';
import toast from 'react-hot-toast';

const PastScanList = () => {
  // State for search, filtering, menus, etc.
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [exportAnchor, setExportAnchor] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [scanDetails, setScanDetails] = useState();
  const [isOpen, setIsOpen] = useState(false);
  // Redux
  const dispatch = useDispatch();
  const { myScan } = useSelector((state) => state.toolsData);

  // On mount, fetch the list of scans
  useEffect(() => {
    dispatch(getScanList());
  }, [dispatch]);

  // Handlers: Export
  const handleExportClick = (event) => {
    setExportAnchor(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchor(null);
  };

  // Handlers: Search & Filter
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  // Handlers: Action menu
  const handleMenuOpen = (event, row) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRow(null);
  };

  const handleView = (row) => {
    debugger;
    dispatch(getScanStatus(row?.scan_id));
    handleMenuClose();
  };

  const rows =
    (myScan?.length &&
      myScan?.map((item, index) => ({
        ...item,
        id: item.scan_id ?? index,
      }))) ||
    [];
  const filteredRows = rows.filter((row) => {
    if (!searchTerm) return true;

    let targetValue = '';
    try {
      targetValue = JSON.parse(row.target_variable)?.url || '';
    } catch {
      targetValue = row.target_variable || '';
    }

    const lowerSearch = searchTerm.toLowerCase();

    return (
      targetValue.toLowerCase().includes(lowerSearch) ||
      (row.scan_type && row.scan_type.toLowerCase().includes(lowerSearch)) ||
      (row.state && row.state.toLowerCase().includes(lowerSearch)) ||
      (row.scan_status && row.scan_status.toLowerCase().includes(lowerSearch))
    );
  });

  const handleOpenViewModel = (row) => {
    dispatch(getScanStatus(row?.scan_id)).then((res) => {
      if (res?.data?.info) {
        if (res?.data?.status === 'failed') {
          toast.error('Task failed');
        } else {
          setIsOpen(!isOpen);
          setScanDetails(res?.data);
        }
      } else {
        toast.error(res?.data?.detail);
      }
    });
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'scan_type', headerName: 'Scan Type', flex: 1 },
    {
      field: 'scan_timestamp',
      headerName: 'Date',
      flex: 0.5,
      renderCell: (params) => {
        return <>{moment(params?.scan_timestamp).format('DD / MM / YYYY') || ''}</>;
      },
    },
    {
      field: 'scan_status',
      headerName: 'Status',
      flex: 0.5,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton aria-label="actions" onClick={(event) => handleMenuOpen(event, params.row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor) && selectedRow?.id === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleOpenViewModel(params.row)}>View</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <DashboardCard
      title="Past Scans"
      action={
        <Stack direction="row" spacing={2}>
          <TextField
            placeholder="Search Results"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" startIcon={<IconDownload />} onClick={handleExportClick}>
            Export
          </Button>
          <Menu anchorEl={exportAnchor} open={Boolean(exportAnchor)} onClose={handleExportClose}>
            <MenuItem onClick={() => alert('Export CSV')}>Export to CSV</MenuItem>
            <MenuItem onClick={() => alert('Export PDF')}>Export to PDF</MenuItem>
          </Menu>
        </Stack>
      }
    >
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row.scan_id}
          autoHeight
          disableColumnMenu
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
      <ScanViewModel isOpen={isOpen} setIsOpen={setIsOpen} scanDetails={scanDetails} />
    </DashboardCard>
  );
};

export default PastScanList;
