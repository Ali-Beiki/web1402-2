console.log("inputs ",process.argv)
let inputs=[];
let input2=[];
let x=process.argv;
// function x(val,index){
//     if(index > 1)
//     {
//     inputs[index-2]=val;
// }
// }
// process.argv.forEach(x);

console.log("inputs",inputs);
    
for(let i=2;i<x.length;i++){
    input2[i-2]=process.argv[i]
}
console.log("inputs",input2);

 