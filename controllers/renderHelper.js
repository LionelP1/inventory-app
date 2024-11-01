// const renderWithLayout = (res, title, bodyTemplate, data = {}) => {
//   res.render('index', {
//     title,
//     body: `<%- include("${bodyTemplate}") %>`,
//     ...data
//   });
// };

const renderWithLayout = (res, title, bodyTemplate, data = {}) => {
  // Pass the title, bodyTemplate, and any other data directly to the layout
  res.render('index', {
    title,
    bodyTemplate, // Pass the template name
    ...data // Spread other data
  });
};

const renderError = (res, message) => {
  renderWithLayout(res, 'Error', 'error', { message });
};

module.exports = {
  renderWithLayout,
  renderError,
};