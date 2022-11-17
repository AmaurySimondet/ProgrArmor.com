import { borderColor } from "@mui/system";

const customStylesDark = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "black",
      color: "white",
      textAlign: "justify",
      fontSize: "12px",
      fontWeight: state.data.className==="select-title" ? 800 : 500,
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "black",
      color: "white",
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: 'white',
    }),
    singleValue: (defaultStyles) => ({
      ...defaultStyles,
      color: 'white',
    }),
    input: (defaultStyles) => ({
      ...defaultStyles,
      color: 'white',
    }),
  }

export default customStylesDark;