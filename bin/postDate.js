const getDate = () => {
  const postDate = new Date();
  const [day, month, year] = [
    postDate.getDate(),
    postDate.getMonth(),
    postDate.getFullYear(),
  ];
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return day + " de " + monthNames[month] + " de " + year;
};

module.exports = getDate;
