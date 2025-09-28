import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useDebounce } from '../../../hooks/useDebounce';
import type { InputProps } from './interface';

const Input: React.FC<InputProps> = ({
  variant = 'outlined',
  size = 'medium',
  color = 'primary',
  type = 'text',
  label,
  placeholder,
  value,
  defaultValue,
  disabled = false,
  required = false,
  error = false,
  helperText,
  fullWidth = false,
  multiline = false,
  rows,
  maxRows,
  minRows,
  startAdornment,
  endAdornment,
  onChange,
  onBlur,
  onFocus,
  className,
  sx,
  InputProps,
  inputProps,
  // Search-specific props
  search = false,
  debounceDelay = 500,
  onDebouncedChange,
  searchIcon,
  clearable = false,
  onClear,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<string>(
    (value as string) || (defaultValue as string) || ''
  );
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const debouncedValue = useDebounce(internalValue, debounceDelay);

  // Update internal value when external value changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value as string);
    }
  }, [value]);

  // Call debounced change handler (but not for initial value)
  useEffect(() => {
    if (onDebouncedChange && hasUserInteracted) {
      onDebouncedChange(debouncedValue);
    }
  }, [debouncedValue, onDebouncedChange, hasUserInteracted]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    setHasUserInteracted(true);

    // Call the original onChange if provided
    if (onChange) {
      onChange(event);
    }
  };

  const handleClear = () => {
    setInternalValue('');
    if (onClear) {
      onClear();
    }
    // Create synthetic event for onChange
    if (onChange) {
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  // Determine adornments
  const resolvedStartAdornment = search
    ? searchIcon || <SearchIcon />
    : startAdornment;

  const resolvedEndAdornment =
    clearable && internalValue ? (
      <IconButton
        size="small"
        onClick={handleClear}
        disabled={disabled}
        sx={{ mr: -0.5 }}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    ) : (
      endAdornment
    );

  const inputPropsWithAdornments = {
    ...InputProps,
    startAdornment: resolvedStartAdornment ? (
      <InputAdornment position="start">{resolvedStartAdornment}</InputAdornment>
    ) : undefined,
    endAdornment: resolvedEndAdornment ? (
      <InputAdornment position="end">{resolvedEndAdornment}</InputAdornment>
    ) : undefined,
  };

  return (
    <TextField
      variant={variant}
      size={size}
      color={color}
      type={search ? 'search' : type}
      label={label}
      placeholder={placeholder}
      value={internalValue}
      disabled={disabled}
      required={required}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      maxRows={maxRows}
      minRows={minRows}
      InputProps={inputPropsWithAdornments}
      inputProps={inputProps}
      onChange={handleChange}
      onBlur={onBlur}
      onFocus={onFocus}
      className={className}
      sx={sx}
      {...props}
    />
  );
};

export default Input;
