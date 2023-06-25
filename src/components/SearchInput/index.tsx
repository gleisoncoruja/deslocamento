import { InputAdornment, TextField } from "@mui/material";
import { BsSearch } from "react-icons/bs";

interface ISearchInputProps {
  onChange?: () => void;
  label: string;
  placeholder: string;
}
export const SearchInput = ({
  onChange,
  label,
  placeholder,
}: ISearchInputProps) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BsSearch color="#757575" />
          </InputAdornment>
        ),
      }}
    />
  );
};
