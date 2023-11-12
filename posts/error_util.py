def format_errors(errors):
  formatted_errors = {}
  for field, error_list in errors.items():
    formatted_errors[field] = [str(error) for error in error_list]
  return formatted_errors
