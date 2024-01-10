
const ERROR_CODES = {
  'GP001': 'Asegurate que el nombre sea correcto.',
  'GP002': 'El nombre solo puede contener letras.',
  'GP003': 'Asegurate que el apellido sea correcto.',
  'GP004': 'El apellido solo puede contener letras.',
  'GP005': 'Ingresá el DNI sin puntos ni espacios.',
  'GP006': 'Asegurate de que el Nombre completo sea correcto.',
  'GP014': 'Asegurate de que el e-mail sea correcto.',
  'GP007': 'Asegurate de que el código de área sea correcto.',
  'GP008': 'Asegurate de que el celular sea correcto.',
  'GP009': 'El celular solo puede contener números.',
  'GP010': 'El DNI solo puede contener números.',
  'GP011': 'El código de área solo puede contener números.',
  'GP012': 'Campo incompleto.',
  'GP013': 'Asegurate de que el campo no esté vacío',
  'GP016': 'Error en el Email',
  'MP316': 'Ingresa un nombre válido.',
}

export type ValidationType = { isValid: boolean; errorMessage?: string };

const checkIfHaveOnlyNumbers = (value = '') => /^[0-9]*$/.test(value);
const checkIfHaveNumber = (value: string):boolean => /\d/.test(value);
const checkMinLength = (value: string, minLength: number): boolean => (value.length < minLength);

export const validateNotEmptyField = (value: string): ValidationType => {
  if(checkMinLength(value, 2)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP013'],
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};

export const validateField = (value: string): ValidationType => {
  return {
    isValid: (value !== '' && !/^[A-Za-z]+$/i.test(value)) && true,
    errorMessage: '',
  };
};

export const validateEmptyField = (value: string): ValidationType => {
  return {
    isValid: (value !== '') ? true : false,
    errorMessage: ERROR_CODES['GP012'],
  };
}

export const validateFullName = (value = '', minLength = 5): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP012'],
    };
  } else if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP001'],
    };
  } else if (checkIfHaveNumber(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP002'],
    }
  } else if(value.split(' ').filter(_ => _ !== '').length <= 1) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP014'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateFirstName = (value = '', minLength = 2): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP012'],
    };
  } else if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP001'],
    };
  } else if (checkIfHaveNumber(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP002'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateLastName = (value = '', minLength = 2): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP012'],
    };
  } else if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP003'],
    };
  } else if (checkIfHaveNumber(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP004'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateAreaCode = (value = '', minLength = 2): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP012'],
    };
  } else if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP007'],
    };
  } else if (!checkIfHaveOnlyNumbers(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP011'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validatePhoneNumber = (value = '', minLength = 8): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP012'],
    };
  } else if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP008'],
    };
  } else if (!checkIfHaveOnlyNumbers(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP009'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateCitizenId = (value: string, minLength = 7): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP012'],
    };
  } else if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP005'],
    };
  } else if (!checkIfHaveOnlyNumbers(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP010'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateEmail = (value: string): ValidationType => {
  if(value === '') {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP012'],
    };
  } else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['GP016'], 
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}
