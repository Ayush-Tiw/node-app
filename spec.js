// Inbuild packages of node--> OS and FS

// OS(info of cpu,memory,directiories,etc)
const os = require("os"); //import inbuilt packages
// console.log("Free memory",os.freemem())//will give free RAM in byte
// 1024bytes=1kb
console.log("Free memory",os.freemem()/1024/1024/1024)//free RAM in GB
console.log("Total memory",os.totalmem()/1024/1024/1024)//total RAM in GB
console.log("Version",os.version());// windows version
console.log("Cpus",os.cpus())//about processor

// with thse we can build software which shows all information about computer

