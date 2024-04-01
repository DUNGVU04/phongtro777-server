require('dotenv').config()
const generateCode = (value) => {
    let output = ''
    value = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("")
    let merge = value + process.env.phongtro123
    // abc + phongtro123 = abcphongtro123
    let length = merge.length
    for (let i = 0; i < 3; i++) {
        let index = i === 2 ? Math.floor(merge.length / 2 + length / 2) : Math.floor(length / 2)
        output += merge.charAt(index)
        length = index
    }
    return `${value.charAt(2)}${output}`.toUpperCase()// charAt(2) để tránh không bị trùng code
}
export default generateCode