// FS(file system)--> create a new file

const fs= require("fs");

// const fs=require("fs");
// fs.writeFile("names.txt",data,(err)=>{
//     console.log("completed writing!!")//this is for confirmation when we write huge file to check if file is complte or not
 // callback is usefull if we writting huge file the after installing whole file send messge in console complete writing
//     //err is for error if any
// })
// error may be file does not exit
// permission not available to access file

// create file

// const fs=require("fs");

// const quote="No beauty shines better then that of a good heart"
// fs.writeFile("./awesome.html",quote,(err)=>{
//     console.log(err)//will show error if any
//     console.log("completed writing");
// })


// for(let i=1;i<=10;i++){
//     const fs=require("fs");
// //to create multiple files 
//     const quote="Live more,worry less"
//     fs.writeFile(`./backup/text-${i}.html`,quote,(err)=>{
//         // console.log(err)//will show error if any
//         // console.log(`completed writing : text-${i}.html`);
//     })
// }



// console.log(process.argv);

// const[ , , noOfFiles]=process.argv;
// // for(let i=1;i<=noOfFiles;i++){
// for(let i=1;i<=process.argv[2];i++){
//     const fs=require("fs");
//     //to create multiple files 
//         const quote="Live more,worry less"
//         fs.writeFile(`./backup/text-${i}.html`,quote,(err)=>{
//             console.log(err)//will show error if any
//             console.log(`completed writing : text-${i}.html`);
//         })
// }

// // basically this is a worm virus when it is not in wrong hand


// TO READ FILE

// fs.readFile('cool.txt',(err,data)=>{
//     console.log(data);
// })
// this avove code only will give buffer data which is not human readable
{/* <Buffer 44 72 65 61 6d 20 69 73 20 6e 6f 74 20 74 68 61 74 20 79 6f 75 73 65 65 20 69 6e 20 73 6c 65 65 70 2c 64 72 65 61 6d 20 
69 73 20 73 6f 6d 65 74 68 69 ... 30 more bytes> */}

// // to fix we we should use utf-8
// fs.readFile('cool.txt',"utf-8",(err,data)=>{
//     console.log(data);
// })
// // lets check for error
// fs.readFile('cool.txt2',"utf-8",(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data)
//     }
// })
// throw error  cool.txt1 doe not exist
// we can also add different file path if error occur in if condition


const quote3 ="make everyday a little less ordinarily"
// write this quote to nice .txt

// fs.writeFile("./nice.txt",quote3,(Err)=>{
//     console.log("writing completed")
// })
// this will completely replace the content of nice.txt

// to add to existing file we should do appendFile instead of writeFile

// fs.appendFile("./nice.txt","\n"+quote3,(err)=>{
//     console.log("update completed")
// })
// (err)=>{
//     console.log("update completed")
// })--->this is callback if large file is ther it take time to console "update completed"


// // if want paragraph

// fs.appendFile("./nice.txt",`
// ${quote3}
// `,(err)=>{
//     console.log("update completed")
// })


// TO DELETE FILE
// delete the delete.css file

fs.unlink("./delete.css",(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("delete completed")
    }
})
// this is again like a virus,it corrupts your virus,starts delteting your file