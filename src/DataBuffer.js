class DataBuffer {
    constructor() {
        this.bytearr = []
    }

    write(byte) {
        this.bytearr.push(byte)
    }

    writeByteArray(byteArray) {
        for(let i = 0; i < byteArray.length; i++) {
            this.write(byteArray[i])
        }
    }

    writeInt(int) {
        this.write((int >>> 24) & 0xFF)
        this.write((int >>> 16) & 0xFF)
        this.write((int >>>  8) & 0xFF)
        this.write((int >>>  0) & 0xFF)
    }

    getWriteInt(int) {
        return [
            (int >>> 24) & 0xFF,
            (int >>> 16) & 0xFF,
            (int >>> 8) & 0xFF,
            (int >>> 0) & 0xFF
        ]
    }

    writeLong(long) {
        this.write(rshift(long, 56) & 0xFF)
        this.write(rshift(long, 48) & 0xFF)
        this.write(rshift(long, 40) & 0xFF)
        this.write(rshift(long, 32) & 0xFF)
        this.write(rshift(long, 24) & 0xFF)
        this.write(rshift(long, 16) & 0xFF)
        this.write(rshift(long,  8) & 0xFF)
        this.write(rshift(long,  0) & 0xFF)
    }

    writeBoolean(bool) {
        this.write(bool ? 1 : 0)
    }

    // https://gist.github.com/joni/3760795/8f0c1a608b7f0c8b3978db68105c5b1d741d0446
    writeUTF8(str) {
        let utf8 = []
        let utflen = str.length; // optimized for ASCII

        for (let i = 0; i < str.length; i++) {
            let c = str.charAt(i);
            if (c >= 0x80 || c === 0)
                utflen += (c >= 0x800) ? 2 : 1;
        }

        utf8.push(rshift(utflen, 8) & 0xFF)
        utf8.push(rshift(utflen, 0) & 0xFF)

        for (let i = 0; i < str.length; i++) {
            let charcode = str.charCodeAt(i)
            if (charcode < 0x80) utf8.push(charcode)
            else if (charcode < 0x800) {
                utf8.push(0xC0 | (charcode >> 6), 0x80 | (charcode & 0x3f))
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xE0 | (charcode >> 12),
                    0x80 | ((charcode>>6) & 0x3f),
                    0x80 | (charcode & 0x3f))
            }
            // surrogate pair
            else {
                i++
                charcode = ((charcode&0x3ff)<<10)|(str.charCodeAt(i)&0x3ff)
                utf8.push(0xf0 | (charcode >>18),
                    0x80 | ((charcode>>12) & 0x3f),
                    0x80 | ((charcode>>6) & 0x3f),
                    0x80 | (charcode & 0x3f))
            }
        }
        this.writeByteArray(utf8)
    }

    getLavaplayerBase64() {
        let binary = ''

        // Need to add a prefix in front of the entire byte array that determines the length, use flag '1'
        let lengthBytes= this.getWriteInt(this.bytearr.length | (1 << 30))  // the prefix
        let byteArr = this.bytearr  // other bytes

        // put that prefix in front of the other bytes
        let totalBytes = [...lengthBytes, ...byteArr]

        // convert to a ByteBuffer
        let totalBytesArrayBuffer = new Uint8Array(totalBytes)

        let len = totalBytesArrayBuffer.byteLength
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( totalBytesArrayBuffer[ i ] )
        }
        //convert to base64
        return window.btoa( binary )
    }
}

/*
We can't use the >>> and <<< operators here because JavaScript only allows bitwise shift for 32bit values
 */

function rshift(number, shift) {
    return Math.floor(number / Math.pow(2, shift))
}

export default DataBuffer

/*
EXAMPLE USAGE

    let dataBuffer = new DataBuffer()
    dataBuffer.write(2)
    dataBuffer.writeUTF8(track.title)
    dataBuffer.writeUTF8(track.artist)
    dataBuffer.writeLong(track.duration)
    dataBuffer.writeUTF8(track.videoID)
    dataBuffer.writeBoolean(false)
    dataBuffer.writeBoolean(true)
    dataBuffer.writeUTF8(track.url)
    dataBuffer.writeUTF8("youtube")
    dataBuffer.writeLong(0)

    return dataBuffer.getLavaplayerBase64()

*/

