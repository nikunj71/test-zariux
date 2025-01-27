'use client';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { IconDownload, IconSearch } from '@tabler/icons-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DashboardCard from '@/app/components/shared/DashboardCard';
import { getScanList, getScanStatus } from '@/store/toolsSlice';
import ScanViewModel from '../../ScanView';
import toast from 'react-hot-toast';

const ScanResults = () => {
  const dispatch = useDispatch();

  // Component-level state
  const [isLoading, setLoading] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [exportAnchor, setExportAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [scanDetails, setScanDetails] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Grab scanned data from Redux
  const { myScan } = useSelector((state) => state.toolsData);

  // Fetch scan list on mount
  useEffect(() => {
    dispatch(getScanList()).finally(() => setLoading(false));
  }, [dispatch]);

  // Action menu handlers
  const handleMenuOpen = (event, row) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRow(null);
  };

  // Export menu handlers
  const handleExportClick = (event) => {
    setExportAnchor(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchor(null);
  };

  // Search handler to update the search term state
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
  const columns = [
    { field: 'scan_type', headerName: 'Scan Type', flex: 1 },
    {
      field: 'scan_timestamp',
      headerName: 'Date',
      flex: 0.5,
      renderCell: (params) => {
        return <>{params?.value ? moment(params.value).format('DD / MM / YYYY') : ''}</>;
      },
    },
    { field: 'scan_status', headerName: 'Status', flex: 0.5 },
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
  return (
    <DashboardCard
      title="Scan Results"
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
            <MenuItem>Export to CSV</MenuItem>
            <MenuItem>Export to PDF</MenuItem>
          </Menu>
        </Stack>
      }
    >
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
      />
      <ScanViewModel isOpen={isOpen} setIsOpen={setIsOpen} scanDetails={scanDetails} />
    </DashboardCard>
  );
};

export default ScanResults;
