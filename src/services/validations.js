module.exports = {

  fieldRequired(fieldValue) {
    if (fieldValue.trim().length >= 3) return true;
  },

  cnpj(fieldValue) {
    if (fieldValue.length === 18) return true;
  },

  maximumChar(fieldValue, field) {
    if (field === 'codigo') {
      if (fieldValue.length > 4)
        return;
    }
  }
}