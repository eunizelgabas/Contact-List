//Format contact number 
export const formatContactNo = (contactNo) => {
    // Format as xxxx-xxx-xxxx
    return `${contactNo.slice(0, 4)}-${contactNo.slice(4, 7)}-${contactNo.slice(7, 11)}`;
  };
  