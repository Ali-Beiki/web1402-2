

let j=0;
 let array=[];
let argv=process.argv;
 for(let i=2;i<argv.length;i+=2){
        array[j]={
            item:process.argv[i],
            item2:process.argv[i+1]
        }
        j++
    };
    console.log(array);