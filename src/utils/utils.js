module.exports = {
  getPlatformIcon: function (platformName, platformList) {
    try {
      return platformList.find((item) => item.nome === platformName).icone;
    } catch (err) {
      console.log("Plataforma não encontrada");
      return "mdi:help";
    }
  },
  getCategorySlug: function (category, categoryList) {
    return categoryList.find((item) => item.nome === category).slug || "noSlug";
  },
};
