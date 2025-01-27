'use client';

import DashboardCard from '@/app/components/shared/DashboardCard';
import { deleteTool, toolsList } from '@/store/toolsSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Button,
  Dialog,
  DialogActions,
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
import { IconSearch } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import ScanToolDrawer from './ScanToolDrawer';

const ScanToolList = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const userType = pathname.split('/')[1];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteToolId, setDeleteToolId] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const { allTools } = useSelector((state) => state.toolsData);

  useEffect(() => {
    dispatch(toolsList(userType));
  }, [dispatch]);

  const handleMenuOpen = (event, row) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRow(null);
  };

  const handleEdit = (row) => {
    setSelectedTool(row.tool_id);
    handleAddNewScan();
    handleMenuClose();
  };

  const handleDelete = (row) => {
    setDeleteToolId(row.tool_id);
    setConfirmOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTool(deleteToolId))
      .then((res) => {
        if (res.status === 200) {
          toast.success('Tool was successfully deleted.');
          setConfirmOpen(false);
          setDeleteToolId(null);
          dispatch(toolsList(userType));
        }
      })
      .catch((err) => {
        toast.error('Failed to delete tool');
        setConfirmOpen(false);
        setDeleteToolId(null);
      });
  };

  const filteredRows = (allTools || []).filter((tool) => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      (tool.tool_name && tool.tool_name.toLowerCase().includes(lowerSearch)) ||
      (tool.tool_type && tool.tool_type.toLowerCase().includes(lowerSearch));

    // If you are using a separate status filter field, you can leave this logic
    const matchesStatus = statusFilter ? tool.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });
  const handleAddNewScan = () => {
    setDrawerOpen(!drawerOpen);
  };

  const columns = [
    {
      field: 'tool_name',
      headerName: 'Too Name',
      flex: 1,
    },
    {
      field: 'tool_type',
      headerName: 'Type',
      flex: 1,
    },
    {
      field: 'avg_runtime',
      headerName: 'Average Runtime',
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
            // Use tool_id for ID comparison
            open={Boolean(menuAnchor) && selectedRow?.tool_id === params.row.tool_id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleEdit(params.row)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(params.row)}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <>
      <DashboardCard
        title="Tools List"
        action={
          <Stack direction="row" flexWrap={'wrap'} gap={2}>
            <TextField
              placeholder="Search Scan"
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size="1.1rem" />
                    </InputAdornment>
                  ),
                },
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddNewScan}>
              Add New Tool
            </Button>
          </Stack>
        }
      >
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={(row) => row.tool_id} // Tells DataGrid which field is the ID
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
      </DashboardCard>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the tool with ID: {deleteToolId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          {/* You can set color="error" if you'd like a red delete button */}
          <Button onClick={handleConfirmDelete} autoFocus variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ScanToolDrawer
        open={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
    </>
  );
};

export default ScanToolList;
