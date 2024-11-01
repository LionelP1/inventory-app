const renderWithLayout = (res, title, bodyTemplate, data = {}) => {
  res.render('index', {
    title,
    bodyTemplate,
    ...data
  });
};

const renderError = (res, message) => {
  renderWithLayout(res, 'Error', 'error', { message });
};

module.exports = {
  renderWithLayout,
  renderError,
};