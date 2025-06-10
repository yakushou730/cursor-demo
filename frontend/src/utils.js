// 最大公因數（GCD）
function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// 最小公倍數（LCM）
function lcm(a, b) {
  return a * b / gcd(a, b);
}

module.exports = { gcd, lcm };
