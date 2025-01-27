'use client';

import { addScan, editScan, fileUploaded, getScanDetails, toolsList } from '@/store/toolsSlice';
import {
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { IconDatabasePlus, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

const ScanToolDrawer = ({ open, setDrawerOpen, selectedTool, setSelectedTool }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const userType = pathname.split('/')[1];

  const [scanName, setScanName] = useState('');
  const [toolType, setToolType] = useState('');
  const [command, setCommand] = useState('');
  const [runtime, setRuntime] = useState('');
  const [attributes, setAttributes] = useState('');
  const [image, setImage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [fileUpload, setFileUpload] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedTool) {
      dispatch(getScanDetails(selectedTool, userType)).then((res) => {
        if (res.status === 200) {
          setScanName(res.data.tool_name);
          setToolType(res.data.tool_type);
          setCommand(res.data.command);
          setRuntime(res.data.avg_runtime);
          setAttributes(JSON.stringify(res.data.attributes));
          setImage(res.data.image); // Could be server-stored image
          setIsVisible(res.data.visible);
          setUploadedFileName(
            res.data?.tool_icon.split('/')[res.data?.tool_icon.split('/')?.length - 1],
          );
        }
      });
    } else {
      initialState();
    }
  }, [selectedTool, dispatch]);

  const handleScanNameChange = (e) => {
    setScanName(e.target.value);
    if (errors.scanName) {
      setErrors((prev) => ({ ...prev, scanName: undefined }));
    }
  };

  const handleToolTypeChange = (e) => {
    setToolType(e.target.value);
    if (errors.toolType) {
      setErrors((prev) => ({ ...prev, toolType: undefined }));
    }
  };

  const handleCommandChange = (e) => {
    setCommand(e.target.value);
    if (errors.command) {
      setErrors((prev) => ({ ...prev, command: undefined }));
    }
  };

  const handleRuntimeChange = (e) => {
    setRuntime(e.target.value);
    if (errors.runtime) {
      setErrors((prev) => ({ ...prev, runtime: undefined }));
    }
  };

  const handleAttributesChange = (e) => {
    setAttributes(e.target.value);
    if (errors.attributes) {
      setErrors((prev) => ({ ...prev, attributes: undefined }));
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileUpload(file);

      if (errors.fileUpload) {
        setErrors((prev) => ({ ...prev, fileUpload: undefined }));
      }

      try {
        // Dispatch your file upload action
        const response = await dispatch(fileUploaded(file));
        setUploadedFileName(response?.data?.uuid);
      } catch (error) {
        console.error('File upload failed', error);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!scanName.trim()) newErrors.scanName = 'Scan Name is required.';
    if (!toolType.trim()) newErrors.toolType = 'Tool Type is required.';
    if (!command.trim()) newErrors.command = 'Command for Tool is required.';
    if (!runtime) newErrors.runtime = 'Average Runtime is required.';
    if (!attributes.trim()) newErrors.attributes = 'Tool Attributes are required.';
    if (!image.trim()) newErrors.image = 'Image is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function isValidJsonString(str) {
    if (typeof str !== 'string') return false; // not even a string
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    let finalAttributes;

    if (typeof attributes === 'object' && attributes !== null) {
      finalAttributes = attributes;
    } else {
      // Otherwise, parse or fallback to {}
      if (isValidJsonString(attributes)) {
        finalAttributes = JSON.parse(attributes);
      } else {
        try {
          finalAttributes = JSON.parse(attributes);
        } catch (err) {
          finalAttributes = {};
        }
      }
    }

    const payload = {
      tool_name: scanName,
      tool_type: toolType,
      tool_icon: `${process.env.NEXT_PUBLIC_API_URL}/admin/check/${uploadedFileName}`,
      command,
      attributes: finalAttributes,
      avg_runtime: parseFloat(runtime),
      image: image,
      visible: isVisible,
      id: selectedTool,
    };

    if (!selectedTool) {
      // Create new
      dispatch(addScan(payload))
        .then((res) => {
          if (res?.status === 200) {
            toast.success('Tool added successfully.');
            dispatch(toolsList(userType));
            onClose();
          }
        })
        .catch((err) => {
          toast.error('Failed to add tool. Please try again later.');
          onClose();
        });
    } else {
      // Edit existing
      dispatch(editScan(payload))
        .then((res) => {
          if (res?.status === 200) {
            toast.success('Tool updated successfully.');
            dispatch(toolsList(userType));
            onClose();
          }
        })
        .catch((err) => {
          toast.error('Failed to update tool. Please try again later.');
        });
    }
  };

  const onClose = () => {
    setDrawerOpen(!open);
    initialState();
  };

  const initialState = () => {
    setScanName('');
    setToolType('');
    setCommand('');
    setRuntime('');
    setAttributes('');
    setImage('');
    setIsVisible(false);
    setFileUpload(null);
    setUploadedFileName('');
    setErrors({});
    setSelectedTool('');
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: '100%', maxWidth: '500px' },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ padding: 3 }}>
          <Grid size={{ xs: 12 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" display="flex" alignItems="center">
                <IconDatabasePlus size="1.5rem" style={{ marginRight: '8px' }} />
                {!selectedTool ? 'Add New' : 'Edit'} Tool
              </Typography>
              <IconButton onClick={onClose} aria-label="close">
                <IconX />
              </IconButton>
            </Stack>
          </Grid>

          {/* Scan Name */}
          <Grid size={{ xs: 12 }}>
            <CustomFormLabel htmlFor="scan-name">Tool Name*</CustomFormLabel>
            <CustomTextField
              id="scan-name"
              variant="outlined"
              fullWidth
              value={scanName}
              onChange={handleScanNameChange}
              error={Boolean(errors.scanName)}
            />
            {errors.scanName && <FormHelperText error>{errors.scanName}</FormHelperText>}
          </Grid>

          {/* Tool Type */}
          <Grid size={{ xs: 12 }}>
            <CustomFormLabel htmlFor="tool-type">Tool Type*</CustomFormLabel>
            <CustomTextField
              id="tool-type"
              variant="outlined"
              fullWidth
              value={toolType}
              onChange={handleToolTypeChange}
              error={Boolean(errors.toolType)}
            />
            {errors.toolType && <FormHelperText error>{errors.toolType}</FormHelperText>}
          </Grid>

          {/* Command */}
          <Grid size={{ xs: 12 }}>
            <CustomFormLabel htmlFor="command">Command for Tool*</CustomFormLabel>
            <CustomTextField
              id="command"
              variant="outlined"
              fullWidth
              value={command}
              onChange={handleCommandChange}
              error={Boolean(errors.command)}
            />
            {errors.command && <FormHelperText error>{errors.command}</FormHelperText>}
          </Grid>

          {/* Runtime */}
          <Grid size={{ xs: 12 }}>
            <CustomFormLabel htmlFor="runtime">Average Runtime (in seconds)*</CustomFormLabel>
            <CustomTextField
              id="runtime"
              variant="outlined"
              type="number"
              fullWidth
              value={runtime}
              onChange={handleRuntimeChange}
              error={Boolean(errors.runtime)}
              inputProps={{
                inputMode: 'numeric',
                pattern: '\\d*',
                style: { MozAppearance: 'textfield' },
              }}
              sx={{
                '& input[type=number]': {
                  '-moz-appearance': 'textfield',
                },
                '& input[type=number]::-webkit-outer-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0,
                },
                '& input[type=number]::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0,
                },
              }}
            />
            {errors.runtime && <FormHelperText error>{errors.runtime}</FormHelperText>}
          </Grid>

          {/* Attributes */}
          <Grid size={{ xs: 12 }}>
            <CustomFormLabel htmlFor="attributes">Tool Attributes*</CustomFormLabel>
            <CustomTextField
              id="attributes"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={attributes}
              onChange={handleAttributesChange}
              error={Boolean(errors.attributes)}
            />
            {errors.attributes && <FormHelperText error>{errors.attributes}</FormHelperText>}
          </Grid>

          {/* Image (Text) */}
          <Grid size={{ xs: 12 }}>
            <CustomFormLabel htmlFor="image">Image*</CustomFormLabel>
            <CustomTextField
              id="image"
              variant="outlined"
              fullWidth
              value={image}
              onChange={handleImageChange}
              error={Boolean(errors.image)}
            />
            {errors.image && <FormHelperText error>{errors.image}</FormHelperText>}
          </Grid>

          {/* File Upload & Preview */}
          <Grid size={{ xs: 12 }}>
            <CustomFormLabel htmlFor="fileUpload">Upload File</CustomFormLabel>
            <CustomTextField
              id="fileUpload"
              variant="outlined"
              fullWidth
              type="file"
              onChange={handleFileChange}
              error={Boolean(errors.fileUpload)}
            />
            {errors.fileUpload && <FormHelperText error>{errors.fileUpload}</FormHelperText>}

            {!fileUpload && uploadedFileName && (
              <>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Current Image from Server:
                </Typography>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/admin/check/${uploadedFileName}`}
                  alt="Current"
                  style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '8px' }}
                />
              </>
            )}

            {/* Show a preview of the newly uploaded image (if any) */}
            {fileUpload && (
              <>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  New Image Preview:
                </Typography>
                <img
                  src={URL.createObjectURL(fileUpload)}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '8px' }}
                />
              </>
            )}

            {/* Show the uploaded file name (UUID from backend) */}
            {uploadedFileName && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Uploaded File: {uploadedFileName}
              </Typography>
            )}
          </Grid>

          {/* Tool Visibility Checkbox */}
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isVisible}
                  onChange={(e) => setIsVisible(e.target.checked)}
                  color="primary"
                />
              }
              label="Tool Visible?"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Drawer>
  );
};

export default ScanToolDrawer;
