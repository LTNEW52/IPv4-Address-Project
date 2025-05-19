const ip = document.getElementById("ip")
const submit = document.getElementById("submit")
const container = document.getElementById("container")
const converter = document.getElementById("converter")
const error = document.createElement("p")
error.id = "error"
const convertIp = document.createElement("p")
convertIp.className = "ipadd"
const classType = document.createElement("p")
classType.className = "ipadd"
const subnetting = document.createElement("p")
subnetting.className = "ipadd"
const iprange = document.createElement("p")
iprange.className = "ipadd"
const hostRange = document.createElement("p")
hostRange.className = "ipadd"


submit.addEventListener("click" , () => {
    converter.style.display = "block"
    converter.textContent = ""
    let decIpv4 = binIpv4 = null

    // Converting Ip Address

    if (ip.value != "") {
        ipv4 = ip.value
        dotCount = spaceCount = 0
        for (let i = 0 ; i < ipv4.length ; i++) {
            if (ipv4[i] == ".") {
                dotCount++
            } else if (ipv4[i] == " ") {
                spaceCount++
            }
        }
        if (dotCount == 3) {
            decIpv4 = ipv4.split(".")
            binIpv4 = decToBin(decIpv4)
            binIpv4 = binIpv4.join(" ")
            convertIp.textContent = "Your Binary Ip is: " + binIpv4
            converter.appendChild(convertIp)
            binIpv4 = binIpv4.split(" ")
        } else if (spaceCount == 3) {
            binIpv4 = ipv4.split(" ")
            decIpv4 = binToDec(binIpv4)
            decIpv4 = decIpv4.join(".")
            convertIp.textContent = "Your Decimal Ip is: " + decIpv4
            converter.appendChild(convertIp)
            decIpv4 = decIpv4.split(".")
        }

        // Class range
        
        classType.textContent = classRange(Number(decIpv4[0]))
        converter.appendChild(classType)

        // Subnet mask

        subnetting.textContent = subnet(Number(decIpv4[0]))
        converter.appendChild(subnetting)

        // IP address range

        if (decIpv4[0] <= 223) {
            iprange.textContent = "IP range is " + decIpv4[0] + "." + decIpv4[1] + "." + decIpv4[2] + "." + "0 " + "to " + decIpv4[0] + "." + decIpv4[1] + "." + decIpv4[2] + "." + "255"
            converter.appendChild(iprange)
        } else if (decIpv4[0] > 239) {
            iprange.textContent = "Class E doesnt have IP range for host"
            converter.appendChild(iprange)
        } else {
            iprange.textContent = "Class D doesnt have IP range for host"
            converter.appendChild(iprange)
        }
        

        // Total possible host id calculation

        hostRange.textContent = hostCalc(binIpv4)
        converter.appendChild(hostRange)

    } else {
        error.textContent = "Please enter your IPv4 address!"
        converter.appendChild(error)
    }
})

function decToBin(x) {
    let temp = []
    let reminder = []
    for (let i = 0 ; i < x.length ; i++) {
        let y = x[i]
        while (y != 0) {
            reminder.push(y % 2)
            y = Math.trunc(y / 2)
        }
        temp.push(reminder.reverse())
        if (temp[i].length != 8) {
            while (temp[i].length != 8) {
                temp[i].unshift(0)
            }
        }
        temp[i] = temp[i].join("")
        reminder = []
    }
    return temp
}

function binToDec(x) {
    let temp = []
    for (let i = 0 ; i < x.length ; i++) {
        let y = 0
        let k = 7
        for (let j = 0 ; j < 8 ; j++) {
            y += x[i][j] * Math.pow(2 , k)
            k--
        }
        temp.push(y)
    }
    return temp
}

function classRange(x) {
    y = ""
    if (x > 0 && x < 128) {
        y = "It is a Class A IP address"
    } else if (x > 127 && x < 192) {
        y = "It is a Class B IP address"
    } else if (x > 191 && x < 224) {
        y = "It is a Class C IP address"
    } else if (x > 223 && x < 240) {
       y = "It is a Class D IP address"
    }else if (x > 239 && x < 256) {
        y = "It is a Class E IP address"
    }
    return y
}

function subnet(x) { // need work
    y = ""
    if (x > 0 && x < 128) {
        y = "Subnet mask is 255.0.0.0"
    } else if (x > 127 && x < 192) {
        y = "Subnet mask is 255.255.0.0"
    } else if (x > 191 && x < 224) {
        y = "Subnet mask is 255.255.255.0"
    } else if (x > 223 && x < 240) {
       y = "Class D do not need subnet mask."
    }else if (x > 239 && x < 256) {
        y = "Class E do not need subnet mask."
    }
    return y
}

function hostCalc(x) {
    y = ""
    if (x[0][0]+x[0][1]+x[0][2]+x[0][3] == "1111") {
        y = "Class E Address do not have host addresses"
    } else if (x[0][0]+x[0][1]+x[0][2]+x[0][3] == "1110") {
        y = "Class D Address do not have host addresses"
    } else if (x[0][0]+x[0][1]+x[0][2] == "110") {
        y = "Total possible host address is " + (Math.pow(2 , 8) - 2)
    } else if (x[0][0]+x[0][1] == "10") {
        y = "Total possible host address is " + (Math.pow(Math.pow(2 , 8) , 2) - 2)
    } else if (x[0][0] == "0") {
        y = "Total possible host address is " + (Math.pow(Math.pow(2 , 8) , 3) - 2)
    }
    return y
}