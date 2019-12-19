
addEventListener('message', function(data) {
  data = data.data;
  if (!data.allowNegative) {
    if (data.data.data < 0) return 0;
  }
  postMessage({
    taskType: data.taskType,
    data: toThousands(data.data.data)
  });
});

function toThousands(value, precision = 2) {
  if (!isNaN(value) && typeof value === 'number') {
    value = String(value);
  }
  if (isNaN(value) || value == null) value = '0.00';
  if (!isNaN(value)) {
    value = toMoney(value, precision);
    const sum = value.split('.');
    sum[0] = Number(sum[0]).toLocaleString();
    return sum.join('.');
  } else {
    return '0.00';
  }
}

function toMoney(value, precision = 2) {
  const result = Number(value).toFixed(precision);
  return isNaN(result) ? (0).toFixed(precision) : result;
}
