'use client';

import DashboardCard from '@/app/components/shared/DashboardCard';
import { deleteTool, toolsList } from '@/store/toolsSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { IconSearch } from '@tabler/icons-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { deleteUser, getUserList } from '@/store/userSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const userType = pathname.split('/')[1];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const { userList } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(getUserList());
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
    setDeleteUserId(row.user_id);
    setConfirmOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUser(deleteUserId))
      .then((res) => {
        if (res.status === 200) {
          toast.success('User was successfully deleted.');
          setConfirmOpen(false);
          setDeleteUserId(null);
          dispatch(getUserList(userType));
        }
      })
      .catch((err) => {
        toast.error('Failed to delete user');
        setConfirmOpen(false);
        setDeleteUserId(null);
      });
  };

  const filteredRows = (userList || []).filter((tool) => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      (tool.name && tool.name.toLowerCase().includes(lowerSearch)) ||
      (tool.email && tool.email.toLowerCase().includes(lowerSearch));

    const matchesStatus = statusFilter ? tool.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });
  const handleAddNewScan = () => {
    setDrawerOpen(!drawerOpen);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'User Name',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'Date',
      flex: 0.5,
      renderCell: (params) => <>{moment(params?.row?.created_at).format('DD/MM/YYYY')}</>,
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
            open={Boolean(menuAnchor) && selectedRow?.user_id === params.row.user_id}
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
        title="User List"
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
          </Stack>
        }
      >
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={(row) => row.user_id} // Tells DataGrid which field is the ID
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
            Are you sure you want to delete the user with ID: {deleteUserId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirmOpen(false);
              setDeleteUserId(null);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} autoFocus variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserList;
