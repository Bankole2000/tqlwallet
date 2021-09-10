const formatNumber = (number) => {
  if (number) {
    if (number < 0) {
      number *= -1;
    }
    number = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN', decimalSeparator: '.', decimalPlaces: 2 }).format(number)
    return number.replace("NGN", "₦")
  }
  return number
}

const dateTime = (datelike) => {

  let dateTime = new Date(datelike);

  return dateTime.toLocaleString(["en-US"], {
    month: "short",
    day: "2-digit",
    weekday: "short",
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

module.exports = { formatNumber, dateTime }