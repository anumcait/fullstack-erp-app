import React, { useState } from 'react';
import {
  Box, Grid, Tabs, Tab, TextField, MenuItem,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import './EditItem.css';
import ItemSelectDialog from './ItemSelectDialog';

const tabLabels = [
  "Item Details", "Adv. Config", "Alt. Units", "Inv. Control",
  "Tax Details", "Price List", "Attr", "Attachments",
  "E-commerce", "Barcode Details"
];

export default function EditItem() {
  const [tabIndex, setTabIndex] = useState(0);

  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [productGroupOpen, setProductGroupOpen] = useState(false);
  const [storeDialogOpen, setStoreDialogOpen] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState('Finished Goods');
  const [selectedProductGroup, setSelectedProductGroup] = useState('Finished Goods');
  const [selectedStore, setSelectedStore] = useState('Main Store');

  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  return (
    <Box className="item-container">
      {/* Header */}
      <div className="item-header">
        <div className="item-title">
          <MenuIcon className="menu-icon" />
          <h2>Edit Item</h2>
        </div>
        <div className="item-actions">
          <Button variant="contained" color="primary" size="small">Save</Button>
          <Button variant="outlined" color="secondary" size="small" style={{ marginLeft: '8px' }}>Cancel</Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        className="item-tabs"
      >
        {tabLabels.map((label, idx) => (
          <Tab key={idx} label={label} className="tab-label" />
        ))}
      </Tabs>

      {/* Form */}
      <Grid container spacing={2} className="item-form">
        <Grid item xs={12} md={6}>
         
           <div className="form-row">
  <label>Item Code</label>
  <TextField
    size="small"
    variant="outlined"
    fullWidth
    defaultValue="FG-001"
  />
</div>
       
        
          <div className="form-row">
    
            <label>Item Name</label>
            <TextField
            //   label="Item Name"
              size="small"
            //   variant="outlined"
              fullWidth
              defaultValue="Shirts"
            />

          </div>
          <div className="form-row">
            <label>Unit</label>
            <TextField
             
              select
              size="small"
              variant="outlined"
              fullWidth
              defaultValue="Pcs"
            >
              <MenuItem value="Pcs">Pcs</MenuItem>
              <MenuItem value="Kg">Kg</MenuItem>
            </TextField>
          </div>

          {/* Item Group */}
          <div className="form-row">
            {/* <div className="combo-box-label"> */}
                 <label>Item Group</label>
            <div className="combo-box">
              
              <div className="combo-section combo-input-section">
            
                <input type="text" className="combo-input" value={selectedGroup} readOnly />
              </div>
              <div className="combo-section combo-icon-section" onClick={() => setItemDialogOpen(true)}>
                <SearchIcon fontSize="small" />
              </div>
              <div className="combo-section combo-button-section">
                <button className="combo-add-btn">Add</button>
              </div>
              </div>
            {/* </div> */}
          </div>

          <div className="form-row">
            <label>Stock Category</label>
            <TextField
         
              size="small"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="form-row">
            <label>Item Remarks</label>
        <TextField
  variant="outlined"
  size="small"
  fullWidth
  InputProps={{
    sx: {
      fontSize: '0.875rem',   // Input font
    }
  }}
  inputProps={{
    style: {
      padding: '8px 12px',     // Inner input padding (safe default)
    }
  }}
  InputLabelProps={{
    sx: {
      fontSize: '0.85rem',     // Label font size
    }
  }}
/>


          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className="form-row">
            
            <TextField
              label="Item Description"
            //   label="Item Description"
              multiline
              rows={3}
              fullWidth
              variant='outlined'
              size="small"
              InputProps={{
                sx: {
                  padding: 0,
                  '& textarea': {
                    padding: '8px',
                    fontSize: '0.875rem',
                    backgroundColor: 'transparent',
                    resize: 'none'
                  }
                }
              }}
            />
            {/* <TextField
  label="Item Description"
  multiline
  rows={3}
  fullWidth
  variant="outlined"
  size="small"
  InputProps={{
    sx: {
      padding: 0,
      '& textarea': {
        padding: '8px',
        fontSize: '0.875rem',
        backgroundColor: 'transparent',
        resize: 'none',
      }
    }
  }}
/> */}
          </div>
          <div className="form-row">
            <TextField
              label="Brand"
              select
              size="small"
              variant="outlined"
              fullWidth
              defaultValue=""
            >
              <MenuItem value="">-- Select --</MenuItem>
              <MenuItem value="Brand A">Brand A</MenuItem>
              <MenuItem value="Brand B">Brand B</MenuItem>
            </TextField>
          </div>

          {/* Product Group */}
          <div className="form-row">
            <div className="combo-box-label">
                 <label>Product Group</label>
                   <div className="combo-box">
              <div className="combo-section combo-input-section">
                <input type="text" className="combo-input" value={selectedProductGroup} readOnly />
              </div>
              <div className="combo-section combo-icon-section" onClick={() => setProductGroupOpen(true)}>
                <SearchIcon fontSize="small" />
              </div>
              <div className="combo-section combo-button-section">
                <button className="combo-add-btn">Add</button>
              </div>
            </div>
          </div>
          </div>

          {/* Store */}
          <div className="form-row">
            <div className='combo-box-label'>
                <label>Item Group</label>
            
            <div className="combo-box">
              <div className="combo-section combo-input-section">
                <input type="text" className="combo-input" value={selectedStore} readOnly />
              </div>
              <div className="combo-section combo-icon-section" onClick={() => setStoreDialogOpen(true)}>
                <SearchIcon fontSize="small" />
              </div>
              <div className="combo-section combo-button-section">
                <button className="combo-add-btn">Add</button>
              </div>
            </div>
          </div>
          </div>
        </Grid>
      </Grid>

      {/* Dialogs */}
      <ItemSelectDialog
        open={itemDialogOpen}
        onClose={() => setItemDialogOpen(false)}
        onSelect={(value) => {
          setSelectedGroup(value);
          setItemDialogOpen(false);
        }}
        title="Select Item Group"
        data={[
          { id: 'FG-001', name: 'Finished Goods' },
          { id: 'RM-002', name: 'Raw Materials' }
        ]}
      />

      <ItemSelectDialog
        open={productGroupOpen}
        onClose={() => setProductGroupOpen(false)}
        onSelect={(value) => {
          setSelectedProductGroup(value);
          setProductGroupOpen(false);
        }}
        title="Select Product Group"
        data={[
          { id: 'PG-001', name: 'Apparel' },
          { id: 'PG-002', name: 'Electronics' }
        ]}
      />

      <ItemSelectDialog
        open={storeDialogOpen}
        onClose={() => setStoreDialogOpen(false)}
        onSelect={(value) => {
          setSelectedStore(value);
          setStoreDialogOpen(false);
        }}
        title="Select Store"
        data={[
          { id: 'STR-001', name: 'Main Store' },
          { id: 'STR-002', name: 'Spare Store' }
        ]}
      />
    </Box>
  );
}
