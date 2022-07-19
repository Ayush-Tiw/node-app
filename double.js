// const dbl =(n)=> n*2

// console.log("HEllo world",dbl(2))
// many thing work in browser work in nodejs
// something that works in browser does not work in nodejs like
// node js is not browser so it does not have dom
// we dont have DOM so we dont have document.*
// it does not have tabs like browser so it does not have window object
// console.log(document)//--->it through error document is not define
// console.log(window)//--->it through error window is not define
//setTimeOut etc are window object then how will be get those for nodejs
// for that we have another global object-->global
// console.log(global)

// things present in node not present in browser

const dbl =(n)=> n*2

// console.log("HEllo world",dbl())
// we can read input from terminal by node through another global object not present in browser
// console.log(process.argv);//argument values
// output-->[
//   'C:\\Program Files\\nodejs\\node.exe',--->these are showing path
//   'C:\\Users\\abc\\Desktop\\Guvi\\node-app\\double.js',-->this also
//   '30'
// ]
// console.log(dbl(process.argv[2]))

// // we can also destructure
// const [, , num]=process.argv;
// console.log(dbl(num))



// Inbuild packages of node
// OS(info of cpu,memory,directiories,etc)

// node index.js