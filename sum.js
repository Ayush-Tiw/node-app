console.log(process.argv)

const sum=(a,b)=>  a+b
// console.log(sum(process.argv[2],process.argv[3]))//this become 5040 it will take as string,so we have convert it to number
// console.log(sum(+process.argv[2],+process.argv[3]))
const [, , n1,n2]=process.argv
console.log(sum(+n1,+n2))

