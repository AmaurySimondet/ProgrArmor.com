const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
      textAlign: "justify",
      fontSize: "12px",
      fontWeight: state.data.className==="select-title" ? 800 : 500
    })
  }

export default customStyles;