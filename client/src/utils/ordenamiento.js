function quickSort(array1) {
    if(array1.length<=1) return array1;
  
    let ref=array1[0].comp;
    let menores=[]
    let mayores=[];
  
    for(let i=1;i<array1.length;i++){
      if(array1[i].comp>ref)mayores.push(array1[i]);
      else menores.push(array1[i]);
    }
    
    return quickSort(menores).concat(array1[0],quickSort(mayores));
}

export default function Ordenamiento(array,orden){
    let pesos=[]
    let excludes=[]

    array.forEach((e)=>{
        let elem=e.weight.metric.split(' - ');
        if(elem[1]){
            if(Number.isNaN(parseInt(elem[0]))){
                pesos.push({comp:parseInt(elem[1]-3+elem[1]),e});
            }
            else pesos.push({comp:parseInt(elem.join('')),e});
        }
        else{
            let n=elem[0]
            if(Number.isNaN(parseInt(n)))excludes.push(e);
            else pesos.push({comp:parseInt(n+n),e});
        }
    })
    
    let final=quickSort(pesos).map(e=>e.e)
    

    
    
    if(orden==='maM')return final
    else return final.reverse();
}
