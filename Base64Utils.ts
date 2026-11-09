/*
⣿⣿⡿⠿⠿⠿⢿⣇⣀⠀⠀⢀⣸⣿⠿⣿⣇⡀ ⠀⣀⣼⡿⠿⠿⠿⢿⣿⣀⠀⢸⣿⣿⣿⣿⠿⢿⠿⠿⠀⠀⢀⣀⣿⠿⠿⠿⠟⠀⠀⠀⠀⠀⣀⣽⣿⣿⣿⡟
⣿⣿⡇⠀⠀⠀⢸⣿⣿⠀⣤⣼⡿⣿⠄⢻⣿⣿⣧⠀⣿⣿⣧⠀⠀  ⠟⠛⠀⢸⣿⣿⠛⠿⠃⠀⠀⠀⠀⢠⣼⣿  ⠀⠀⠀⠀⠀⠀⢠⣤⣿⠛⢻⣿⣿
⣿⣿⣷⢶⢶⡶⣾⣏⡉⠀⣿⣿⣇⠈⢀⣘⣿⣿⣿⠀⠈⠹⠿⠿⠿⠶⣷⣶⣀⠀⢸⣿⣿⢿⣶⣶⢶⠶⠀⠀⢸⣿⣿⠶⠶⠶⢶⣶⣀⠀⢰⣾⣿⠉⢁⣸⣿⣿⠇
⣿⣿⡇⠀⠀⠀⢸⣿⣿⠀⣿⣿⡟⢻⣿⣿⣿⣿⣿⠀⢠⣤⡄⠀⠀⠀⢸⣿⣿⠀⣾⣿⣿⠀⢰⠂⠀⠀⠀⠀⢸⣿⣿⠀⠀⠀⢸⣿⣿⡄⠛⣿⡟⠛⠛⢻⣿⣿⡟⠛
⣿⣿⣧⣤⣤⣤⣾⡟⠋⠀⣿⣿⡇⠀⠀⠀⢸⣿⣿⠀⠙⢻⣷⣤⣤⣤⣼⣿⠛⠀⢸⣿⣿⣤⣤⣤⣤⣤⣤⠀⠘⢻⣿⣤⣤⣤⣼⣿⠛⠀⠀⠀⠦⠀⠀⢸⣿⣿

⢸⣿⣿⠀⠀⠀⠀⣿⣿⡇⠀⠀⠻⠿⢿⣿⣿⠿⠿⠇⠀⠀⠻⠿⢿⣿⣿⠿⠿⠇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⣀⣸⡿⠿⠿⠿⢿⣧⣀
⢸⣿⣿⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀ ⣸⣿⣿⠀⠀ ⠀⠀⣿⣿⡇⠀⠀  ⠀⠀⣿⣿⣇⣀⠀⠀ ⠘⠛⠛
⢸⣿⣿⠀⠀⠀ ⣿⣿⡇⠀⠀⠀ ⢸⣿⣿⠀⠀⠀⠀⠀  ⢹⣿⣿⠀⠀⠀⠀ ⣿⣿⡇⠀⠀    ⠀⣹⠿⡿⡿⠷⣾⣷⣆⣀
⢸⣿⣿⠀⠀⠀ ⣿⣿⡇⠀⠀  ⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀ ⣿⣿⣧ ⠀⠀      ⠀    ⢸⣿⣿
⠈⠛⣿⣴⣾⣦⣤⣿⠟⠃⠀⠀  ⢸⣿⣿⠀⠀⠀⠀⠀⣤⣤⣼⣿⣿⣿⣶⡄⠀⠀⣿⣿⣷⣶⣷⣴⣾⣦⢀⠛⢿⣷⣦⣤⣤⣼⡟⠋

An open-source project hosted on GitHub, created by Slygem123,
that provides simple functions for encoding and decoding strings using Base64 with UTF-8 character support. 
It makes handling encoded text easier and allows you to work with a wider range of characters,
including special characters and non-English text.
    
*/


function base64Decode(input: string): string {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    let output = ""
    let buffer = 0
    let bits = 0

    let bytes: number[] = []

    for (let i = 0; i < input.length; i++) {
        let c = input.charAt(i)

        if (c == "=") break

        let value = chars.indexOf(c)
        if (value < 0) continue

        buffer = (buffer << 6) | value
        bits += 6

        if (bits >= 8) {
            bits -= 8
            bytes.push((buffer >> bits) & 255)
        }
    }

    for (let i = 0; i < bytes.length;) {
        let c = bytes[i++]

        if (c < 128) {
            output += String.fromCharCode(c)
        } else if (c < 224) {
            let c2 = bytes[i++]
            output += String.fromCharCode(
                ((c & 31) << 6) | (c2 & 63)
            )
        } else if (c < 240) {
            let c2 = bytes[i++]
            let c3 = bytes[i++]
            output += String.fromCharCode(
                ((c & 15) << 12) |
                ((c2 & 63) << 6) |
                (c3 & 63)
            )
        } else {
            let c2 = bytes[i++]
            let c3 = bytes[i++]
            let c4 = bytes[i++]

            let code = ((c & 7) << 18) |
                ((c2 & 63) << 12) |
                ((c3 & 63) << 6) |
                (c4 & 63)

            code -= 0x10000

            output += String.fromCharCode(0xD800 + (code >> 10))
            output += String.fromCharCode(0xDC00 + (code & 0x3FF))
        }
    }

    return output
}

function base64Encode(input: string): string {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    let bytes: number[] = []

    for (let i = 0; i < input.length; i++) {
        let c = input.charCodeAt(i)

        if (c >= 0xD800 && c <= 0xDBFF && i + 1 < input.length) {
            let c2 = input.charCodeAt(i + 1)
            if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
                c = 0x10000 + ((c - 0xD800) << 10) + (c2 - 0xDC00)
                i++
            }
        }

        if (c < 0x80) {
            bytes.push(c)
        } else if (c < 0x800) {
            bytes.push(0xC0 | (c >> 6))
            bytes.push(0x80 | (c & 0x3F))
        } else if (c < 0x10000) {
            bytes.push(0xE0 | (c >> 12))
            bytes.push(0x80 | ((c >> 6) & 0x3F))
            bytes.push(0x80 | (c & 0x3F))
        } else {
            bytes.push(0xF0 | (c >> 18))
            bytes.push(0x80 | ((c >> 12) & 0x3F))
            bytes.push(0x80 | ((c >> 6) & 0x3F))
            bytes.push(0x80 | (c & 0x3F))
        }
    }

    let output = ""

    for (let i = 0; i < bytes.length; i += 3) {
        let b1 = bytes[i]
        let b2 = i + 1 < bytes.length ? bytes[i + 1] : 0
        let b3 = i + 2 < bytes.length ? bytes[i + 2] : 0

        output += chars.charAt(b1 >> 2)
        output += chars.charAt(((b1 & 3) << 4) | (b2 >> 4))

        if (i + 1 < bytes.length) {
            output += chars.charAt(((b2 & 15) << 2) | (b3 >> 6))
        } else {
            output += "="
        }

        if (i + 2 < bytes.length) {
            output += chars.charAt(b3 & 63)
        } else {
            output += "="
        }
    }

    return output
}
