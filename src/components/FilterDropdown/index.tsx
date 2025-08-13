import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';

interface Props {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  getCountForOption?: (option: string) => number;
}

const FilterDropdown = ({ label, options, value, onChange, getCountForOption }: Props) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value as string[];
    onChange(selected);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        label={label}
        value={value}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={value.includes(option)} />
            <Box sx={{ flexGrow: 1 }}>
              <ListItemText primary={option} />
            </Box>
            {getCountForOption && (
              <Typography variant="body2" color="text.secondary">
                {getCountForOption(option)}
              </Typography>
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterDropdown;
