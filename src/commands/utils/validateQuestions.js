export const validateInput = (input, cb = null) => {
  if (!input) {
    return "Project name cannot be empty.";
  }
  if (cb) {
    return cb(input);
  }
  return true;
};

export const validateChoices = (input, cb) => {
  if (!input) {
    return "You must choose a template type.";
  }
  if (!Choices.templateType.includes(input)) {
    return `${input} is invalid, must be one of ${Choices.templateType
      .map((ch) => `${ch},`)
      .join(" ")}`;
  }
  return true;
}
