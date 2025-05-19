module.exports = {
  async redirects() {
    return [
      {
        source: '/features',
        destination: '/register',
        permanent: true, // Use true for a 308 redirect
      },
    ];
  },
};
