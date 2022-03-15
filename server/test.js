a = {}
a[1] = [1,2,3]
if(a[1] == undefined)
{
    a[1] = [1]
}
else{
    a[1].push(1)
}
console.log(a[1])